import React, { useState } from 'react';
import { TextField, Button, Alert, MenuItem, CircularProgress, Snackbar, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { createFolio } from '../../../../services/nippon.service';
import { format } from 'date-fns';

const FolioCreateNSE = ({ handleNext, accessToken, capturedData, capturedDataHandler }) => {
    //console.log(capturedData);
    const [message, setMessage] = useState("");
    const [isNomOpt, setIsNomOpt] = useState<boolean>(false);
    const relationArray = ["Father", "Mother", "Husband", "Wife", "Brother", "Sister"];
    const Country = [{ code: "IND", title: "INDIA" }];
    const schemes = [
        {
            value: "LP",
            name: "LOW DURATION FUND ( > 2 WEEKS )",
            plan: "IG",
            opt: "G",
        },
        {
            value: "LF",
            name: "LIQUID FUND ( 5-15 DAYS )",
            plan: "IG",
            opt: "G",
        },
        {
            value: "ON",
            name: "OVERNIGHT FUND ( < 5 DAYS )",
            plan: "GP",
            opt: "G",
        },
    ];
    const Occupation = [{ id: 1, value: 'SERVICE' }, { id: 2, value: 'BUSINESS' }, { id: 11, value: 'SELF EMPLOYED' }]
    const [formData, setFormData] = useState({
        ...capturedData,
        "process_mode": "D",
        "title": "",
        "valid_pan": "Y",
        "exemption": "N",
        "exempt_category": "N",
        "exempt_ref_no": "N",
        "hold_nature": "SI",
        "tax_status": 1,
        "kyc": "Y",
        "fh_ckyc": "N",
        "fh_ckyc_refno": "",
        "mfu_can": "",
        "dp_id": "",
        "father_name": "",
        "mother_name": "",
        "trxn_acceptance": "ph",
        "addr2": "",
        "addr3": "",
        "res_phone": "",
        "off_phone": "",
        "res_fax": "",
        "off_fax": "",
        "nri_addr1": "",
        "nri_addr2": "",
        "nri_addr3": "",
        "nri_city": "",
        "nri_state": "",
        "nri_pincode": "",
        "nri_country": "",
        "branch_addr2": "",
        "branch_addr3": "",
        "jh1_name": "",
        "jh1_pan": "",
        "jh1_valid_pan": "",
        "jh1_exemption": "",
        "jh1_exempt_category": "",
        "jh1_exempt_ref_no": "",
        "jh1_dob": "",
        "jh1_kyc": "",
        "jh1_ckyc": "",
        "jh1_ckyc_refno": "",
        "jh1_email": "",
        "jh1_mobile_no": "",
        "jh2_name": "",
        "jh2_pan": "",
        "jh2_valid_pan": "",
        "jh2_exemption": "",
        "jh2_exempt_category": "",
        "jh2_exempt_ref_no": "",
        "jh2_dob": "",
        "jh2_kyc": "",
        "jh2_ckyc": "",
        "jh2_ckyc_refno": "",
        "jh2_email": "",
        "jh2_mobile_no": "",
        "no_of_nominee": 1,
        "nominee1_type": "Major",
        "nominee1_name": "",
        "nominee1_dob": "",
        "nominee1_addr1": "",
        "nominee1_addr2": "",
        "nominee1_addr3": "",
        "nominee1_city": "",
        "nominee1_state": "",
        "nominee1_pincode": "",
        "nominee1_relation": "",
        "nominee1_percent": 100,
        "nominee1_guard_name": "",
        "nominee1_guard_pan": "",
        "nominee2_type": "",
        "nominee2_name": "",
        "nominee2_dob": "",
        "nominee2_relation": "",
        "nominee2_percent": "",
        "nominee2_guard_name": "",
        "nominee2_guard_pan": "",
        "nominee3_type": "",
        "nominee3_Name": "",
        "nominee3_dob": "",
        "nominee3_relation": "",
        "nominee3_percent": "",
        "nominee3_guard_name": "",
        "nominee3_guard_pan": "",
        "guard_name": "",
        "guard_pan": "",
        "guard_valid_pan": "",
        "guard_exemption": "",
        "guard_exempt_category": "",
        "guard_pan_ref_no": "",
        "guard_dob": "",
        "guard_kyc": "",
        "guard_ckyc": "",
        "guard_ckyc_refno": "",
        "micr_no": 123456789,
        "FD_Flag": "Y",
        "App_Key": 123456789,
        "guardian_relation": "",
        "mobile_relation": "SE",
        "email_relation": "SE",
        "NOM1_PAN": "",
        "NOM2_PAN": "",
        "NOM3_PAN": "",
        "NOMINEE_OPTED": "",
        "JH1_MOBILE_RELATION": "SP",
        "JH1_EMAIL_RELATION": "SE",
        "JH2_MOBILE_RELATION": "SE",
        "JH2_EMAIL_RELATION": "DP",
        "NOM1_GUARDIAN_RELATION": "",
        "NOM2_GUARDIAN_RELATION": "",
        "NOM3_GUARDIAN_RELATION": ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [validationErrors, setValidationErrors] = useState<any>({});
    const states = [{ code: "ND", title: "NEW DELHI" }];

    const dateConverter = (str) => {
        const month = ["Jan", "Feb", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        var date = new Date(str);
        var mnth = (date.getMonth());
        var day = ("0" + date.getDate()).slice(-2);
        var year = date.getFullYear();
        return `${day}-${month[mnth]}-${year}`;
    }

    const handleChange = event => {
        var { name, value } = event.target;
        if (name == "dob" || name == "nominee1_dob") {
            const date = dateConverter(value);
            value = date;
        }
        if (name == "NOMINEE_OPTED") {
            if (value == "Y") setIsNomOpt(true);
            if (value == "N") setIsNomOpt(false);
        }
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("formData : ", formData);
        // setValidationErrors({});
        // setIsLoading(true);
        // console.log(formData);
        // axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/folio`, formData,
        //     {
        //         headers: { Authorization: `Bearer ${accessToken}` },
        //         params: {
        //             inv_id: capturedData.inv_id
        //         }
        //     }).then(res => {
        //         // navigate(`/dashboardSuper/investment`)
        //         const { data } = res;
        //         setIsLoading(false);
        //         if (!data.succ) {
        //             setMessage(data.message)
        //             setIsFailure(true)
        //             return;
        //         }
        //         capturedDataHandler('folio', data.folio)
        //         handleNext();
        //     }).catch(({ response }) => {
        //         setIsLoading(false);
        //         setIsFailure(true)
        //         const { data } = response;
        //         setValidationErrors(data.validationErrors);
        //     })


    };

    const handleCloseSnackbar = () => {
        setIsFailure(false);
    };

    return (
        <Card sx={{ maxWidth: 600, margin: "0 auto" }}>
            <CardContent>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Create Folio
                    </Typography>

                    <TextField
                        label="Email"
                        name="email"
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        error={!!validationErrors.email} // Check if the field has an error
                        helperText={validationErrors.email} // Display the error message
                    />

                    <TextField
                        label="Mobile"
                        name="mobile_no"
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        error={!!validationErrors.mobile} // Check if the field has an error
                        helperText={validationErrors.mobile} // Display the error message
                    />

                    <TextField
                        label="Date of Birth"
                        type="date"
                        name="dob"
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        required
                        error={!!validationErrors.dob} // Check if the field has an error
                        helperText={validationErrors.dob} // Display the error message
                        focused
                    />

                    <TextField
                        label="Occupation"
                        name="occupation"
                        onChange={handleChange}
                        margin="normal"
                        fullWidth
                        required
                        error={!!validationErrors.OCCUP} // Check if the field has an error
                        helperText={validationErrors.OCCUP} // Display the error message
                        select
                    >
                        {Occupation.map((ele, idx) => {
                            return <MenuItem key={idx} value={ele.id} >{ele.value}</MenuItem>
                        })}
                    </TextField>
                    <TextField
                        label="Address"
                        name="addr1"
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        error={!!validationErrors.addr1} // Check if the field has an error
                        helperText={validationErrors.addr1} // Display the error message
                    />
                    <TextField
                        label="City"
                        name="city"
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        error={!!validationErrors.city} // Check if the field has an error
                        helperText={validationErrors.city} // Display the error message
                    />

                    <TextField
                        label="State"
                        name="state"
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        select
                        error={!!validationErrors.nominee1_state} // Check if the field has an error
                        helperText={validationErrors.nominee1_state} // Display the error message
                    >
                        {states.map((ele, indx) => {
                            return <MenuItem key={indx} value={ele.code} >{ele.title}</MenuItem>
                        })}
                    </TextField>
                    <TextField
                        label="Contry"
                        name="contry"
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        select
                        error={!!validationErrors.contry} // Check if the field has an error
                        helperText={validationErrors.contry} // Display the error message
                    >
                        {Country.map((ele, indx) => {
                            return <MenuItem key={indx} value={ele.code} >{ele.title}</MenuItem>
                        })}
                    </TextField>
                    <TextField
                        label="Pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        error={!!validationErrors.pincode} // Check if the field has an error
                        helperText={validationErrors.pincode} // Display the error message
                    />


                    <TextField
                        label="NOMINEE OPTION"
                        name="NOMINEE_OPTED"
                        onChange={handleChange}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        required
                        select
                    >
                        {
                            [{ code: "Y", name: "YES" }, { code: "N", name: "NO" }].map((each, indx) => {
                                return <MenuItem key={indx} value={each.code}>
                                    {each.name}
                                </MenuItem>
                            })
                        }
                    </TextField>
                    {isNomOpt && (
                        <>
                            <TextField
                                label="Nominee Name"
                                name="nominee1_name"
                                value={formData.nominee1_name}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                fullWidth

                                error={!!validationErrors.nominee1_name} // Check if the field has an error
                                helperText={validationErrors.nominee1_name} // Display the error message
                            />
                            <TextField
                                label="Nominee Date of Birth"
                                name="nominee1_dob"
                                type='date'
                                value={formData.nominee1_dob}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                focused

                                error={!!validationErrors.nominee1_dob} // Check if the field has an error
                                helperText={validationErrors.nominee1_dob} // Display the error message
                            />
                            <TextField
                                label="Nominee Relation"
                                name="nominee1_relation"
                                value={formData.nominee1_relation}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                fullWidth

                                select
                                error={!!validationErrors.nominee1_relation} // Check if the field has an error
                                helperText={validationErrors.nominee1_relation} // Display the error message
                            >
                                {
                                    relationArray.map((ele, idx) => {
                                        return <MenuItem key={idx} value={ele} > {ele} </MenuItem>
                                    })
                                }
                            </TextField>

                            <TextField
                                label="Nominee Address"
                                name="nominee1_addr1"
                                value={formData.nominee1_addr1}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                error={!!validationErrors.nominee1_addr1} // Check if the field has an error
                                helperText={validationErrors.nominee1_addr1} // Display the error message
                            />
                            <TextField
                                label="Nominee City"
                                name="nominee1_city"
                                value={formData.nominee1_city}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                error={!!validationErrors.nominee1_city} // Check if the field has an error
                                helperText={validationErrors.nominee1_city} // Display the error message
                            />
                            <TextField
                                label="Nominee State"
                                name="nominee1_state"
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                select
                                error={!!validationErrors.nominee1_state} // Check if the field has an error
                                helperText={validationErrors.nominee1_state} // Display the error message
                            >
                                {states.map((ele, indx) => {
                                    return <MenuItem key={indx} value={ele.code} >{ele.title}</MenuItem>
                                })}
                            </TextField>
                            <TextField
                                label="Nominee Pincode"
                                name="nominee1_pincode"
                                value={formData.nominee1_pincode}
                                onChange={handleChange}
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                error={!!validationErrors.nominee1_pincode} // Check if the field has an error
                                helperText={validationErrors.nominee1_pincode} // Display the error message
                            />

                        </>
                    )}

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isLoading}
                        fullWidth
                        sx={{ marginTop: 2 }}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Submit"
                        )}
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
                sx={{ marginBottom: 2 }}
            >
                <Alert severity="error">{message}</Alert>
            </Snackbar>
        </Card>
    );
};

export default FolioCreateNSE;