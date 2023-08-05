import React, { useEffect, useState } from 'react';
import { TextField, Button, CircularProgress, Snackbar, Card, CardContent, Typography, MenuItem } from '@mui/material';

const FormNSE = ({ formData, data ,setCaptureData, setFormData }) => {

    const [validationErrors, setValidationErrors] = useState<any>({});
    useEffect(() => {
        setFormData((formData) => ({
            ...formData,
            "iin": data.folio.Folio,
            "sub_trxn_type": "N",
            "poa": "N",
            "poa_bank_trxn_type": "",
            "trxn_acceptance": "OL",
            "demat_user": "N",
            "dp_id": "",
            "bank": data.BANK,
            "ac_no": data.ACNUM,
            "ifsc_code": data.IFSC,
            "sub_broker_arn_code": "",
            "sub_broker_code": "",
            "euin_opted": "Y",
            "trxn_execution": "",
            "remarks": "",
            "payment_mode": "OL",
            "billdesk_bank": "HDF",
            "instrm_bank": "",
            "instrm_ac_no": "",
            "instrm_no": "",
            "instrm_date": "",
            "instrm_branch": "",
            "instrm_charges": "",
            "micr": "",
            "rtgs_code": "",
            "neft_ifsc": "",
            "advisory_charge": "",
            "dd_charge": "",
            "cheque_deposit_mode": "",
            "debit_amount_type": "",
            "sip_micr_no": "",
            "sip_bank": "",
            "sip_branch": "",
            "sip_acc_no": "",
            "sip_ac_type": "",
            "sip_ifsc_code": "",
            "sip_paymech": "",
            "umrn": "",
            "ach_amt": "",
            "ach_fromdate": "",
            "ach_enddate": "",
            "until_cancelled": "",
            "Return_paymnt_flag": "N",
            "Client_callback_url": "",
            "Bank_holder_name": "Siddhant Gupta", //have to fetch from Investment or folio after added its.
            "Bank_holder_name1": "",
            "Bank_holder_name2": "",
            "trxn_initiator": "",
            "trans_count": 1,
            "utr_no": "",
            "transfer_date": "",
            "investor_auth_log": "",
            "ach_exist": "",
            "process_mode": "",
            "channel_type": "",
            "amc": "RMF", //should fetch from data
            "folio": "",
            "product_code": "ONGPGR",
            "ft_acc_no": "",
            "reinvest": "Z",
            "amount": "5000",
            "sip_from_date": "",
            "sip_end_date": "",
            "sip_freq": "",
            "sip_amount": "",
            "sip_period_day": "",
            "input_ref_no": "",
            "perpetual_flag": "",
            "insurance_enabled": "",
            "GOAL_BASED_SIP": "",
            "GOAL_TYPE": "",
            "GOAL_AMOUNT": "",
            "FREEDOM_SIP": "",
            "FREEDOM_TARGET_SCHEME": "",
            "FREEDOM_TENURE": "",
            "FREEDOM_SWP_AMOUNT": "",
            "FREEDOM_SCHEME_OPTION": "",
            "instrm_amount":formData.amount,
        }))
    }, [])
    const handleChange = (event) => {
        setCaptureData(event)
    };
    const ProductCode = [
        { code: "LPIGGR", title: "NIPPON INDIA LOW DURATION FUND (G)"},
        { code: "LFIGGR", title: "NIPPON INDIA LIQUID FUND (G)"},
        { code: "ONGPGR", title: "NIPPON INDIA OVERNIGHT FUND (G)" },
    ]
    const BankName = [{ code: "HDF", title: "HDFC BANK LTD" }]
    return (
        <form style={{ width: '100%' }}>
            <Typography variant="subtitle1" sx={{ width: "100%", textAlign: "center" }} gutterBottom>
                NSE
            </Typography>
            {/* <TextField
                label="IIN"
                name="iin"
                value={formData.iin}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                disabled
                error={!!validationErrors.iin}
                helperText={validationErrors.iin}
                required /> */}
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
                {BankName.map((ele, indx) => {
                    return <MenuItem key={indx} value={ele.code} >{ele.title}</MenuItem>
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
                disabled
            />
            <TextField
                label="Bank IFSC Code"
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.ifsc_code}
                helperText={validationErrors.ifsc_code}
                required
                disabled
            />
            {/* <TextField
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
            /> */}
            {/* <TextField
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
                {BankName.map((ele, indx) => {
                    return <MenuItem key={indx} value={ele.code} >{ele.title}</MenuItem>
                })}
            </TextField> */}
            {/* <TextField
                label="Instrument Amount"
                name="instrm_amount"
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.instrm_amount}
                helperText={"Equal to Sum of Transaction amount"}
                required
            /> */}
            {/* <TextField
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
            /> */}

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