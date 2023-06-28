import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Snackbar, Alert, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { createFolio } from '../../../services/nippon.service';
import { useNavigate } from 'react-router-dom';

const RedeemCreate = ({ handleNext, accessToken, capturedData, capturedDataHandler }) => {
  console.log(capturedData);

  const getDate = () => {

    // Create a new Date object
    var currentDate = new Date();

    // Get the day, month, and year components
    var day = String(currentDate.getDate()).padStart(2, '0');
    var month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    var year = currentDate.getFullYear();

    // Combine the components into the desired format
    return month + '/' + day + '/' + year;

  }





  const [formData, setFormData] = useState({
    "fund": "RMF",
    "acno": capturedData.folio_id,
    "scheme": "LF",
    "plan": "IG",
    "options": "G",
    "RedFlag": "P",
    "UnitamtFlag": "A",
    "UnitAmtValue": '',
    "Tpin": "A",
    "bank": "",
    "oldihno": 0,
    "trdate": getDate(),
    "entdate": getDate(),
    "ShowInstaStatus": "Y",
    "OTP": "",
    "OTPReference": capturedData.refNo,
    "SelfValidate": "Y"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [validationErrors, setValidationErrors] = useState<any>({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValidationErrors({});
    setIsLoading(true);

    axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/redeem`, formData,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(res => {
        const { data } = res;
        setIsSuccess(true);
        if (!data.succ) {
          setIsFailure(true)
          return;
        }
        // handleNext();
      }).catch(({ response }) => {
        setIsLoading(false);
        const { data } = response;
        setValidationErrors(data.validationErrors);
      })
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/dashboardAdmin/investment/redeem/${capturedData.folio_id}`)
    }, 3000);
  };



  const handleCloseSnackbar = () => {
    setIsFailure(false);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
      <CardContent>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Typography variant="subtitle1" gutterBottom>
            Redeem request
          </Typography>
          <TextField
            label="Fund"
            name="fund"
            value={formData.fund}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.fund}
            helperText={validationErrors.fund}
          />

          <TextField
            label="Account Number"
            name="acno"
            value={formData.acno}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.acno}
            helperText={validationErrors.acno}
            disabled
          />

          <TextField
            label="Plan"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.plan}
            helperText={validationErrors.plan}
          />

          <TextField
            label="Options"
            name="options"
            value={formData.options}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.options}
            helperText={validationErrors.options}
          />

          <TextField
            label="Red Flag"
            name="RedFlag"
            value={formData.RedFlag}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.RedFlag}
            helperText={validationErrors.RedFlag}
          />

          <TextField
            label="Unit Amount Flag"
            name="UnitamtFlag"
            value={formData.UnitamtFlag}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.UnitamtFlag}
            helperText={validationErrors.UnitamtFlag}
          />

          <TextField
            label="Unit Amount Value"
            name="UnitAmtValue"
            value={formData.UnitAmtValue}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.UnitAmtValue}
            helperText={validationErrors.UnitAmtValue}
          />

          <TextField
            label="Tpin"
            name="Tpin"
            value={formData.Tpin}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.Tpin}
            helperText={validationErrors.Tpin}
          />

          <TextField
            label="Bank"
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.bank}
            helperText={validationErrors.bank}
          />

          <TextField
            label="Old IHNO"
            name="oldihno"
            value={formData.oldihno}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.oldihno}
            helperText={validationErrors.oldihno}
          />

          <TextField
            label="Transaction Date"
            name="trdate"
            value={formData.trdate}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.trdate}
            helperText={validationErrors.trdate}
          />

          <TextField
            label="Entry Date"
            name="entdate"
            value={formData.entdate}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.entdate}
            helperText={validationErrors.entdate}
          />

          <TextField
            label="Show Insta Status"
            name="ShowInstaStatus"
            value={formData.ShowInstaStatus}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.ShowInstaStatus}
            helperText={validationErrors.ShowInstaStatus}
          />

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

          <TextField
            label="OTP Reference"
            name="OTPReference"
            value={formData.OTPReference}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.OTPReference}
            helperText={validationErrors.OTPReference}
            disabled
          />

          <TextField
            label="Self Validate"
            name="SelfValidate"
            value={formData.SelfValidate}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.SelfValidate}
            helperText={validationErrors.SelfValidate}
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
        </form>
      </CardContent>
      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        onClose={() => setIsSuccess(false)}
        sx={{ marginBottom: 2 }}
      ><Alert severity="success">Redeem submitted successfully!</Alert></Snackbar>
      <Snackbar
        open={isFailure}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        //message="Failed to submit Redeem. Please try again."
        sx={{ marginBottom: 2 }}
      ><Alert severity="error">Failed to submit Redeem. Please try again.</Alert></Snackbar>
    </Card>
  );
};

export default RedeemCreate;