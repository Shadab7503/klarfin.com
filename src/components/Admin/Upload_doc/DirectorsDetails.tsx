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
import {mt} from "date-fns/locale";
import { blob } from "stream/consumers";
import { type } from "os";

function DirectorsDetails({accessToken, handleNext, user, capturedData}) {
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [pancard, setPancard] = useState<any>(null);
  const [aadharcard, setAadharcard] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [Data, setData] = useState({
    name: "",
    fs_name: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    doc_id:capturedData,
  });

  const dateConverter = str => {
    var date = new Date(str);
    var mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    var year = date.getFullYear();
    return `${day}/${mnth}/${year}`;
  };

  const fileChangeHandler = event => {
    const {name} = event.target;
    if (name == "pancard") {
      setPancard(event.target.files[0]);
    } else if (name == "aadharcard") {
      setAadharcard(event.target.files[0]);
    }
  };
  
  const handleChange = event => {
    let {name, value} = event.target;
    if (name == "dob") {
      const date = dateConverter(value);
      value = date;
    }
    setData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append("pancard", pancard);
    formData.append("aadharcard", aadharcard);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/directorDetails`,
         formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": `multipart/form-data`,
          },
          params:Data
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
          <Typography variant="subtitle1">Details of Director</Typography>
          <TextField
            label="Name"
            onChange={handleChange}
            value={Data.name}
            name="name"
            required
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.Name} // Check if the field has an error
            helperText={validationErrors.Name} /// Display the error message
          />
          <TextField
            label="Father/Spouse Name"
            onChange={handleChange}
            value={Data.fs_name}
            name="fs_name"
            required
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.phone} // Check if the field has an error
            helperText={validationErrors.phone} // Display the error message
          />

          <TextField
            label="Date of Birth"
            type="date"
            name="dob"
            // value={formData.dob}
            onChange={handleChange}
            variant="standard"
            margin="normal"
            fullWidth
            error={!!validationErrors.dob} // Check if the field has an error
            helperText={validationErrors.dob} // Display the error message
            focused
          />
          <TextField
            label="Gender"
            onChange={handleChange}
            name="gender"
            required
            select
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.Gender} // Check if the field has an error
            helperText={validationErrors.Gender} // Display the error message
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="others">Others</MenuItem>
          </TextField>

          <TextField
            label="Email ID"
            onChange={handleChange}
            name="email"
            required
            value={Data.email}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.email} // Check if the field has an error
            helperText={validationErrors.email} // Display the error message
          ></TextField>
          <TextField
            label="Phone No"
            onChange={handleChange}
            name="phone"
            required
            value={Data.phone}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.phone} // Check if the field has an error
            helperText={validationErrors.phone} // Display the error message
          ></TextField>

          <Typography sx={{mt: 4, ml: "35%"}} variant="subtitle1">
            Upload Related Docs
          </Typography>
          <TextField
            label="Upload Pan Card of Director"
            onChange={fileChangeHandler}
            name="pancard"
            type="file"
            required
            variant="outlined"
            hidden
            focused
            margin="normal"
            fullWidth
          ></TextField>
          <TextField
            label="Upload Aadhar Card of Director"
            onChange={fileChangeHandler}
            name="aadharcard"
            type="file"
            required
            variant="outlined"
            hidden
            focused
            margin="normal"
            fullWidth
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
          Failed to Upload File !!!
        </Alert>
      </Snackbar>
    </Card>
  );
}

export default DirectorsDetails;
