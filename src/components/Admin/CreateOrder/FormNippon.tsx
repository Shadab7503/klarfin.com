import React, { useEffect, useState } from 'react';
import { TextField, Button, CircularProgress, Snackbar, Card, CardContent, Typography, MenuItem } from '@mui/material';

const FormNippon = ({ schemes,formData, setCaptureData }) => {
    const [validationErrors, setValidationErrors] = useState<any>({});

    const handleChange = (event) => {
        setCaptureData(event)
    };

    return (
        <form style={{ width: '100%' }}>
            <Typography variant="subtitle1" sx={{width:"100%",textAlign:"center"}} gutterBottom>
              NIPPON
            </Typography>
            <TextField
              label="Your Bank"
              name="ChqBank"
              value={formData.ChqBank}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!!validationErrors.ChqBank}
              helperText={validationErrors.ChqBank}
              disabled
            >
              {/* {bankNames.map((ele, index) => {
                return <MenuItem value={ele} defaultChecked key={index} >{ele}</MenuItem>
              })} */}
            </TextField>

            <TextField
              label="Scheme"
              name="Scheme"
              value={formData.Scheme}
              onChange={handleChange}
              defaultValue={schemes[0].value}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              error={!!validationErrors.Scheme}
              helperText={validationErrors.Scheme}
              select
            >
              {
                schemes.map(each => {
                  return <MenuItem key={each.value} defaultChecked value={each.value}>
                    {each.name}
                  </MenuItem>
                })
              }
            </TextField>
            <TextField
              label="Amount"
              name="Amount"
              value={formData.Amount}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              error={!!validationErrors.Amount}
              helperText={validationErrors.Amount}
            />

            <TextField
              label="Payment Mode"
              name="PayMode"
              select
              required
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.PayMode}
              helperText={validationErrors.PayMode}
            >
              <MenuItem defaultChecked value="OTBM">
                Auto Debit
              </MenuItem>
              <MenuItem value="NEFT">
                NEFT
              </MenuItem>
            </TextField>
          </form>
    );
};

export default FormNippon;