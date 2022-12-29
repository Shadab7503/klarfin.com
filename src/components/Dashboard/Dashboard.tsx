import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import CashFlows from "./CashFlows";
import Insights from "./Insights";
import Receivables from "./Receivables";
import Bills from "./Bills";
import Settings from "./Settings";
import Loading from "./Loading";
// import CreditManagement from "./CreditManagement";
import axios from "axios";
import { CashinFlow, CashoutFlow, Inflow, InflowData, Journal, JournalType, Outflow, OutflowData, Payments, Purchase, PurchaseType, StringDict, User } from "../../utils/interface";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLayout from "../Layout/adminLayout";
import moment from "moment";
import dayjs, { Dayjs } from "dayjs";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string>("Cash Flows");
  const [user, setUser] = useState<User>({} as User);

  const [insightsData,setInsightsData] = useState<any>(null);

  const selectedItemComponents: {
    [key: string]: JSX.Element;
  } = {
    "Cash Flows": <CashFlows accessToken={accessToken} />,
    Insights: <Insights accessToken={accessToken} />,
    Receivables: <Receivables name={user.name} />,
    "Bills to Pay": <Bills />,
    Settings: (
      <Settings role={user.role} email={user.email} accessToken={accessToken} />
    ),
    // "Credit Management": <CreditManagement />,
  };

  useEffect(() => {
    let tokens = localStorage.getItem("tokens");
    try {
      if (tokens) {
        const tokensObj = JSON.parse(tokens);
        setAccessToken(tokensObj.accessToken);
      } else window.location.href = "/";
    } catch (err) {
      localStorage.removeItem("tokens");
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      axios
        .get(process.env.REACT_APP_BACKEND_HOST + "v1/admin/getAllDetails", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          if ("role" in response.data) {
            setUser(response.data);
            setIsLoggedIn(true);
            getInsightsData();
            getCashflowData();
          } else {
            localStorage.removeItem("tokens");
            window.location.href = "/";
          }
          
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("tokens");
          window.location.href = "/";
        });
    }
  }, [accessToken]);


  


  const [inflowCategories, setInflowCategories] = useState<StringDict>({});
  const [inFlowData, setInFlowData] = useState<InflowData>({} as InflowData);
  const [outflowCategories, setOutflowCategories] = useState<StringDict>({});
  const [outFlowData, setOutFlowData] = useState<InflowData>({} as InflowData);
  const [minDate, setMinDate] = useState<Dayjs>();
  const [maxDate, setMaxDate] = useState<Dayjs>();
  const [globalMinDate, setGlobalMinDate] = useState<Dayjs>();
  const [globalMaxDate, setGlobalMaxDate] = useState<Dayjs>();
  const [fromValue, setFromValue] = useState<Dayjs | null>();
  const [toValue, setToValue] = useState<Dayjs | null>();
  const [loadedPage, setLoadedPage] = useState<boolean>(false);


  useEffect(()=>{
    if(!toValue) return;

    getInsightsData();

  },[globalMaxDate,globalMinDate,fromValue,toValue])

  const getInsightsData = ()=>{

    axios
    .post(process.env.REACT_APP_BACKEND_HOST + "v1/user/insights/insights",{
      startDate:fromValue,
      endDate:toValue
    } ,{
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    .then(({data}) => {
      setInsightsData(data);
      
    });

  }

  const getCashflowData = ()=>{
  
    axios
      .get(process.env.REACT_APP_BACKEND_HOST + "v1/user/cashinflow/cash", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setupInflow(response.data);
        // setOpeningBalance(response.data.openingBal);
      });

      axios
      .get(process.env.REACT_APP_BACKEND_HOST + "v1/user/cashoutflow/cashout", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        // setupInflow(response.data);
        setupOutflow(response.data);
        // console.log(response.data);
      });

 
  
  const handleMinMaxDates = (min:dayjs.Dayjs,max:dayjs.Dayjs)=>{

   
    if(minDate && (minDate.diff(min) < 0)) {
      setGlobalMinDate(min);
      setFromValue(min);
      setMinDate(min);
    }

    if(maxDate && (maxDate.diff(max) < 0)) {
      setGlobalMaxDate(max);
      setToValue(max);
      setMaxDate(max);
    }

    if(!maxDate || !minDate) {
      
    setGlobalMinDate(min);
    setFromValue(min);
    setMinDate(min);

    setGlobalMaxDate(max);
      setToValue(max);
      setMaxDate(max);
    }

  }

  const setupInflow = (inflow: Inflow) => {
    const cashinflow_data = inflow.cashinflow;

    // const minimum_date = dayjs(
    //   cashinflow_data[0]["cashinflow_receipt"][0]["voucherdate"],'DD-MM-YYYY'
    // );
    // const maximum_date = dayjs(
    //   cashinflow_data[cashinflow_data.length - 1]["cashinflow_receipt"][0][
    //     "voucherdate"
    //   ],'DD-MM-YYYY'
    // );

    const dates:string[] = [];

    cashinflow_data.forEach((cashinflow) => {
      cashinflow.cashinflow_receipt.forEach((receipt, index: number) => {
        dates.push(receipt.voucherdate);
      });
    });
    
    const moments = dates.map(d => moment(d,'DD-MM-YYYY'));

    const minimum_date = dayjs(moment(moment.min(moments),'DD-MM-YYYY').format('DD-MM-YYYY'),'DD-MM-YYYY');
    const maximum_date = dayjs(moment(moment.max(moments),'DD-MM-YYYY').format('DD-MM-YYYY'),'DD-MM-YYYY');
    


    handleMinMaxDates(dayjs(minimum_date),dayjs(maximum_date));
    let inflowCategories: StringDict = { Total: 1 };
    let baseInflowData: StringDict = { Total: 0 };
    cashinflow_data.forEach((cashinflow: CashinFlow) => {
      cashinflow.cashinflow_ledger.forEach((ledger) => {
        inflowCategories[ledger.type] = 1;
        baseInflowData[ledger.type] = 0;
      });
    });

    const inflowDataTemp: InflowData = {};

    
    for (let year = minimum_date.year(); year <= maximum_date.year(); year++) {
      let min_month = 0;
      let max_month = 11;
      if (year === minimum_date.year()) min_month = minimum_date.month();
      if (year === maximum_date.year()) max_month = maximum_date.month();
      for (let month = min_month; month <= max_month; month++) {
        const tempDate = dayjs().month(month).year(year);
        inflowDataTemp[tempDate.format("MMM YYYY")] = { ...baseInflowData };
      }
    }

    console.log('voucherDatesdf',minimum_date.year(),maximum_date.year());

    cashinflow_data.forEach((cashinflow) => {
      cashinflow.cashinflow_receipt.forEach((receipt, index: number) => {
        const voucherDate = dayjs(receipt.voucherdate, 'DD-MM-YYYY').format("MMM YYYY");
        inflowDataTemp[voucherDate].Total += receipt.amount;
        inflowDataTemp[voucherDate][cashinflow.cashinflow_ledger[index].type] +=
          receipt.amount;
      });
    });

    setInflowCategories(inflowCategories);
    setInFlowData(inflowDataTemp);
    // setLoadedPage(true);
  };

  
  const setupOutflow = (outflow : Outflow) => {
    let cashoutflow_data = outflow.cashoutflow;
    const dates:string[] = [];

    let outflowCategories: StringDict = {Total: 1 };
    let baseInflowData: StringDict = {Total: 0 };
    cashoutflow_data.forEach((cashoutflow: CashoutFlow) => {
      cashoutflow.cashoutflow_journal.forEach((journal:any) => {
        outflowCategories[journal.type[0].journal_type] = 1;
        baseInflowData[journal.type[0].journal_type] = 0;
        journal.type.forEach((each:JournalType)=>{
          dates.push(each.payment_date);
        })
      });

      cashoutflow.cashoutflow_payments.forEach((payments:any) => {
        outflowCategories[payments.type.payment_type] = 1;
        baseInflowData[payments.type.payment_type] = 0;
        dates.push(payments.voucherdate);
      });
      cashoutflow.cashoutflow_purchase.forEach((purchase:any) => {
        outflowCategories[purchase.type[0].purchase_type] = 1;
        baseInflowData[purchase.type[0].purchase_type] = 0;

        purchase.type.forEach((each:PurchaseType)=>{
          dates.push(each.payment_voucherdate);
        })
      });
    });
    

    const moments = dates.map(d => moment(d,'DD-MM-YYYY'));

    const minimum_date = dayjs(moment(moment.min(moments),'DD-MM-YYYY').format('DD-MM-YYYY'),'DD-MM-YYYY');
    const maximum_date = dayjs(moment(moment.max(moments),'DD-MM-YYYY').format('DD-MM-YYYY'),'DD-MM-YYYY');

    // const minimum_date = dayjs(min_date);
    // const maximum_date =  dayjs(max_date);

    handleMinMaxDates(minimum_date,maximum_date);
// console.log('maximum_date',maximum_date)

    const outflowDataTemp: OutflowData = {};
    for (let year = minimum_date.year(); year <= maximum_date.year(); year++) {
      let min_month = 0;
      let max_month = 11;
      if (year === minimum_date.year()) min_month = minimum_date.month();
      if (year === maximum_date.year()) max_month = maximum_date.month();
      for (let month = min_month; month <= max_month; month++) {
        const tempDate = dayjs().month(month).year(year);
        outflowDataTemp[tempDate.format("MMM YYYY")] = { ...baseInflowData };
      }
    }


    cashoutflow_data.forEach((cashoutflow:CashoutFlow) => {
      cashoutflow.cashoutflow_journal.forEach((journal : Journal, index: number) => {
        journal.type.forEach((each:JournalType)=>{
          const voucherDate = dayjs(each.payment_date, 'DD-MM-YYYY').format("MMM YYYY");
          // console.log('voucherDate',voucherDate)
          if(outflowDataTemp[voucherDate]) {
            outflowDataTemp[voucherDate].Total += each.payment_amount*-1;
            outflowDataTemp[voucherDate][each.journal_type] +=
              each.payment_amount*-1;
          }

        })
      });

      cashoutflow.cashoutflow_payments.forEach((payments:Payments, index: number) => {
        const voucherDate = dayjs(payments.voucherdate, 'DD-MM-YYYY').format("MMM YYYY");
          if(outflowDataTemp[voucherDate]) {
            outflowDataTemp[voucherDate].Total += payments.type.payment_amount*-1;
            outflowDataTemp[voucherDate][payments.type.payment_type] +=
              payments.type.payment_amount*-1;

          }
      });

      cashoutflow.cashoutflow_purchase.forEach((purchase:Purchase, index: number) => {
        purchase.type.forEach((each:PurchaseType)=>{
          const voucherDate = dayjs(each.payment_voucherdate, 'DD-MM-YYYY').format("MMM YYYY");
          if(outflowDataTemp[voucherDate]) {
            outflowDataTemp[voucherDate].Total += each.payment_amount*-1;
            outflowDataTemp[voucherDate][each.purchase_type] +=
              each.payment_amount*-1;
          }

        })
      });
    });
    setOutflowCategories(outflowCategories);
    setOutFlowData(outflowDataTemp);
  };

  }

  console.log('outFlowData',outFlowData)
  if (isLoggedIn)
    return (
      
                      <BrowserRouter>
                    <Routes >
                      <Route path="/dashboard/cashflow" element={ <AdminLayout>
                        <CashFlows
                        setLoadedPage={setLoadedPage}
                        loadedPage={loadedPage}
                        globalMinDate={globalMinDate}
                        setGlobalMinDate={setGlobalMinDate}
                        globalMaxDate={globalMaxDate}
                        setGlobalMaxDate={setGlobalMaxDate}
                         fromValue={fromValue}
                        setToValue={setToValue}
                       setFromValue={setFromValue}  toValue={toValue} 
                       inflowCategories={inflowCategories} outflowCategories={outflowCategories} outFlowData={outFlowData} inFlowData={inFlowData} /></AdminLayout>} />
                      <Route path="/dashboard/insights" element={ <AdminLayout><Insights 
                     
                       insightsData={insightsData}
                       globalMinDate={globalMinDate}
                       setGlobalMinDate={setGlobalMinDate}
                       globalMaxDate={globalMaxDate}
                       setGlobalMaxDate={setGlobalMaxDate}
                        fromValue={fromValue}
                       setToValue={setToValue}
                      setFromValue={setFromValue}  toValue={toValue} 
                      outFlowData={outFlowData} inFlowData={inFlowData}
                        /></AdminLayout>} />
                    </Routes>
                  </BrowserRouter>
    );
  else return <Loading />;
};

export default Dashboard;
