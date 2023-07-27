import React, { useEffect, useState } from 'react';
import { TextField, Button, CircularProgress, Snackbar, Card, CardContent, Typography, MenuItem } from '@mui/material';

const FormNSE = ({ formData, setCaptureData }) => {
    const [validationErrors, setValidationErrors] = useState<any>({});

    const handleChange = (event) => {
        setCaptureData(event)
    };
    const ProductCode = [{ code: "ONGPGR", title: "NIPPON INDIA OVERNIGHT FUND - GROWTH PLAN" }]
    const BankName = [{code:"HDF" , title:"HDFC BANK LTD"}]
    return (
        <form style={{ width: '100%' }}>
            <Typography variant="subtitle1" sx={{ width: "100%", textAlign: "center" }} gutterBottom>
                NSE
            </Typography>

            <TextField
                label="IIN"
                name="iin"
                value={formData.iin}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.iin}
                helperText={validationErrors.iin}
                required />
            <TextField
                label="Bank"
                name="bank"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.bank}
                helperText={validationErrors.bank}
                required
                select
            >
                {BankName.map((ele,indx)=>{
                    return <MenuItem key={indx} value = {ele.code} >{ele.title}</MenuItem>
                })}
            </TextField>
            <TextField
                label="Account Number"
                name="ac_no"
                value="50100165499362"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.ac_no}
                helperText={validationErrors.ac_no}
                required
            />
            <TextField
                label="Bank IFSC Code"
                name="ifsc_code"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.ifsc_code}
                helperText={validationErrors.ifsc_code}
                required
            />
            <TextField
                label="EUIN"
                name="EUIN"
                value={formData.EUIN}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.euin}
                helperText={validationErrors.euin}
                required
            />
            <TextField
                label="Bill Desk Bank"
                name="billdesk_bank"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.euin}
                helperText={validationErrors.euin}
                required
                select
            >
                {BankName.map((ele,indx)=>{
                    return <MenuItem key={indx} value = {ele.code} >{ele.title}</MenuItem>
                })}
            </TextField>
            <TextField
                label="Instrument Amount"
                name="instrm_amount"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.instrm_amount}
                helperText={"Equal to Sum of Transaction amount"}
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
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.amount}
                helperText={validationErrors.amount}
                required
            />
            <TextField
                label="Product Code"
                name="product_code"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.product_code}
                helperText={validationErrors.product_code}
                required
                select
            >
                {ProductCode.map((each, idx) => (
                    <MenuItem key={idx} value={each.code}>
                        {each.title}
                    </MenuItem>
                ))}
            </TextField>

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