import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, CircularProgress, Alert, Snackbar, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
const CreateOrderNSE = ({ accessToken }) => {
    const navigate = useNavigate();
    const { folio }: any = useParams();
    const { state }: any = useLocation();
    const [validationErrors, setValidationErrors] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    console.log("state", state);
    const [msg, setMsg] = useState("");

    const BankName = [
        { code: "HDF", title: "HDFC BANK LTD" },
        { code: "ICI", title: "ICICI Bank" },
        { code: "IDB", title: "IDBI Bank" },
        { code: "INB", title: "Indian Bank" },
        { code: "SBI", title: "State Bank of India" }
    ]

    const [formData, setFormData] = useState({
        "amc": "RMF",
        "iin": state.folio.Folio,
        "sub_trxn_type": "N",
        "poa": "N",
        "poa_bank_trxn_type": "",
        "trxn_acceptance": "OL", //ALL for all
        "demat_user": "N",
        "dp_id": "",
        "bank": state.BANK,
        "ac_no": state.ACNUM,
        "ifsc_code": state.IFSC,
        "sub_broker_arn_code": "",
        "sub_broker_code": "",
        "euin_opted": "Y",
        "trxn_execution": "",
        "remarks": "",
        "payment_mode": "",
        "billdesk_bank": "",
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
        "Bank_holder_name": "", //have to fetch from Investment or folio after added its.
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
        "folio": "",
        "product_code": "",
        "ft_acc_no": "",
        "reinvest": "Z",
        "amount": "",
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
        "instrm_amount": "",
        "fundType": "Various funds through NSE",
        "PayMode":"xxxxxxxxx"
    })

    const ProductCode = [
        { key: "LPIGGR", name: "NIPPON INDIA LOW DURATION FUND (G)" },
        { key: "LFIGGR", name: "NIPPON INDIA LIQUID FUND (G)" },
        { key: "ONGPGR", name: "NIPPON INDIA OVERNIGHT FUND (G)" },
    ]

    const Funds = [
        { key: "RMF", name: "Nippon India Mutual Fund" },
        { key: "H", name: "HDFC Mutual Fund" },
        { key: "L", name: "SBI Mutual Fund" },
        { key: "P", name: "ICICI Prudential Mutual Fund" },
        { key: "MOF", name: "Motilal Oswal Mutual Fund" },
    ];

    const PaymentMode = [
        { key: "TR", name: "RTGS / NEFT" },
        { key: "OL", name: "Online" },
        { key: "M", name: "Debit Mandate" },
    ]

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        setIsLoading(true);
        if (formData.payment_mode == "TR") {
            axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/create-order`, formData,
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }).then(res => {
                    const { data } = res;
                    if (!data.succ) {
                        setIsLoading(false);
                        setMsg(data.message)
                        setIsFailure(true);
                        return;
                    }
                    setIsLoading(false);
                    setIsSuccess(true);
                    setMsg(`Order submitted successfully for Rs ${formData.amount}`)
                    setTimeout(() => {
                        if (formData.payment_mode == 'NEFT') {
                            navigate(`/dashboardAdmin/nippon-bank/${folio}`, { state: state })
                            return;
                        }
                    }, 3000)

                }).catch(({ response }) => {
                    setIsLoading(false);
                    const { data } = response;
                    //setValidationErrors(data.validationErrors);
                })
        } else{
            axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/creatotbmotp`, formData,
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }).then(res => {
                    const { data } = res;
                    if (!data.succ) {
                        setIsLoading(false);
                        setMsg(data.message)
                        setIsFailure(true);
                        return;
                    }
                    setIsSuccess(true);
                    setMsg(`OTP sent to ${state.user_id.email}`)
                    setIsLoading(false);
                    //axios.post('url',{data},{header}).then((res)=>{})
                    setTimeout(() => {
                        navigate(`/dashboardAdmin/investment/create-order-otp/${folio}`, { state: { state, formData } })
                    }, 5000);
                    return;
                }).catch(({ response }) => {
                    setIsLoading(false);
                    const { data } = response;
                    setValidationErrors(data.validationErrors);
                    return;
                })
        }
    };

    const handleCloseSnackbar = () => {
        setIsFailure(false);
    };
    return (
        <div style={{ margin: "4rem" }}>

            <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
                <CardContent>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <TextField
                            label="Fund"
                            name="amc"
                            onChange={handleChange}
                            defaultValue={formData.amc}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            select
                            required
                            error={!!validationErrors.Fund}
                            helperText={validationErrors.Fund}
                        >
                            {
                                Funds.map((ele, idx) => {
                                    return <MenuItem key={idx} value={ele.key} >{ele.name}</MenuItem>
                                })
                            }
                        </TextField>
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
                            defaultValue={formData.bank}
                        >
                            {BankName.filter((ele) => ele.code == formData.bank).map((ele, indx) => {
                                return <MenuItem key={indx} value={ele.code} >{ele.title}</MenuItem>
                            })}
                        </TextField>
                        <TextField
                            label="Account Number"
                            name="ac_no"
                            value={formData.ac_no}
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
                                <MenuItem key={idx} value={each.key}>
                                    {each.name}
                                </MenuItem>
                            ))}
                        </TextField>
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
                            label="Payment Mode"
                            name="payment_mode"
                            onChange={handleChange}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!validationErrors.payment_mode}
                            helperText={validationErrors.payment_mode}
                            required
                            select
                        >
                            {PaymentMode.map((each, idx) => (
                                <MenuItem key={idx} value={each.key}>
                                    {each.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        {formData.payment_mode == "OL" && <>
                            <TextField
                                label="Bill Desk Bank"
                                name="billdesk_bank"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                error={!!validationErrors.euin}
                                helperText={validationErrors.euin}
                                select
                            >
                                {BankName.slice(0, 1).map((ele, indx) => {
                                    return <MenuItem key={indx} value={ele.code} >{ele.title}</MenuItem>
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
                            />
                        </>
                        }
                        {
                            formData.payment_mode == "M" && <>
                                <TextField
                                    label="Instrument Bank"
                                    name="instrm_bank"
                                    onChange={handleChange}
                                    defaultValue={formData.instrm_bank}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!validationErrors.instrm_amount}
                                    select
                                >
                                    {BankName.filter((ele) => ele.code == formData.bank).map((ele, indx) => {
                                        return <MenuItem key={indx} value={ele.code} >{ele.title}</MenuItem>
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
                                />
                            </>
                        }
                        {
                            formData.payment_mode == "TR" && <>
                                <TextField
                                    label="RTGS Code"
                                    name="rtgs_code"
                                    onChange={handleChange}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    error={!!validationErrors.instrm_amount}
                                />
                            </>
                        }

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
                >
                    <Alert severity='success' >{msg}</Alert>
                </Snackbar>
                <Snackbar
                    open={isFailure}
                    autoHideDuration={3000}
                    onClose={handleCloseSnackbar}
                    sx={{ marginBottom: 2 }}
                ><Alert severity='error' >{msg}</Alert></Snackbar>
            </Card>
        </div>
    );
};

export default CreateOrderNSE;