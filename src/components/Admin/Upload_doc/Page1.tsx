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
import {json} from "node:stream/consumers";
import {error} from "node:console";

function Page1({accessToken, handleNext}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, SetFormData] = useState({
    name: "pancard",
    pancard: "",
  });

  const handleChange = event => {
    const {name, value} = event.target;
    console.log(name,value)
    SetFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefaults();
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}/v1/user/investment/upload/pancard`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      )
      .then(res => {
        const {data} = res;
        if (!data.succ) {
          setIsLoading(false);
          setIsFailure(true);
          setMessage(data.message);
        }
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(()=>{
          setMessage(data.message);
        },2000)
        //handleNext();
      })
      .catch(error => {
        setIsLoading(false);
        setIsFailure(true);
        setMessage(error);
      });
  };

  return (
    <Card sx={{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
        <form onSubmit={handleSubmit} style={{width: "100%"}}>
          <Typography variant="subtitle1" gutterBottom>
            Upload Your Pan Card
          </Typography>

          <TextField
            label="Upload Pan Card"
            onChange={handleChange}
            name="pancard"
            type="file"
            required
            variant="outlined"
            hidden
            focused
            margin="normal"
            fullWidth
            //error={!!validationErrors.ACTYPE} // Check if the field has an error
            //helperText={validationErrors.ACTYPE} // Display the error message
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
          { message.length > 1? message :"File is uploading..."}
        </Alert>
      </Snackbar>

      <Snackbar
        open={isFailure}
        autoHideDuration={3000}
        onClose={() => setIsFailure(false)}
        sx={{marginBottom: 2}}
      >
        <Alert severity="error" sx={{width: "100%"}} className="snack">
          Failed to Upload File !!!
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default Page1;
