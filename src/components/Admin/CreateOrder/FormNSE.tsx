import React, { useEffect, useState } from 'react';
import { TextField, Button, CircularProgress, Snackbar, Card, CardContent, Typography, MenuItem } from '@mui/material';

const FormNSE = ({ formData, setCaptureData }) => {
    const [validationErrors, setValidationErrors] = useState<any>({});

    const handleChange = (event) => {
        setCaptureData(event)
    };

    return (
        <form style={{ width: '100%' }}>
            <Typography variant="subtitle1" sx={{ width: "100%", textAlign: "center" }} gutterBottom>
                NSE
            </Typography>

            <TextField
                label="Your Bank"
                name="ChqBank"
                value={formData.ChqBank}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.ChqBank}
                helperText={validationErrors.ChqBank}
                disabled
                required />
            <TextField
                label="Appln ID"
                name="appln_id"
                value="MFS264077"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.ChqBank}
                helperText={validationErrors.ChqBank}
                required 
                />
            <TextField
                label="Password"
                name="password"
                value="8H9QWA0K"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.ChqBank}
                helperText={validationErrors.ChqBank}
                required 
                />
            <TextField
                label="Broker Code"
                name="broker_code"
                value="ARN-264077"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.ChqBank}
                helperText={validationErrors.ChqBank}
                required 
                />
            <TextField
                label="IIN"
                name="iin"
                value="5011228926"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.ChqBank}
                helperText={validationErrors.ChqBank}
                required 
                />
            <TextField
                label="Account Number"
                name="ac_no"
                value="50100165499362"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.ChqBank}
                helperText={validationErrors.ChqBank}
                required 
                />
            <TextField
                label="Bank IFSC Code"
                name="ifsc_code"
                value="HDFC0003895"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.ChqBank}
                helperText={validationErrors.ChqBank}
                required 
                />
            <TextField
                label="EUIN"
                name="euin"
                value="E493979"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.ChqBank}
                helperText={validationErrors.ChqBank}
                required 
                />
            <TextField
                label="Instrument Amount"
                name="instrm_amount"
                value={"5000"}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.ChqBank}
                helperText={validationErrors.ChqBank}
                required 
                />
            <TextField
                label="Bank Holder Name"
                name="Bank_holder_name"
                value="Siddhant Gupta"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.ChqBank}
                helperText={validationErrors.ChqBank}
                required 
                />

            <TextField
                label="Amount"
                name="Amount"
                value={formData.Amount}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.Amount}
                helperText={validationErrors.Amount}
                required 
                />

            <TextField
                label="Payment Mode"
                name="PayMode"
                select
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.PayMode}
                helperText={validationErrors.PayMode}
                required
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

export default FormNSE;