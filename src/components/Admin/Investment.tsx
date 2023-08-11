import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Dashboard/Loading";
import { Divider, Paper, Typography, Grid } from "@mui/material";
import { FormatNumber, ConvertToPercentage } from '../../utils/formatNumber';
import { Button } from "react-scroll";
import { useAppContext } from "../../Store/AppContext";

export default function Investment(props: any) {
  const [state, dispatch] = useAppContext();
  const [open, setOpen] = React.useState(false);
  const [tranx, setTranx] = useState<any>([]);
  const [Data, setData] = useState({
    'ONGPGR/NIPPON INDIA OVERNIGHT FUND - GROWTH PLAN': {
      AMOUNT: '0',
      CUSTOMER_ID: '',
      INVESTOR_NAME: ''
    }
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [invtType, setInvtType] = useState([{ code: 1, name: "Individual" }, { code: 2, name: "Proprietorship" }, { code: 3, name: "Partnership" }, { code: 4, name: "Company" }])
  const [Banks, setBanks] = useState({
    "HDF": "HDFC Bank",
    "ICI": "ICICI Bank",
    "IDB": "IDBI Bank",
    "INB": "Indian Bank",
    "SBI": "State Bank of India"
  })

  const [loading, setLoading] = useState(false);
  const [SumInProcessAmt, setSumInProcessAmt] = useState(0);
  const [SumTotalAmt, setSumTotalAmount] = useState(0);
  const [SumInvestedAmt, setSumInvestedAmt] = useState(0);
  const str = "en-IN";

  const getTranxData = async () => {
    setLoading(true);
    await axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/nse/transaction`, { iin: "5011228926", from_date: "01-Mar-2023", to_date: "07-Aug-2023", triggered_trxn: "N", initiated_by: "B" },
      {
        headers: {
          Authorization: `Bearer ${props.accessToken}`
        }
      }).then(async (res) => {
        const { resData } = await res.data;
        console.log("resData : ", resData)
        const objectData = {}
        await resData?.map((ele) => {
          if (objectData[ele.SCHEME_NAME]) {
            objectData[ele.SCHEME_NAME] = {
              AMOUNT: parseFloat(objectData[ele.SCHEME_NAME].AMOUNT) + parseFloat(ele.AMOUNT)
            }
          }
          objectData[ele.SCHEME_NAME] = {
            ...ele
          }
        })
        setData({ ...Data, ...objectData });
      })
    setLoading(false)
  }
  useEffect(() => {
    getTranxData()
  }, [])

  if (loading) return <Loading />
  return (
    <Grid container spacing={2} margin={2} xs>
      <Grid sx={{ display: "flex", position: "fixed", flexDirection: "column", alignItems: "center", marginTop: "-20px", zIndex: "10", background: "#F0E68D", padding: "5px", borderRadius: "5px" }} >
        <Typography variant="body1">
          Thank you for uploading your details.We will compelete your KYC and create your account using these
        </Typography>
        <Typography variant="body1" >
          details. Meanwhile for any queries, please reach out at 9818373388 or shikher@klarfin.com
        </Typography>
      </Grid>
      <Paper elevation={1} sx={{ p: 4, pl: 6, pr: 6 }} >
        <Typography style={{ fontWeight: 600 }} variant="h6" sx={{ mb: 2 }}>Overview</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: '69vw' }} >
          <Grid sx={{ display: "flex", flexDirection: "row" }} >
            <Paper elevation={2} sx={{ padding: "16px", textAlign: "center", width: "50%" }}>
              <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1">Total Invested</Typography>
              <Typography variant="h4" >{FormatNumber(35648.83)}</Typography>
            </Paper>
            <Paper elevation={2} sx={{ padding: "16px", textAlign: "center", width: "50%" }}>
              <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1">Current Value</Typography>
              <Typography variant="h4" >{FormatNumber(31200.83)}</Typography>
            </Paper>
          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "row" }} >
            <Paper elevation={2} sx={{ padding: "16px", textAlign: "center", width: "50%" }}>
              <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1">Money Earned Yesterday</Typography>
              <Typography variant="h4" >{FormatNumber(37465.56)}</Typography>
            </Paper>
            <Paper elevation={2} sx={{ padding: "16px", textAlign: "center", width: "50%" }} >
              <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" >Returns through Klarfin Withrawal till Date</Typography>
              <Typography variant="h4" >{FormatNumber(487365389.93)}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, pl: 6, pr: 6 }} >
        <Typography style={{ fontWeight: 600 }} variant="h6" sx={{ mb: 2 }}>Scheme Wise Report</Typography>
        <Divider sx={{ mb: 2 }} />
        <div style={{ display: 'flex', flexDirection: 'row', minWidth: '69vw', justifyContent: 'center' }}>
          <Grid item xs={12} sm={6} md={3} display="flex" justifyContent="center" alignItems="center">
            <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" >
              Scheme
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2.5} display="flex" justifyContent="center" alignItems="center">
            <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" >
              Amount Invested
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2.5} display="flex" justifyContent="center" alignItems="center">
            <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" >
              Current / Market Value
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={4} display="flex" justifyContent="center" alignItems="center">
            <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" >
              Actions
            </Typography>
          </Grid>
        </div>
        <Divider sx={{ mb: 2, mt: 3 }} />
        {Object.entries(Data)?.map((each, idx) => {
          const key = each[0];
          const value = each[1];
          return <>
            <div key={idx} style={{ display: 'flex', flexDirection: 'row', minWidth: '69vw', justifyContent: 'center' }}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography style={{ fontWeight: 600 }} variant="body1">
                  {each[0].split("/")[1]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={2.5} display="flex" justifyContent="center" alignItems="center">
                {(SumTotalAmt - (SumInvestedAmt - SumInProcessAmt)) < 0 ?
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" color="red" >
                      {FormatNumber(value.AMOUNT)}
                    </Typography>
                    <Typography variant="caption" color="red" >
                      {FormatNumber(value.AMOUNT)}
                    </Typography>
                  </div>
                  : <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6"  >
                      {FormatNumber(value.AMOUNT)}
                    </Typography>
                    <Typography variant="caption" color="#32CD32" sx={{textAlign:"end"}} >
                      +{FormatNumber(value.AMOUNT)}
                    </Typography>
                  </div>
                }
              </Grid>
              <Grid item xs={12} sm={6} md={2.5} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="body1">{value.CUSTOMER_ID}</Typography>
              </Grid>
              <Grid container xs={12} sm={6} md={4} display="flex" justifyContent="center" alignItems="center">
                <Grid item sx={{ display: "flex", flexDirection: "row", gap: "10px" }} >
                  <div style={{ padding: "10px", width: "100px", borderRadius: "5px", textAlign: "center", color: "white", backgroundColor: "#ffa500", cursor: "pointer" }} onClick={(e) => navigate(`/dashboardAdmin/nse/order/${value.CUSTOMER_ID}`, { state: value })}  > Buy More</div>
                  <div style={{ padding: "10px", width: "100px", borderRadius: "5px", textAlign: "center", color: "white", backgroundColor: "#318cd6", cursor: "pointer" }} onClick={(e) => navigate(`/dashboardAdmin/redeem/${value.CUSTOMER_ID}`,{ state: value })} > Redeem </div>
                </Grid>
              </Grid>
            </div>
            {idx !== tranx.length - 1 && <Divider sx={{ mt: 2, mb: 2 }} />}
          </>
        })
        }
      </Paper>
    </Grid>
  )
}
