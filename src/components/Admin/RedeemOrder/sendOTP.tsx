import React, { useState } from 'react';
import { TextField, Button, Alert, CircularProgress, Snackbar, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { checkKYC } from '../../../services/nippon.service';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: 50,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
  },
  buttonWrapper: {
    position: 'relative',
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  snackbar: {
    marginBottom: 20,
  },
});

const SendOTP = ({ handleNext, capturedDataHandler, capturedData, accessToken }) => {
  //console.log('capturedData', capturedData)
  const classes = useStyles();
  const Navigate = useNavigate();
  const [pan, setPan] = useState(capturedData.pan);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [msg, setMsg] = useState('');
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [formData, setFormData] = useState(capturedData);
  //console.log("form",formData);
  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    setValidationErrors({});
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/redeem`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then(res => {
        // navigate(`/dashboardSuper/investment`)
        const { data } = res;
        if (!data.succ) {
          setIsFailure(true);
          setIsLoading(false);
          setMsg(data.message);
          return;
        }
        setIsSuccess(true);
        setIsLoading(false);

        setMsg(`Redeem request submitted successfully for Rs ${formData.UnitAmtValue}`)
        setTimeout(() => {
          Navigate(`/dashboardAdmin/investment/details/${formData.acno}`);
        }, 3000);
      })
      .catch(({ response }) => {
        setIsLoading(false);
        const { data } = response;
        setIsFailure(true);
        setMsg("Validation Errors!")
        setValidationErrors(data.validationErrors);
      });
  };

  const handleCloseSnackbar = () => {
    setIsFailure(false);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography variant="body1" gutterBottom>
            Enter OTP to Redeem.
          </Typography>
          <TextField
            label="OTP"
            name="OTP"
            value={formData.OTP}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.OTP}
            helperText={validationErrors.OTP}
          />
          {/* <TextField
            label="Folio"
            value={capturedData.folio_id}
            onChange={handlePanChange}
            variant="outlined"
            margin="normal"
            required={true}
            error={!!validationErrors.pan} // Check if the field has an error
            helperText={validationErrors.pan} // Display the error message
            disabled
          /> */}
          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              color="primary"
              type='submit'
              disabled={isLoading}
            >
              Submit
            </Button>
            {isLoading && (
              <CircularProgress size={24} color="primary" className={classes.buttonProgress} />
            )}
          </div>
        </form>
      </CardContent>

      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        onClose={() => setIsSuccess(false)}
        className={classes.snackbar}
      >
        <Alert severity='success' >{msg}</Alert>
      </Snackbar>
      <Snackbar
        open={isFailure}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        className={classes.snackbar}
      >
      <Alert severity='error' >{msg}</Alert>
      </Snackbar>
    </Card>
  );
};

export default SendOTP;
