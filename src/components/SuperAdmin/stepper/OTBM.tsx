import React, { useState } from 'react';
import { TextField, Button, Alert,CircularProgress, Snackbar, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OTBM = ({ handleNext, accessToken, capturedData, capturedDataHandler }) => {
  const [message,setMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    "Pan": capturedData.pan,
    "Folio": "",
    "Amount": "1000000",
    "ReturnUrl": "https://www.distributor.com/?Result=Failure",
    "url": "https://online.nipponindiaim.com/rmf/mowblyserver/wsapi/rmf/prod/wsapi/EmandateURL"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [validationErrors, setValidationErrors] = useState<any>({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationErrors({});
    setIsLoading(true);

    axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/super/otbm`, {...formData,Pan:capturedData.pan,Folio:capturedData.folio,inv_id:capturedData.inv_id},
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(res => {
        // navigate(`/dashboardSuper/investment`)
        const { data } = res;
        if (!data.succ){ 
          setMessage(data.message);
          setIsLoading(false);
          setIsFailure(true);
          return;}
        setIsLoading(false);
        handleNext();
      }).catch(({ response }) => {
        setIsLoading(false);
        const { data } = response;
        setValidationErrors(data.validationErrors);
      })


  };

  const handleCloseSnackbar = () => {
    setIsFailure(false);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
      <CardContent>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Typography variant="subtitle1" gutterBottom>
            EOTBM
          </Typography>
          <TextField
            label="Pan"
            name="Pan"
            value={capturedData.pan}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.pan} // Check if the field has an error
            helperText={validationErrors.pan} // Display the error message
            disabled
          />

          <TextField
            label="Folio"
            name="Folio"
            value={capturedData.folio}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.Folio} // Check if the field has an error
            helperText={validationErrors.Folio} // Display the error message
            disabled
          />

          <TextField
            label="Amount"
            name="Amount"
            value={formData.Amount}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
           // inputProps={{ inputMode: 'numeric', pattern: '[100-100000]*' }} 
            fullWidth
            error={!!validationErrors.Amount} // Check if the field has an error
            helperText={validationErrors.Amount} // Display the error message
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => { navigate('/dashboardSuper/investment') }}
            disabled={isLoading}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Skip
          </Button>
        </form>
      </CardContent>
      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        onClose={() => setIsSuccess(false)}
        message="OTBM submitted successfully!"
        sx={{ marginBottom: 2 }}
      />
      <Snackbar
        open={isFailure}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        sx={{ marginBottom: 2 }}
      ><Alert severity='error'>{message}</Alert></Snackbar>
    </Card>
  );
};

export default OTBM;