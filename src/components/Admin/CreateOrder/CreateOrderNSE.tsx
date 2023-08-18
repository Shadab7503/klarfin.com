import React, { useEffect, useState } from 'react';
import { TextField, Button, Modal, Box, MenuItem, CircularProgress, Alert, Snackbar, Card, CardContent, Typography, Divider } from '@mui/material';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../../Store/AppContext';
import RTGSPayment from './RTGSPayment';

const CreateOrderNSE = ({ accessToken }) => {
    const [storeState, dispatch] = useAppContext();
    const [open, setOpen] = React.useState(false);
    const [OTP, setOTP] = useState("");
    const [modelName, setModelName] = useState("");
    const handleClose = () => { setOpen(false); }
    const navigate = useNavigate();
    const { state }: any = useLocation();
    const { value , data} = state;
    console.log("state",state)
    const [isResume, setIsResume] = useState(false);
    const [validationErrors, setValidationErrors] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [TransactionCount, setTransactionCount] = useState([{
        "product_code": "",
        "amount": ""
    }, {
        "product_code": "",
        "amount": ""
    }]
    )

    const [msg, setMsg] = React.useState("");
    useEffect(() => {
        if (state) {
            if (Object.keys(state).length > 1) {
                setIsResume(true);
            } else {
                setIsResume(false);
            }
        }
    })
    const BankName = [
        { code: "HDF", title: "HDFC BANK LTD" },
        { code: "ICI", title: "ICICI Bank" },
        { code: "IDB", title: "IDBI Bank" },
        { code: "INB", title: "Indian Bank" },
        { code: "SBI", title: "State Bank of India" }
    ]

    const ProductCode = [
        { code: "AFWG", name: "HDFC Arbitrage Fund - Wholesale Plan - Regular Plan - Growth" },
        { code: "HDFC", name: "HDFC Liquid Fund - Regular Plan - Growth" },
        { code: "54", name: "HDFC Low Duration Fund - Regular Plan - Growth" },
        { code: "57N", name: "HDFC Overnight Fund - Regular Plan -  Growth" },
        { code: "USTGR", name: "HDFC Ultra Short Term Fund - Regular Growth" },
        { code: "EDIRG", name: "ICICI Prudential Equity Arbitrage Fund - Growth" },
        { code: "1565", name: "ICICI Prudential Liquid Fund - Regular plan - Growth" },
        { code: "3491", name: "ICICI Prudential Overnight Fund Growth" },
        { code: "1746", name: "ICICI Prudential Ultra Short Term Fund - Growth" },
        { code: "LFGPGGR", name: "Motilal Oswal Liquid Fund - Regular Growth" },
        { code: "USGPGGR", name: "Motilal Oswal Ultra Short Term Fund - Growth" },
        { code: "AFGPGR", name: "NIPPON INDIA Arbitrage Fund  - GROWTH PLAN - GROWTH" },
        { code: "LFIGGR", name: "NIPPON INDIA LIQUID FUND - GROWTH PLAN - GROWTH OPTION" },
        { code: "LPIGGR", name: "NIPPON INDIA Low Duration Fund - Growth Plan Growth Option" },
        { code: "ONGPGR", name: "NIPPON INDIA OVERNIGHT FUND - GROWTH PLAN" },
        { code: "CPGPGR", name: "NIPPON INDIA Ultra Short Duration Fund - Growth Option" },
        { code: "114G", name: "SBI Arbitrage Opportunities Fund - Regular Plan - Growth" },
        { code: "72SG", name: "SBI Liquid Fund Regular Growth" },
        { code: "F47RG", name: "SBI Magnum Low Duration Fund Regular Growth" },
        { code: "086G", name: "SBI Magnum Ultra Short Duration Fund Regular Growth" },
        { code: "57G", name: "SBI Overnight Fund Regular Growth" },
    ]

    const TimeHorizon = [
        "0 - 3 Months",
        "3 - 12 Months",
        "More than 1 year"
    ]
    const Funds = {
        "AFWG": "H",
        "HDFC": "H",
        "54": "H",
        "57N": "H",
        "USTGR": "H",
        "EDIRG": "P",
        "1565": "P",
        "3491": "P",
        "1746": "P",
        "LFGPGGR": "127",
        "USGPGGR": "127",
        "AFGPGR": "RMF",
        "LFIGGR": "RMF",
        "LPIGGR": "RMF",
        "ONGPGR": "RMF",
        "CPGPGR": "RMF",
        "114G": "L",
        "72SG": "L",
        "F47RG": "L",
        "086G": "L",
        "57G": "L",
    }

    const [formData, setFormData] = useState({
        "iin": storeState.ACTIVEINVETOR.folio.Folio,
        "sub_trxn_type": "N",
        "poa": "N",
        "poa_bank_trxn_type": "",
        "trxn_acceptance": "", //ALL for all
        "demat_user": "N",
        "dp_id": "",
        "bank": BankName.filter((each) => each.code == storeState.ACTIVEINVETOR.BANK)[0].code,
        "ac_no": storeState.ACTIVEINVETOR.ACNUM,
        "ifsc_code": storeState.ACTIVEINVETOR.IFSC,
        "sub_broker_arn_code": "",
        "sub_broker_code": "",
        "euin_opted": "Y",
        "trxn_execution": "",
        "remarks": "",
        "payment_mode": "",
        "billdesk_bank": "",
        "instrm_bank": "HDF",
        "instrm_ac_no": "",
        "instrm_no": "",
        "instrm_date": "",
        "instrm_branch": "",
        "instrm_charges": "",
        "micr": "",
        "rtgs_code": storeState.ACTIVEINVETOR.IFSC,
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
        "product_code": !isResume ? ProductCode.filter((ele)=>ele.name.toUpperCase() == value?.Fund_Description.toUpperCase())[0]?.code : "",
        "amc": !isResume ? Funds[ProductCode.filter((ele)=>ele.name.toUpperCase() == value?.Fund_Description.toUpperCase())[0]?.code] : "",
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
        "instrm_amount": "",  //sum of all the scheme amounts
        "fundType": "Various funds through NSE",
        "PayMode": "xxxxxxxxx",
        "time_horizon": ""
    })

    const PaymentMode = [
        { code: "TR", name: "RTGS / NEFT" },
        { code: "OL", name: "Online" },
        { code: "M", name: "Debit Mandate" },
    ]

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name == "product_code") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                ["amc"]: Funds[value]
            }))
        } else if (name == "payment_mode") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                ["instrm_amount"]: formData.amount,
                ["billdesk_bank"]: "HDF"
            }))
        }
        else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
        setIsLoading(true);
        setOpen(true)
        if (formData.payment_mode == "OL" || formData.payment_mode == "M") {
            setModelName(formData.payment_mode);
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
                        navigate("/dashboardAdmin/investing")
                    }, 4000);
                    return;
                }).catch(({ response }) => {
                    setIsLoading(false);
                    const { data } = response;
                    //setValidationErrors(data.validationErrors);
                })
        }
        // else if (formData.payment_mode == "M") {
        //     //payment for e mandate
        //     axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/creatotbmotp`, formData,
        //         {
        //             headers: { Authorization: `Bearer ${accessToken}` }
        //         }).then(res => {
        //             const { data } = res;
        //             console.log(res)
        //             if (!data.succ) {
        //                 setIsLoading(false);
        //                 setMsg(data.message)
        //                 setIsFailure(true);
        //                 return;
        //             }
        //             setModelName("M")
        //             setIsSuccess(true);
        //             setMsg(`OTP sent to ${storeState.ACTIVEINVETOR.user_id.email}`)
        //             setIsLoading(false);
        //             return;
        //         }).catch(({ response }) => {
        //             setIsLoading(false);
        //             console.log(response)
        //             //const { data } = response;
        //             //setValidationErrors(data.validationErrors);
        //             return;
        //         })
        // } 
        else if (formData.payment_mode == "TR") {
            setModelName("TR")
            setIsLoading(false)
        }
    };

    const handleSubmitPOPUP = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        await axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/verify_otp_createotbm`, { otp: OTP },
            {
                headers: { Authorization: `Bearer ${accessToken}` }
            }).then((res) => {

                if (!res.data.succ) {
                    setMsg(res.data.message)
                    setIsFailure(true);
                    setIsLoading(false);
                    return;
                }
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
                            formData.fundType == "Various funds through NSE" ?
                                navigate(`/dashboardAdmin/investment/nse/details/${state.state.folio.Folio}`) :
                                navigate(`/dashboardAdmin/investment/details/${state.state.folio.Folio}`)
                        }, 3000)

                    }).catch(({ response }) => {
                        setIsLoading(false);
                        const { data } = response;
                        setIsFailure(true);
                        setMsg(data.message);
                        setValidationErrors(data.validationErrors);
                        return;
                    })
                return;
            }
            ).catch(({ response }) => {
                setIsLoading(false);
                console.log("response", response)
                const { data } = response;
                setIsFailure(true);
                setMsg(data.message);
                data.validationErrors && setValidationErrors(data.validationErrors);
                return;
            })
    }

    const handleCloseSnackbar = () => {
        setIsFailure(false);
    };
    return (
        <div style={{ margin: "4rem" }}>

            <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
                <CardContent>
                    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                        {/* {!isResume && <TextField
                            label="Fund"
                            name="amc"
                            onChange={handleChange}
                            defaultValue={formData.amc}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            select
                            disabled={isResume}
                            required
                            error={!!validationErrors.Fund}
                            helperText={validationErrors.Fund}
                        >
                            {
                                Funds.map((ele, idx) => {
                                    return <MenuItem key={idx} value={ele.code} >{ele.name}</MenuItem>
                                })
                            }
                        </TextField>} */}
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
                        {isResume && <TextField
                            label="Scheme"
                            name="product_code"
                            onChange={handleChange}
                            value={formData.product_code}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!validationErrors.product_code}
                            helperText={validationErrors.product_code}
                            required
                            select
                            disabled={isResume}
                        >
                            {ProductCode.map((each, idx) => (
                                <MenuItem key={idx} value={each.code}>
                                    {each.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        }
                        {!isResume && <> <TextField
                            label="Time Horizon"
                            name="time_horizon"
                            onChange={handleChange}
                            value={formData.time_horizon}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!validationErrors.product_code}
                            helperText={validationErrors.product_code}
                            required
                            select
                        >
                            {TimeHorizon.map((each, idx) => (
                                <MenuItem key={idx} value={each}>
                                    {each}
                                </MenuItem>
                            ))}
                        </TextField>
                            <Typography>Our Recommendation</Typography>
                            {TransactionCount.map((ele) => {
                                return <>
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
                                        label="Scheme"
                                        name="product_code"
                                        onChange={handleChange}
                                        value={formData.product_code}
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        error={!!validationErrors.product_code}
                                        helperText={validationErrors.product_code}
                                        required
                                        select
                                        disabled={isResume}
                                    >
                                        {ProductCode.map((each, idx) => (
                                            <MenuItem key={idx} value={each.code}>
                                                {each.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </>
                            })}

                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isLoading}
                                fullWidth
                                sx={{ marginTop: 2 }}
                            >
                                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'ADD OTHER FUNDS'}
                            </Button> </>}
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
                            {BankName.filter((each) => each.code == storeState.ACTIVEINVETOR.BANK).map((ele, indx) => {
                                return <MenuItem key={indx} value={ele.code} >{`${ele.title} (${formData.ac_no})`}</MenuItem>
                            })}
                        </TextField>
                        {/* <TextField
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

                        /> */}
                        {/* <TextField
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
                        /> */}
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
                                <MenuItem key={idx} value={each.code}>
                                    {each.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        {/* {formData.payment_mode == "OL" && <>
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
                        } */}
                        {/* {
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
                                    {BankName.filter((ele) => ele.code == "HDF").map((ele, indx) => {
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
                        } */}
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isLoading}
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'INVEST'}
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
            {modelName == "TR" && <div>
                <RTGSPayment state={state} setValidationErrors={setValidationErrors} validationErrors={validationErrors} isLoading={isLoading} handleChange={handleChange} formData={formData} open={open} setOpen={setOpen} setMsg={setMsg} setIsFailure={setIsFailure} setIsLoading={setIsLoading} setIsSuccess={setIsSuccess} accessToken={accessToken} />
            </div>}
            {modelName == "OL" &&  <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -75%)',
                        bgcolor: 'background.paper',
                        borderRadius: "10px",
                        minWidth: "40vw",
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <Typography variant='h5' m={2}>Online Payment Link</Typography>
                        <Divider sx={{ mb: 2, color: "blue" }} />
                        {isLoading ? <CircularProgress size={24} color="inherit" />
                            :
                            <Typography id="modal-modal-description">
                                Kindly check your email for the payment link
                            </Typography>
                        }
                    </Box>
                </Modal>
            </div>}
            {/* {modelName == "M" && <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute' as 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -75%)',
                        bgcolor: 'background.paper',
                        borderRadius: "10px",
                        minWidth: "40vw",
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}>
                        <Typography variant='h5' >E Mandate</Typography>
                        <Divider />
                        <Typography id="modal-modal-description">
                            Transaction Completed
                        </Typography>
                        <Divider />
                        <TextField
                            label="Enter OTP"
                            name="otp"
                            onChange={(e) => { setOTP(e.target.value) }}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            error={!!validationErrors.otp}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isLoading}
                            fullWidth
                            sx={{ marginTop: 2, width: "150px", height: "40px" }}
                            onClick={handleSubmitPOPUP}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : 'INVEST'}
                        </Button>
                    </Box>
                </Modal>
            </div>} */}
        </div>
    );
};

export default CreateOrderNSE;