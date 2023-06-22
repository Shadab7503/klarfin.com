import React, { useState ,useEffect } from 'react';
import { TextField, Button, CircularProgress, Snackbar, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { createFolio } from '../../../services/nippon.service';
import { format } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers';

const Folio = ({ handleNext, accessToken, capturedData, capturedDataHandler }) => {
  //console.log(capturedData);
  const [formData, setFormData] = useState({
    pan: capturedData.pan,
    scheme: 'LF',
    plan: 'IG',
    option: 'G',
    email: capturedData.invtorInf[0],
    mobile:capturedData.invtorInf[1].toString(),
    dob: '23/11/1991',
    RI: 'Y',
    PEP: 'N',
    RPEP: 'N',
    PTI: 'Y',
    BII: 'Y',
    TAX: 'INDIVIDUAL',
    OCCUP: 3,
    INCOME: '1-5L',
    IFSC: '',
    ACTYPE: 'SAVINGS',
    ACNUM: '',
    deviceid: 'PARTNERAPI',
    appVersion: '1.0.1',
    appName: 'Klarfin',
    ResponseURL: 'https://www.iifl.com/response?responseid=1234',
    BypassURL: 'Y',
    pincode: '',
    inv_id: capturedData.inv_id
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [validationErrors, setValidationErrors] = useState<any>({});


  const handleChange = (event) => {
    let { name, value } = event.target;
    if(name == 'dob') {
      const date = new Date(value);
      value = format(date, 'dd/mm/yyyy');
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setValidationErrors({});
    setIsLoading(true);

    axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/super/folio`, formData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          inv_id: capturedData.inv_id
        }
      }).then(res => {
        // navigate(`/dashboardSuper/investment`)
        const { data } = res;
        setIsLoading(false);
        if (!data.succ) return;
        capturedDataHandler('folio', data.folio)
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
            Create Folio
          </Typography>
          <TextField
            label="PAN"
            name="pan"
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
            label="Scheme"
            name="scheme"
            value={formData.scheme}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.scheme} // Check if the field has an error
            helperText={validationErrors.scheme} // Display the error message
          />

          <TextField
            label="Plan"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.plan} // Check if the field has an error
            helperText={validationErrors.plan} // Display the error message
          />

          <TextField
            label="Option"
            name="option"
            value={formData.option}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.option} // Check if the field has an error
            helperText={validationErrors.option} // Display the error message
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.email} // Check if the field has an error
            helperText={validationErrors.email} // Display the error message
          />

          <TextField
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.mobile} // Check if the field has an error
            helperText={validationErrors.mobile} // Display the error message
          />

          <TextField
            label="Date of Birth"
            type='date'
            name="dob"
            //value={formData.dob}
            onChange={handleChange}
            variant="standard"
            margin="normal"
            fullWidth
            error={!!validationErrors.dob} // Check if the field has an error
            helperText={validationErrors.dob} // Display the error message
            focused
          />

          <TextField
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.pincode} // Check if the field has an error
            helperText={validationErrors.pincode} // Display the error message
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
        message="PAN submitted successfully!"
        sx={{ marginBottom: 2 }}
      />
      <Snackbar
        open={isFailure}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Failed to submit PAN. Please try again."
        sx={{ marginBottom: 2 }}
      />
    </Card>
  );
};

export default Folio;