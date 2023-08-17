import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Dashboard/Loading";
import { Divider, Paper, Typography, Grid } from "@mui/material";
import { FormatNumber, ConvertToPercentage } from '../../utils/formatNumber';
import { useAppContext } from "../../Store/AppContext";

export default function Investment(props: any) {
  const [storeState, dispatch] = useAppContext();
  const [tranx, setTranx] = useState<any>([]);
  const [Data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [NavList, setNavList] = useState<any>([]);
  const [totalSum, setTotalSum] = useState({
    totalInvested: 0,
    totalCurrentValue: 0,
    totalEarnedYesterDay: 0,
    totalEarnedTillDate: 0
  })

  const navigate = useNavigate();
  const [invtType, setInvtType] = useState([{ code: 1, name: "Individual" }, { code: 2, name: "Proprietorship" }, { code: 3, name: "Partnership" }, { code: 4, name: "Company" }])
  const [Banks, setBanks] = useState({
    "HDF": "HDFC Bank",
    "ICI": "ICICI Bank",
    "IDB": "IDBI Bank",
    "INB": "Indian Bank",
    "SBI": "State Bank of India"
  })
  const dateConverter = (str) => {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var date = new Date(str);
    var mnth = (date.getMonth());
    var day = ("0" + date.getDate()).slice(-2);
    var year = date.getFullYear();
    return `${day}-${month[mnth]}-${year}`;
  }
  const getTransactionReports = async () => {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/transactionreport`, {
      params: {
        pan: storeState.ACTIVEINVETOR.folio.pan,
      },
      headers: {
        Authorization: `Bearer ${props.accessToken}`
      }
    }).then(async (res) => {
      const { data } = res.data;
      let arrData: any = [];
      let objectData: any = {}

      data.map((ele) => {
        if (objectData[ele.Fund_Description]) {
          if (ele.Transaction_Description == "Purchase") {
            const pAmount = objectData[ele.Fund_Description]?.purchaseAmount || 0 + Number(ele.Amount);
            const pUnits = +objectData[ele.Fund_Description]?.currentUnits || 0 + Number(ele.Units);
            const redeemUnit = +objectData[ele.Fund_Description]?.redeemUnits || 0
            objectData[ele.Fund_Description] = { ...ele, purchaseAmount: pAmount, currentUnits: pUnits, redeemUnits: redeemUnit }
          } else if (ele.Transaction_Description == "Redemption") {
            const pAmount = objectData[ele.Fund_Description]?.purchaseAmount || 0;
            const rUnits = +objectData[ele.Fund_Description].currentUnits - Number(ele.Units);
            const redeemUnit = objectData[ele.Fund_Description]?.redeemUnits || 0 + Number(ele.Units);
            objectData[ele.Fund_Description] = { ...ele, redeemUnits: redeemUnit, currentUnits: rUnits, purchaseAmount: pAmount }
          }
        } else {
          arrData.push(ele.Scheme_Code);
          if (ele.Transaction_Description == "Purchase") {
            objectData[ele.Fund_Description] = { ...ele, redeemUnits: 0, purchaseAmount: ele.Amount, currentUnits: Number(ele.Units) }
          } else if (ele.Transaction_Description == "Redemption") {
            objectData[ele.Fund_Description] = { ...ele, redeemUnits: Number(ele.Units), purchaseAmount: 0, currentUnits: -Number(ele.Units) }
          }
        }
      })
      console.log("objectData :", objectData)
      setData(objectData);

      await axios.get(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/navreport`, {
        params: { arrData },
        headers: {
          Authorization: `Bearer ${props.accessToken}`
        }
      }).then((res) => {
        setNavList(res.data.data);

        setTotalSum(totalSum => ({
          ...totalSum,
          totalInvested: 0,
          totalCurrentValue: 0,
          totalEarnedYesterDay: 0,
          totalEarnedTillDate: 0
        }))
        Object.entries(objectData)?.map((each) => {
          const value: any = each[1];
          const filteredData: any = [];
          const seenDates = new Set();
          res.data.data.filter(ele => {
            if (ele.Scheme_Code == value.Scheme_Code && !seenDates.has(ele.NAV_Date)) {
              seenDates.add(ele.NAV_Date);
              filteredData.push(ele);
            }
          })
          setTotalSum(totalSum => ({
            ...totalSum,
            totalInvested: Number(totalSum.totalInvested) + Number(value.purchaseAmount),
            totalCurrentValue: Number(totalSum.totalCurrentValue) + Number(value.currentUnits) * filteredData[0].NAV,
            totalEarnedYesterDay: Number(totalSum.totalEarnedYesterDay) + value.currentUnits * (filteredData[0].NAV - filteredData[1].NAV),
            totalEarnedTillDate: Number(totalSum.totalEarnedTillDate) + (value.currentUnits * filteredData[0].NAV) + (value.currentUnits * (filteredData[0].NAV - filteredData[1].NAV))
          }))

        })

      })
    })
    setLoading(false)
  }
  // const getTranxData = async () => {
  //   setLoading(true);
  //   await axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/nse/transaction`, { iin: storeState.ACTIVEINVETOR.folio.Folio, from_date: "01-Mar-2023", to_date: dateConverter(Date.now()), triggered_trxn: "N", initiated_by: "B" },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${props.accessToken}`
  //       }
  //     }).then(async (res) => {
  //       const { resData } = await res.data;
  //       const objectData = {}
  //       let amount = 0;
  //       await resData?.map((ele) => {
  //         amount = +ele.AMOUNT + amount;
  //         if (objectData[ele.SCHEME_NAME]) {
  //           const numb = Number(objectData[ele.SCHEME_NAME].AMOUNT) + Number(ele.AMOUNT);
  //           objectData[ele.SCHEME_NAME] = {
  //             ...ele,
  //             AMOUNT: numb
  //           }
  //         }
  //         objectData[ele.SCHEME_NAME] = {
  //           ...ele,
  //         }
  //       })
  //       setSumTotalAmount(amount);
  //       setData({ ...Data, ...objectData });
  //     })
  //   setLoading(false)
  // }
  useEffect(() => {
    //getTranxData();
    getTransactionReports();
  }, [storeState.ACTIVEINVETOR])

  return loading ? <Loading /> : (
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
              <Typography variant="h4" >{FormatNumber(totalSum.totalInvested)}</Typography>
            </Paper>
            <Paper elevation={2} sx={{ padding: "16px", textAlign: "center", width: "50%" }}>
              <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1">Current Value</Typography>
              <Typography variant="h4" >{FormatNumber(totalSum.totalCurrentValue)}</Typography>
            </Paper>
          </Grid>
          <Grid sx={{ display: "flex", flexDirection: "row" }} >
            <Paper elevation={2} sx={{ padding: "16px", textAlign: "center", width: "50%" }}>
              <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1">Money Earned Yesterday</Typography>
              <Typography variant="h4" >{FormatNumber(totalSum.totalEarnedYesterDay)}</Typography>
            </Paper>
            <Paper elevation={2} sx={{ padding: "16px", textAlign: "center", width: "50%" }} >
              <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" >Returns through Klarfin till Date</Typography>
              <Typography variant="h4" >{FormatNumber(totalSum.totalEarnedTillDate)}</Typography>
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
          const value: any = each[1];
          const filteredData: any = [];
          const seenDates = new Set();
          NavList.filter(ele => {
            if (ele.Scheme_Code == value.Scheme_Code && !seenDates.has(ele.NAV_Date)) {
              seenDates.add(ele.NAV_Date);
              filteredData.push(ele);
            }
          });
          const data = filteredData.slice(0, 3)
          return <>
            <div key={idx} style={{ display: 'flex', flexDirection: 'row', minWidth: '69vw', justifyContent: 'center' }}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography style={{ fontWeight: 600 }} variant="body1">
                  {key}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={2.5} display="flex" justifyContent="center" alignItems="center">
                {data.length > 1 && (data[0]?.NAV - data[1]?.NAV) < 0 ?
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" >
                      {FormatNumber(value.purchaseAmount)}
                    </Typography>
                    <Typography variant="caption" color="red" sx={{ textAlign: "end" }}>
                      {FormatNumber((value.currentUnits * (data[0]?.NAV - data[1]?.NAV)))}
                    </Typography>
                  </div>
                  : <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6"  >
                      {FormatNumber(value.purchaseAmount)}
                    </Typography>
                    <Typography variant="caption" color="#32CD32" sx={{ textAlign: "end" }} >
                      +{FormatNumber((value.currentUnits * (data[0]?.NAV - data[1]?.NAV)))}
                    </Typography>
                  </div>
                }
              </Grid>
              <Grid item xs={12} sm={6} md={2.5} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="body1">{FormatNumber((value.currentUnits * data[0]?.NAV))}</Typography>
              </Grid>
              <Grid container xs={12} sm={6} md={4} display="flex" justifyContent="center" alignItems="center">
                <Grid item sx={{ display: "flex", flexDirection: "row", gap: "10px" }} >
                  <div style={{ padding: "10px", width: "100px", borderRadius: "5px", textAlign: "center", color: "white", backgroundColor: "#ffa500", cursor: "pointer" }} onClick={(e) => navigate(`/dashboardAdmin/nse/order/${value.CUSTOMER_ID}`, { state: { value, data } })}  > Buy More</div>
                  <div style={{ padding: "10px", width: "100px", borderRadius: "5px", textAlign: "center", color: "white", backgroundColor: "#318cd6", cursor: "pointer" }} onClick={(e) => navigate(`/dashboardAdmin/redeem/${value.CUSTOMER_ID}`, { state: { value, data } })} > Redeem </div>
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
