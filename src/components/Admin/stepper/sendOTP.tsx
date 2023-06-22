import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Snackbar, Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { checkKYC } from '../../../services/nippon.service';
import axios from 'axios';

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
  console.log('capturedData', capturedData)
  const classes = useStyles();
  const [pan, setPan] = useState(capturedData.pan);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [msg, setMsg] = useState('');
  const [validationErrors, setValidationErrors] = useState<any>({});


  const handlePanChange = (event) => {
    setPan(event.target.value);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setValidationErrors({});
    setIsLoading(true);

    axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/send-OTP`, { Folio: capturedData.folio_id },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(res => {
        const data = res.data.OTPData;

        setIsLoading(false);
        setPan('');

        setIsSuccess(true);


        setMsg('OTP sent successfully!');
        capturedDataHandler('refNo', data.RefNo);
        handleNext()

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
    <Card className={classes.card}>
      <CardContent>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Typography variant="body1" gutterBottom>
            OTP will be sent to this folio number.
          </Typography>
          <TextField
            label="Folio"
            value={capturedData.folio_id}
            onChange={handlePanChange}
            variant="outlined"
            margin="normal"
            required={true}
            error={!!validationErrors.pan} // Check if the field has an error
            helperText={validationErrors.pan} // Display the error message
            disabled

          />
          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              color="primary"
              type='submit'
              disabled={isLoading}
            >
              Send OTP
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
        message={msg}
        className={classes.snackbar}
      />
      <Snackbar
        open={isFailure}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={msg}
        className={classes.snackbar}
      />
    </Card>
  );
};

export default SendOTP;
