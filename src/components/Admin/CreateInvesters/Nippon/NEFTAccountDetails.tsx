import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    TextField,
    Button,
    MenuItem,
    CircularProgress,
    Snackbar,
    Card,
    CardContent,
    Typography,
    Paper,
    Divider,
} from "@mui/material";
import axios from "axios";
import { Grid } from "@mui/joy";
import { DataGrid } from "@mui/x-data-grid";

function NEFTAccountDetails({ accessToken }) {
    const navigate = useNavigate();
    const { state }: any = useLocation();
    console.log(state)

    return (
        <Card sx={{p:0,m:0}}>
            <CardContent>
                <Paper elevation={2} sx={{ p: 4, textAlign: "center",m:0 }} >
                    <Typography variant="h6" gutterBottom>
                        Kindly add the following bank account details as beneficiary, if not added already.
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Kindly transfer the order amount into this account to finish your order.
                    </Typography>
                </Paper>
            </CardContent>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}  >
                <Paper elevation={3} sx={{p:4,textAlign:"center",m:0}}>
                    <Grid>
                        <h2>Nippon Bank Details</h2>
                        <Divider sx={{m:2}} />
                        <Typography variant="h6" gutterBottom>
                            Beneficiary Account Number
                        </Typography>
                        <Typography variant="body1">{`2203${state.formData.Pan}`}</Typography>

                        <Typography variant="h6" gutterBottom>
                            Beneficiary Bank IFSC code
                        </Typography>
                        <Typography variant="body1">ICIC0000104</Typography>

                        <Typography variant="h6" gutterBottom>
                            Beneficiary Bank Name
                        </Typography>
                        <Typography variant="body1">ICICI Bank</Typography>
                        <Typography variant="h6" gutterBottom>
                            Type of Account
                        </Typography>
                        <Typography variant="body1">Current Account</Typography>
                        <Typography variant="h6" gutterBottom>
                            Beneficiary Name
                        </Typography>
                        <Typography variant="body1">
                            NIPPON INDIA MUTUAL FUND VIRTUAL POOL ACCOUNT
                        </Typography>
                    </Grid>
                </Paper>
                <Grid container spacing={2} style={{ padding: '20px', margin: '10px' }} >
                    {/* <Button variant="contained" style={{ background: "green", marginRight: "1rem" }}
                        onClick={() => {
                            navigate(`/dashboardAdmin/order/${folio_id}`,
                                { state: state });
                        }}>
                        Create New Order
                    </Button>
                    <Button variant="contained" style={{ background: "orange", marginRight: "1rem" }}
                        onClick={() => {
                            navigate(
                                `/dashboardAdmin/investment/details/${folio_id}`,
                            );
                        }}>
                        View Reports
                    </Button> */}
                </Grid>
            </CardContent>
        </Card>
    );
}

export default NEFTAccountDetails;
