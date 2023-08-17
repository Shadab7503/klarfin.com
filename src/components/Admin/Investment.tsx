import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Dashboard/Loading";
import { Divider, Paper, Typography, Grid } from "@mui/material";
import { FormatNumber, ConvertToPercentage } from '../../utils/formatNumber';
import { useAppContext } from "../../Store/AppContext";

const dummyData = [
  {
    "_id": "64dc8b7b52c33b11829e1dde",
    "Investor_Name": "Siddhant Gupta",
    "Scheme_Code": "ONGP",
    "PAN1": "AVLPG2653F",
    "Folio_Number": "4.77291E+11",
    "Fund_Description": "NIPPON INDIA OVERNIGHT FUND - GROWTH PLAN",
    "Transaction_Description": "Purchase",
    "Transaction_Date": "2023-08-01T18:30:00.000Z",
    "Nav": "122.4885",
    "Units": "163.281",
    "Amount": "20000",
    "Transaction_Number": "13897942",
    "Org_Purchase_Date": "2023-07-30T18:30:00.000Z",
    "Org_Purchase_Amount": "99995",
    "Org_Purchase_Units": "816.78",
    "Product_Code": "RMFONGP",
    "createdAt": "2023-08-16T08:40:27.251Z",
    "updatedAt": "2023-08-16T08:40:27.251Z",
    "__v": 0
  },
  {
    "_id": "64dc8b7b52c33b11829e1dde",
    "Investor_Name": "Siddhant Gupta",
    "Scheme_Code": "ONGP",
    "PAN1": "AVLPG2653F",
    "Folio_Number": "4.77291E+11",
    "Fund_Description": "NIPPON INDIA OVERNIGHT FUND - GROWTH PLAN",
    "Transaction_Description": "Redemption",
    "Transaction_Date": "2023-08-04T18:30:00.000Z",
    "Nav": "122.4885",
    "Units": "163.281",
    "Amount": "20000",
    "Transaction_Number": "13897942",
    "Org_Purchase_Date": "2023-07-30T18:30:00.000Z",
    "Org_Purchase_Amount": "99995",
    "Org_Purchase_Units": "816.78",
    "Product_Code": "RMFONGP",
    "createdAt": "2023-08-16T08:40:27.251Z",
    "updatedAt": "2023-08-16T08:40:27.251Z",
    "__v": 0
  },
  {
    "_id": "64dc8b7b52c33b11829e1dde",
    "Investor_Name": "Siddhant Gupta",
    "Scheme_Code": "ONGP",
    "PAN1": "AVLPG2653F",
    "Folio_Number": "4.77291E+11",
    "Fund_Description": "NIPPON INDIA OVERNIGHT FUND - GROWTH PLAN",
    "Transaction_Description": "Purchase",
    "Transaction_Date": "2023-08-02T18:30:00.000Z",
    "Nav": "122.4885",
    "Units": "163.281",
    "Amount": "20000",
    "Transaction_Number": "13897942",
    "Org_Purchase_Date": "2023-07-30T18:30:00.000Z",
    "Org_Purchase_Amount": "99995",
    "Org_Purchase_Units": "816.78",
    "Product_Code": "RMFONGP",
    "createdAt": "2023-08-16T08:40:27.251Z",
    "updatedAt": "2023-08-16T08:40:27.251Z",
    "__v": 0
  },
  {
    "_id": "64dc8b7b52c33b11829e1dde",
    "Investor_Name": "Siddhant Gupta",
    "Scheme_Code": "LFIG",
    "PAN1": "AVLPG2653F",
    "Folio_Number": "4.77291E+11",
    "Fund_Description": "NIPPON INDIA LIQUID FUND - GROWTH PLAN - GROWTH OPTION",
    "Transaction_Description": "Redemption",
    "Transaction_Date": "2023-08-05T18:30:00.000Z",
    "Nav": "122.4885",
    "Units": "163.281",
    "Amount": "20000",
    "Transaction_Number": "13897942",
    "Org_Purchase_Date": "2023-07-30T18:30:00.000Z",
    "Org_Purchase_Amount": "99995",
    "Org_Purchase_Units": "816.78",
    "Product_Code": "RMFONGP",
    "createdAt": "2023-08-16T08:40:27.251Z",
    "updatedAt": "2023-08-16T08:40:27.251Z",
    "__v": 0
  },
  {
    "_id": "64dc8b7b52c33b11829e1dde",
    "Investor_Name": "Siddhant Gupta",
    "Scheme_Code": "ONGP",
    "PAN1": "AVLPG2653F",
    "Folio_Number": "4.77291E+11",
    "Fund_Description": "NIPPON INDIA OVERNIGHT FUND - GROWTH PLAN",
    "Transaction_Description": "Redemption",
    "Transaction_Date": "2023-08-01T18:30:00.000Z",
    "Nav": "122.4885",
    "Units": "163.281",
    "Amount": "20000",
    "Transaction_Number": "13897942",
    "Org_Purchase_Date": "2023-07-30T18:30:00.000Z",
    "Org_Purchase_Amount": "99995",
    "Org_Purchase_Units": "816.78",
    "Product_Code": "RMFONGP",
    "createdAt": "2023-08-16T08:40:27.251Z",
    "updatedAt": "2023-08-16T08:40:27.251Z",
    "__v": 0
  },
  {
    "_id": "64dc8b7b52c33b11829e1dde",
    "Investor_Name": "Siddhant Gupta",
    "Scheme_Code": "LFIG",
    "PAN1": "AVLPG2653F",
    "Folio_Number": "4.77291E+11",
    "Fund_Description": "NIPPON INDIA LIQUID FUND - GROWTH PLAN - GROWTH OPTION",
    "Transaction_Description": "Purchase",
    "Transaction_Date": "2023-08-03T18:30:00.000Z",
    "Nav": "122.4885",
    "Units": "163.281",
    "Amount": "20000",
    "Transaction_Number": "13897942",
    "Org_Purchase_Date": "2023-07-30T18:30:00.000Z",
    "Org_Purchase_Amount": "99995",
    "Org_Purchase_Units": "816.78",
    "Product_Code": "RMFONGP",
    "createdAt": "2023-08-16T08:40:27.251Z",
    "updatedAt": "2023-08-16T08:40:27.251Z",
    "__v": 0
  },
  {
    "_id": "64dc8b7b52c33b11829e1dde",
    "Investor_Name": "Siddhant Gupta",
    "Scheme_Code": "ONGP",
    "PAN1": "AVLPG2653F",
    "Folio_Number": "4.77291E+11",
    "Fund_Description": "NIPPON INDIA OVERNIGHT FUND - GROWTH PLAN",
    "Transaction_Description": "Redemption",
    "Transaction_Date": "2023-08-02T18:30:00.000Z",
    "Nav": "122.4885",
    "Units": "163.281",
    "Amount": "20000",
    "Transaction_Number": "13897942",
    "Org_Purchase_Date": "2023-07-30T18:30:00.000Z",
    "Org_Purchase_Amount": "99995",
    "Org_Purchase_Units": "816.78",
    "Product_Code": "RMFONGP",
    "createdAt": "2023-08-16T08:40:27.251Z",
    "updatedAt": "2023-08-16T08:40:27.251Z",
    "__v": 0
  },
  {
    "_id": "64dc8b7b52c33b11829e1dde",
    "Investor_Name": "Siddhant Gupta",
    "Scheme_Code": "LFIG",
    "PAN1": "AVLPG2653F",
    "Folio_Number": "4.77291E+11",
    "Fund_Description": "NIPPON INDIA LIQUID FUND - GROWTH PLAN - GROWTH OPTION",
    "Transaction_Description": "Redemption",
    "Transaction_Date": "2023-08-01T18:30:00.000Z",
    "Nav": "122.4885",
    "Units": "163.281",
    "Amount": "20000",
    "Transaction_Number": "13897942",
    "Org_Purchase_Date": "2023-07-30T18:30:00.000Z",
    "Org_Purchase_Amount": "99995",
    "Org_Purchase_Units": "816.78",
    "Product_Code": "RMFONGP",
    "createdAt": "2023-08-16T08:40:27.251Z",
    "updatedAt": "2023-08-16T08:40:27.251Z",
    "__v": 0
  },
  {
    "_id": "64dc8b7b52c33b11829e1dde",
    "Investor_Name": "Siddhant Gupta",
    "Scheme_Code": "ONGP",
    "PAN1": "AVLPG2653F",
    "Folio_Number": "4.77291E+11",
    "Fund_Description": "NIPPON INDIA OVERNIGHT FUND - GROWTH PLAN",
    "Transaction_Description": "Redemption",
    "Transaction_Date": "2023-08-01T18:30:00.000Z",
    "Nav": "122.4885",
    "Units": "163.281",
    "Amount": "20000",
    "Transaction_Number": "13897942",
    "Org_Purchase_Date": "2023-07-30T18:30:00.000Z",
    "Org_Purchase_Amount": "99995",
    "Org_Purchase_Units": "816.78",
    "Product_Code": "RMFONGP",
    "createdAt": "2023-08-16T08:40:27.251Z",
    "updatedAt": "2023-08-16T08:40:27.251Z",
    "__v": 0
  }, {
    "_id": "64dc8b7b52c33b11829e1dde",
    "Investor_Name": "Siddhant Gupta",
    "Scheme_Code": "LFIG",
    "PAN1": "AVLPG2653F",
    "Folio_Number": "4.77291E+11",
    "Fund_Description": "NIPPON INDIA LIQUID FUND - GROWTH PLAN - GROWTH OPTION",
    "Transaction_Description": "Purchase",
    "Transaction_Date": "2023-08-03T18:30:00.000Z",
    "Nav": "122.4885",
    "Units": "163.281",
    "Amount": "20000",
    "Transaction_Number": "13897942",
    "Org_Purchase_Date": "2023-07-30T18:30:00.000Z",
    "Org_Purchase_Amount": "99995",
    "Org_Purchase_Units": "816.78",
    "Product_Code": "RMFONGP",
    "createdAt": "2023-08-16T08:40:27.251Z",
    "updatedAt": "2023-08-16T08:40:27.251Z",
    "__v": 0
  },
]


