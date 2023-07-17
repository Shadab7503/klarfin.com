import { Divider, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Dashboard/Loading";
import { FormatNumber, ConvertToPercentage } from '../../utils/formatNumber';

const Overviews = props => {
    const scheme = {
        BankName: "",
        Folio: "",
        Nav: "",
        Nav_Date: "",
        Plan_code: "",
        SchemeCategory: "",
        SchemeDescription: "",
        Totalunits: "",
        InvestedAmt: "",
        FreeAmt: "",
        InProcessAmt: "",
        TotalAmt: "",
        ActualAmt: "",
        currValue: ""
    }

    const [Funds, setFunds] = useState([{ fund: 'Nippon India Low Duration Fund (G)', ...scheme },
    { fund: 'Nippon India Overnight Fund (G)', ...scheme },
    { fund: 'Nippon India Liquid Fund (G)', ...scheme },
    ]);

    const [loading, setLoading] = useState(false);
    const [SumInProcessAmt, setSumInProcessAmt] = useState(0);
    const [SumTotalAmt, setSumTotalAmount] = useState(0);
    const [SumInvestedAmt, setSumInvestedAmt] = useState(0);

    const getSchemeData = async () => {
        setLoading(true);
        try {
            const res = await Promise.all([
                axios.post(
                    `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/scheme`, { acno: props.folio_id, plan: 'RG', scheme: 'LP' },
                    { headers: { Authorization: `Bearer ${props.accessToken}` }, }
                ),
                axios.post(
                    `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/scheme`, { acno: props.folio_id, plan: 'GP', scheme: 'ON' },
                    { headers: { Authorization: `Bearer ${props.accessToken}` }, }
                ),
                axios.post(
                    `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/scheme`, { acno: props.folio_id, plan: 'IG', scheme: 'LF' },
                    { headers: { Authorization: `Bearer ${props.accessToken}` }, }
                ),
            ]);
            setSumInProcessAmt(0);
            setSumInvestedAmt(0);
            setSumTotalAmount(0);
            const data = res.map((each, idx) => {
                setSumTotalAmount((prev) => prev + parseFloat(each.data.schemeData.TotalAmt))
                setSumInProcessAmt((prev) => prev + parseFloat(each.data.schemeData.InProcessAmt))
                setSumInvestedAmt((prev) => prev + parseFloat(each.data.schemeData.InvestedAmt))
                const fundName = Funds[idx].fund;
                Funds[idx] = { fund: fundName, ...each.data.schemeData }
            });
            //console.log(SumInProcessAmt, ": sumInpamt ");
            //console.log(SumInvestedAmt, " : Suminmt");
            //console.log(SumTotalAmt, " : totalAmt")
            setFunds(Funds);
        } catch {
            throw Error("Failed to Fetching Data from Server");
        }
        setLoading(false);
    };
    useEffect(() => {
        getSchemeData();
       // console.log(Funds)
    }, []);

    if (loading) return <Loading />;
    return (
        <Grid container spacing={2} xs>
            <Paper elevation={3} sx={{ p: 2 }} >
                <Typography variant="h5" sx={{ mb: 1 }}>Overviews</Typography>
                <div style={{ display: 'flex', flexDirection: 'row', minWidth: '76vw', minHeight: '20vh', alignItems: 'center', justifyContent: 'center', margin: 'auto' }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                            Amount Invested
                        </Typography>
                        <Typography variant="h6">
                            {FormatNumber(SumInvestedAmt)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                            Market Value
                        </Typography>
                        <Typography variant="h6">{FormatNumber((SumInvestedAmt - SumInProcessAmt - SumInProcessAmt))}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                            Gain/Loss
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography variant="h6" color="#00D48C" >
                                {FormatNumber((SumInvestedAmt - SumInProcessAmt))}
                            </Typography>
                            <Typography variant="caption" color="#00D48C" sx={{ marginLeft: '1px' }} mt={1}>
                                +{FormatNumber(ConvertToPercentage((SumInvestedAmt - SumInProcessAmt), SumInvestedAmt))}%
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                            In Process Amount
                        </Typography>
                        <Typography variant="h6">{FormatNumber(SumInProcessAmt)}</Typography>
                    </Grid>
                </div>
            </Paper>
            <Paper elevation={3} sx={{ p: 1 }} >
                <Typography variant="h5" sx={{ mb: 4 }}>Scheme Details</Typography>
                <Grid container xs sx={{width:'77vw',padding:"20px"}}>
                    <Grid item xs={12} sm={6} md={2.4} >
                        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                        <strong>Fund</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                            <strong>Amount Invested</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                            <strong>Market Value</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                        <strong>Gain/Loss</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                        <Typography variant="body1" component="div" sx={{ mb: 1 }}>
                        <strong>In Process Amount</strong>
                        </Typography>
                    </Grid>
                </Grid>
                {
                    Funds.map((each, idx) => {

                        return <div key={idx} >
                            <Grid container xs sx={{m:2}}>
                                <Grid item xs={12} sm={6} md={2.4}>
                                    <Typography variant="h6" sx={{ p: 1 }}>
                                        {each.fund}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4}>
                                    <Typography variant="h6">{FormatNumber(each.InvestedAmt)}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4}>
                                    <Typography variant="h6">{FormatNumber((parseFloat(each.InvestedAmt) - parseFloat(each.InProcessAmt) - parseFloat(each.InProcessAmt)))}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <Typography variant="h6" color="#00D48C" >
                                            {FormatNumber((parseFloat(each.InvestedAmt) - parseFloat(each.InProcessAmt)))}
                                        </Typography>
                                        <Typography variant="caption" color="#00D48C" sx={{ marginLeft: '1px' }} mt={1}>
                                            +{FormatNumber(ConvertToPercentage((parseFloat(each.InvestedAmt) - parseFloat(each.InProcessAmt)), each.InvestedAmt))}%
                                        </Typography>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={6} md={2.4}>
                                    <Typography variant="h6">{FormatNumber(each.InProcessAmt)}</Typography>
                                </Grid>
                            </Grid>
                            {idx !== Funds.length - 1 && <Divider />}
                        </div>
                    })
                }
            </Paper>
        </Grid>
    );
};

export default Overviews;
