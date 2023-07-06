import React, {useState} from "react";
import axios from "axios";
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Typography,
  MenuItem,
} from "@mui/material";


function CompanyDetails({accessToken, handleNext, user, setCapturedData}) {
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [message, setMessage] = useState("");
  const [formData,SetFormData] = useState({
    name:user.companyName,
    phone:user.mobileNumber,
    email:user.email,
  })

  const handleChange = event => {
    const {name, value} = event.target;
    SetFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/companydetails`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(res => {
        const {data} = res;
        if (!data.succ) {
          setIsLoading(false);
          setIsFailure(true);
          setMessage(data.message);
          return;
        }
        setCapturedData(data.id)
        setIsLoading(false);
        setIsSuccess(true);
        setMessage(data.message);
        setTimeout(() => {
          handleNext();
        }, 2000);
      })
      .catch(error => {
        setIsLoading(false);
        setIsFailure(true);
        setMessage(error);
        return;
      });
  };

  return (
    <Card sx={{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
        <form onSubmit={handleSubmit} style={{width: "100%"}}>
          <Typography variant="subtitle1">Details of Company</Typography>
          <TextField
            label="Company Name"
            onChange={handleChange}
            value={formData.name}
            name='name'
            required
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.Name} // Check if the field has an error
            helperText={validationErrors.Name} /// Display the error message
          />
          <TextField
            label="Company Contact No"
            onChange={handleChange}
            value={formData.phone}
            name='phone'
            required
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.phone} // Check if the field has an error
            helperText={validationErrors.phone} // Display the error message
          />

          <TextField
            label="Company Email"
            onChange={handleChange}
            name='email'
            required
            value={formData.email}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.email} // Check if the field has an error
            helperText={validationErrors.email} // Display the error message
          ></TextField>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            fullWidth
            sx={{marginTop: 2}}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </CardContent>
      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        onClose={() => setIsSuccess(false)}
        message=""
        sx={{marginBottom: 2}}
      >
        <Alert severity="success" sx={{width: "100%"}} className="snack">
          {message.length > 1 ? message : "File is uploading..."}
        </Alert>
      </Snackbar>

      <Snackbar
        open={isFailure}
        autoHideDuration={3000}
        onClose={() => setIsFailure(false)}
        sx={{marginBottom: 2}}
      >
        <Alert severity="error" sx={{width: "100%"}} className="snack">
          {message}
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default CompanyDetails;
