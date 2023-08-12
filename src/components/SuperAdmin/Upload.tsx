import React from 'react'
import { TextField, Snackbar, Alert, Paper, Card, Box, LinearProgress, CircularProgress, CardContent, Button, Typography } from "@mui/material";
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Loading from '../Dashboard/Loading';

function Upload({ accessToken }) {
    const navigate = useNavigate();
    const [isUploaded, setIsUploaded] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [message, setMessage] = useState("");
    const [nav_report, setNav_report] = useState<any>(null)
    const [transaction_report, setTransaction_report] = useState<any>(null)

    const fileChangeHandler = event => {
        const { name } = event.target;
        if (name == "nav_report") {
            setNav_report(event.target.files[0]);
        } else if (name == "transaction_report") {
            setTransaction_report(event.target.files[0]);
        }
    };
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("nav_report", nav_report)
        formData.append("transaction_report", transaction_report)
        console.log("formda", formData)
        try {
            setIsLoading(true);
            await axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/super/upload/reports`, formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': `multipart/form-data`
                },
                onUploadProgress: (progressEvent) => {
                    const progress = (progressEvent.loaded / progressEvent.total) * 50;
                    setProgress(progress);
                },
                onDownloadProgress: (progressEvent) => {
                    const progress = 50 + (progressEvent.loaded / progressEvent.total) * 50;
                    console.log(progress);
                    setProgress(progress);
                },
            }).then((res) => {
                const { data } = res;
                if (!data.succ) {
                    setIsFailure(true);
                    setMessage(data.message);
                    setIsLoading(false)
                    setProgress(0)
                    return;
                }
                setIsSuccess(true);
                setMessage(data.message);
                setIsLoading(false)
                setTimeout(() => {
                    navigate('/dashboardSuper/investment')
                }, 3000);
                return;
            })
        } catch (error: any) {
            setIsFailure(true);
            setMessage(error.message);
            setIsLoading(false)
            setProgress(0)
            return;
        }
    };
    
    return (
        <Card sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "90vh" }}>
            <Paper elevation={2} sx={{ p: 3 }}>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Typography variant="subtitle1">Company Related Documents</Typography>
                    <TextField
                        label="Upload Nav Report"
                        onChange={fileChangeHandler}
                        name="nav_report"
                        type="file"
                        required
                        variant="outlined"
                        hidden
                        margin="normal"
                        helperText=""
                        fullWidth
                        focused
                    ></TextField>
                    <TextField
                        label="Upload Transaction Report"
                        onChange={fileChangeHandler}
                        name="transaction_report"
                        type="file"
                        required
                        variant="outlined"
                        hidden
                        focused
                        margin="normal"
                        helperText=" "
                        fullWidth
                    ></TextField>

                    {isSuccess ? (
                        <Box marginY={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                disabled={isLoading}
                                fullWidth
                                sx={{
                                    marginTop: 2, backgroundColor: "green", "&:hover": {
                                        backgroundColor: "green",
                                    },
                                }}
                            >
                                {isLoading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "Submitted"
                                )}
                            </Button>
                        </Box>) : (<Box marginY={3}>
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
                            {progress > 0 && <LinearProgress variant="determinate" value={progress} />}
                        </Box>)}
                </form>
            </Paper>
            <Snackbar
                open={isSuccess}
                autoHideDuration={3000}
                onClose={() => { }}
                message=""
                sx={{ marginBottom: 2 }}
            >
                <Alert severity="success" sx={{ width: "100%" }} className="snack">
                    {message}
                </Alert>
            </Snackbar>

            <Snackbar
                open={isFailure}
                autoHideDuration={3000}
                onClose={() => setIsFailure(false)}
                sx={{ marginBottom: 2 }}
            >
                <Alert severity="error" sx={{ width: "100%" }} className="snack">
                    {message}
                </Alert>
            </Snackbar>
        </Card>
    )
}

export default Upload