export default function Investment(props: any) {
  const [storeState, dispatch] = useAppContext();
  const [open, setOpen] = React.useState(false);
  const [tranx, setTranx] = useState<any>([]);
  const [netInvestment, setnetInvestment] = useState(0);
  const [data,setDatas] = useState<any>({});
  const [Data, setData] = useState({
    'Scheme_Description': {
      AMOUNT: '0',
      CUSTOMER_ID: '',
      INVESTOR_NAME: ''
    }
  });

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

  const [loading, setLoading] = useState(false);
  const [SumInProcessAmt, setSumInProcessAmt] = useState(0);
  const [SumTotalAmt, setSumTotalAmount] = useState(0);
  const [SumInvestedAmt, setSumInvestedAmt] = useState(0);
  const str = "en-IN";
  //console.log("state : ", storeState)

  const getTransactionReports = async () => {
    await axios.get(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/transactionreport`, {
      params: {
        pan: storeState.ACTIVEINVETOR.folio.pan,
      },
      headers: {
        Authorization: `Bearer ${props.accessToken}`
      }
    }).then(async (res) => {
      console.log("res : ", res)
      const { data } = res.data;
      let arrData: any = [];
      let objectData: any = {
        // totalRedeemunits: 0,
        // totalPurchaseunits: 0,
        // totalPurchaseAmount: 0,
        // totalRedeemAmount: 0
      }

      dummyData.map((ele) => {
        //addition the Purchase Units and Redeem units
        // if (ele.Transaction_Description == "Purchase") {
        //   objectData["totalPurchaseunits"] = +objectData["totalPurchaseunits"] + Number(ele.Units)
        //   objectData["totalPurchaseAmount"] = +objectData["totalPurchaseAmount"] + Number(ele.Amount)
        // } else if (ele.Transaction_Description == "Redemption") {
        //   objectData["totalRedeemunits"] = +objectData["totalRedeemunits"] + Number(ele.Units)
        //   objectData["totalRedeemAmount"] = +objectData["totalRedeemAmount"] + Number(ele.Amount)
        // }
        //Seprated the different fund elements
        if (objectData[ele.Fund_Description]) {
          let valu = +objectData[ele.Fund_Description]["Amount"];
          let units = +objectData[ele.Fund_Description]["Units"];
          if (ele.Transaction_Description == "Redemption") {
            valu = valu - Number(ele.Amount);
            units = units - Number(ele.Units);
          } else if (ele.Transaction_Description == "Purchase") {
            valu = valu + Number(ele.Amount);
            units = units + Number(ele.Units);
          }
          objectData[ele.Fund_Description] = {
            ...ele, Amount: valu,Units:units
          }
        } else {
          let amount = ele.Amount;
          let units = ele.Units;
          if (ele.Transaction_Description == "Redemption") {
            objectData[ele.Fund_Description] = {...ele,Amount:-amount,Units: -units};
          } else if (ele.Transaction_Description == "Purchase") {
            objectData[ele.Fund_Description] = ele;
          }
        }
      })
      setDatas(objectData);
      console.log(objectData);
      // await axios.get(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/navreport`, {
      //   params:{arrData},
      //   headers: {
      //     Authorization: `Bearer ${props.accessToken}`
      //   }
      // }).then((res) => {
      //   console.log("res : ", res)
      // })
    })
  }


  const getTranxData = async () => {
    setLoading(true);
    await axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/nse/transaction`, { iin: storeState.ACTIVEINVETOR.folio.Folio, from_date: "01-Mar-2023", to_date: dateConverter(Date.now()), triggered_trxn: "N", initiated_by: "B" },
      {
        headers: {
          Authorization: `Bearer ${props.accessToken}`
        }
      }).then(async (res) => {
        const { resData } = await res.data;
        const objectData = {}
        let amount = 0;
        await resData?.map((ele) => {
          amount = +ele.AMOUNT + amount;
          if (objectData[ele.SCHEME_NAME]) {
            const numb = Number(objectData[ele.SCHEME_NAME].AMOUNT) + Number(ele.AMOUNT);
            objectData[ele.SCHEME_NAME] = {
              ...ele,
              AMOUNT: numb
            }
          }
          objectData[ele.SCHEME_NAME] = {
            ...ele,
          }
        })
        setSumTotalAmount(amount);

        setData({ ...Data, ...objectData });
      })
    setLoading(false)
  }
  useEffect(() => {
    getTranxData();
    getTransactionReports();
  }, [storeState.ACTIVEINVETOR])

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
              <Typography variant="h4" >{FormatNumber(SumTotalAmt)}</Typography>
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
              <Typography style={{ fontWeight: 600, color: "grey" }} variant="body1" >Returns through Klarfin till Date</Typography>
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
        {Object.entries(data)?.map((each, idx) => {
          const key = each[0];
          const value:any = each[1];
          return <>
            <div key={idx} style={{ display: 'flex', flexDirection: 'row', minWidth: '69vw', justifyContent: 'center' }}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography style={{ fontWeight: 600 }} variant="body1">
                  {key}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={2.5} display="flex" justifyContent="center" alignItems="center">
                {(SumTotalAmt - (SumInvestedAmt - SumInProcessAmt)) < 0 ?
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6" color="red" >
                      {FormatNumber(value.Amount)}
                    </Typography>
                    <Typography variant="caption" color="red" >
                      {FormatNumber(value.Amount)}
                    </Typography>
                  </div>
                  : <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h6"  >
                      {FormatNumber(value.Amount)}
                    </Typography>
                    <Typography variant="caption" color="#32CD32" sx={{ textAlign: "end" }} >
                      +{FormatNumber(value.Amount)}
                    </Typography>
                  </div>
                }
              </Grid>
              <Grid item xs={12} sm={6} md={2.5} display="flex" justifyContent="center" alignItems="center">
                <Typography variant="body1">{FormatNumber(value.Units)}</Typography>
              </Grid>
              <Grid container xs={12} sm={6} md={4} display="flex" justifyContent="center" alignItems="center">
                <Grid item sx={{ display: "flex", flexDirection: "row", gap: "10px" }} >
                  <div style={{ padding: "10px", width: "100px", borderRadius: "5px", textAlign: "center", color: "white", backgroundColor: "#ffa500", cursor: "pointer" }} onClick={(e) => navigate(`/dashboardAdmin/nse/order/${value.CUSTOMER_ID}`, { state: value })}  > Buy More</div>
                  <div style={{ padding: "10px", width: "100px", borderRadius: "5px", textAlign: "center", color: "white", backgroundColor: "#318cd6", cursor: "pointer" }} onClick={(e) => navigate(`/dashboardAdmin/redeem/${value.CUSTOMER_ID}`, { state: value })} > Redeem </div>
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
