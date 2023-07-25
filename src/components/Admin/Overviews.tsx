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
    // const GetMarketValue = (data:scheme)=>{
    //     if(data.)
    // }

    const [Funds, setFunds] = useState([{ fund: 'Nippon India Low Duration Fund (G)', ...scheme },
    { fund: 'Nippon India Liquid Fund (G)', ...scheme },
    { fund: 'Nippon India Overnight Fund (G)', ...scheme },
    ]);

    const [loading, setLoading] = useState(false);
    const [SumInProcessAmt, setSumInProcessAmt] = useState(0);
    const [SumTotalAmt, setSumTotalAmount] = useState(0);
    const [SumInvestedAmt, setSumInvestedAmt] = useState(0);
    const str = "en-IN";

    const getSchemeData = async () => {
        setLoading(true);
        try {
            const res = await Promise.all([
                axios.post(
                    `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/scheme`, { acno: props.folio_id, plan: 'RG', scheme: 'LP' },
                    { headers: { Authorization: `Bearer ${props.accessToken}` }, }
                ),
                axios.post(
                    `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/scheme`, { acno: props.folio_id, plan: 'IG', scheme: 'LF' },
                    { headers: { Authorization: `Bearer ${props.accessToken}` }, }
                ),
                axios.post(
                    `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/scheme`, { acno: props.folio_id, plan: 'GP', scheme: 'ON' },
                    { headers: { Authorization: `Bearer ${props.accessToken}` }, }
                )
            ]);
            setSumInProcessAmt(0);
            setSumInvestedAmt(0);
            setSumTotalAmount(0);
            console.log("ress", res)
            const data = res.map((each, idx) => {
                setSumTotalAmount((prev) => prev + parseFloat(each.data.schemeData.TotalAmt))
                setSumInProcessAmt((prev) => prev + parseFloat(each.data.schemeData.InProcessAmt))
                setSumInvestedAmt((prev) => prev + parseFloat(each.data.schemeData.InvestedAmt))
                const fundName = Funds[idx].fund;
                Funds[idx] = { fund: fundName, ...each.data.schemeData }
            });
            setFunds(Funds);
            console.log("Fund : ", Funds)
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
        <Grid container spacing={2} margin={2} xs>
            <Paper elevation={2} sx={{ p: 4, pl: 6, pr: 6 }} >
                <Typography style={{ fontWeight: 600 }} variant="h6" sx={{ mb: 2 }}>Overview</Typography>
                <Divider sx={{ mb: 2 }} />
                <div style={{ display: 'flex', flexDirection: 'row', minWidth: '69vw', minHeight: '12vh', justifyContent: 'center' }}>
                    <Grid item xs={12} sm={6} md={3} >
                        <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" sx={{ mb: 1 }}>
                            Amount Invested
                        </Typography>
                        <Typography variant="h6">
                            {FormatNumber(SumInvestedAmt - SumInProcessAmt)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" sx={{ mb: 1 }}>
                            Market Value
                        </Typography>
                        <Typography variant="h6">{FormatNumber((SumTotalAmt))}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" sx={{ mb: 1 }}>
                            Gain/Loss
                        </Typography>
                        {(SumTotalAmt - (SumInvestedAmt - SumInProcessAmt)) < 0 ?
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" color="red" >
                                    {FormatNumber((SumTotalAmt - (SumInvestedAmt - SumInProcessAmt)))}
                                </Typography>
                                <Typography variant="caption" color="red" >
                                    {FormatNumber(ConvertToPercentage((SumTotalAmt - (SumInvestedAmt - SumInProcessAmt)), (SumInvestedAmt - SumInProcessAmt)))}%
                                </Typography>
                            </div>
                            : <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6" color="#00D48C" >
                                    {FormatNumber((SumTotalAmt - (SumInvestedAmt - SumInProcessAmt)))}
                                </Typography>
                                <Typography variant="caption" color="#00D48C" >
                                    +{FormatNumber(ConvertToPercentage((SumTotalAmt - (SumInvestedAmt - SumInProcessAmt)), (SumInvestedAmt - SumInProcessAmt)))}%
                                </Typography>
                            </div>
                        }

                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" sx={{ mb: 1 }}>
                            In Process Amount
                        </Typography>
                        <Typography variant="h6">{FormatNumber(SumInProcessAmt)}</Typography>
                    </Grid>
                </div>
            </Paper>
            <Paper elevation={2} sx={{ p: 4, pl: 6, pr: 6 }} >
                <Typography style={{ fontWeight: 600 }} variant="h6" sx={{ mb: 2 }}>Scheme Details</Typography>
                <Divider sx={{ mb: 4 }} />
                <div style={{ display: 'flex', flexDirection: 'row', minWidth: '69vw', justifyContent: 'center' }}>
                    <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center" alignItems="center">
                        <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" sx={{ mb: 1 }}>
                            Fund
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} display="flex" justifyContent="center" alignItems="center">
                        <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" sx={{ mb: 1 }}>
                            Amount Invested
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} display="flex" justifyContent="center" alignItems="center">
                        <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" sx={{ mb: 1 }}>
                            Market Value
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} display="flex" justifyContent="center" alignItems="center">
                        <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" sx={{ mb: 1 }}>
                            Gain/Loss
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} display="flex" justifyContent="center" alignItems="center">
                        <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" sx={{ mb: 1 }}>
                            In Process Amount
                        </Typography>
                    </Grid>
                </div>
                <Divider sx={{ mb: 2, mt: 3 }} />
                {Funds.map((each, idx) => {
                    return <>
                        <div key={idx} style={{ display: 'flex', flexDirection: 'row', minWidth: '69vw', justifyContent: 'center' }}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography style={{ fontWeight: 600 }} variant="body1">
                                    {each.fund}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={2} display="flex" justifyContent="center" alignItems="center">
                                <Typography variant="body1">{FormatNumber((parseFloat(each.InvestedAmt) - parseFloat(each.InProcessAmt)))}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={2} display="flex" justifyContent="center" alignItems="center">
                                <Typography variant="body1">{FormatNumber(parseFloat(each.TotalAmt))}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={2} display="flex" justifyContent="center" alignItems="center">
                                {(parseFloat(each.TotalAmt) - (parseFloat(each.InvestedAmt) - parseFloat(each.InProcessAmt))) < 0 ?
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="body1" color="red" >
                                            {FormatNumber((parseFloat(each.TotalAmt) - (parseFloat(each.InvestedAmt) - parseFloat(each.InProcessAmt))))}
                                        </Typography>
                                        <Typography variant="caption" color="red">
                                            {FormatNumber(ConvertToPercentage(((parseFloat(each.TotalAmt) - (parseFloat(each.InvestedAmt) - parseFloat(each.InProcessAmt)))), (parseFloat(each.InvestedAmt) - parseFloat(each.InProcessAmt))))}%
                                        </Typography>
                                    </div> :
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography variant="body1" color="#00D48C" >
                                            {FormatNumber((parseFloat(each.TotalAmt) - (parseFloat(each.InvestedAmt) - parseFloat(each.InProcessAmt))))}
                                        </Typography>
                                        <Typography variant="caption" color="#00D48C">
                                            +{FormatNumber(ConvertToPercentage(((parseFloat(each.TotalAmt) - (parseFloat(each.InvestedAmt) - parseFloat(each.InProcessAmt)))), (parseFloat(each.InvestedAmt) - parseFloat(each.InProcessAmt))))}%
                                        </Typography>
                                    </div>
                                }
                            </Grid>
                            <Grid item xs={12} sm={6} md={2} display="flex" justifyContent="center" alignItems="center">
                                <Typography variant="body1">{FormatNumber(each.InProcessAmt)}</Typography>
                            </Grid>
                        </div>
                        {idx !== Funds.length - 1 && <Divider sx={{ mt: 2, mb: 2 }} />}
                    </>
                })
                }
            </Paper>
        </Grid>
    );
};

export default Overviews;
