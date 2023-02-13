import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import dayjs, { Dayjs } from "dayjs";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import arrow from "../../images/arrow.png";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  expenseBreakdown,
  balanceSheet,
  pnl,
  cashflows,
} from "../../dummy_data/data";
import axios from "axios";
import { CashflowTable, CashinFlow, CashoutFlow, ExpenseBreakdown, Inflow, InflowData, Journal, JournalType, Outflow, OutflowData, Payments, Purchase, PurchaseType, StringDict } from "../../utils/interface";
import moment from "moment";
import Loading from "./Loading";
import { Button } from "@mui/material";

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  ChartDataLabels,
  Title,
  Tooltip,
  Legend
);

const numFormatter = (value: number) => {
  if(value == 0) {
    return value;
  }

  let isNegitive = false;
  if(value < 0) {
    isNegitive = true;
    value = value * -1;
  }

  let digits = value.toString().length;
  if(value <0) {
    digits--;
  }  
            let number = value.toString();
            if(digits >= 6 || digits >= 7) {
              number = parseInt(number)/100000+' Lakh';
            }

            if(digits >= 8) {
              number = parseInt(number)/10000000+' Crore';

            }

            if(isNegitive) {
              return 'INR -'+number;
            }
            return 'INR '+number;
};

const labels = ["Jan22", "Feb22", "Mar22", "Apr22", "May22", "Jun22"];

const optionsLine = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        boxHeight: 2,
        boxWidth: 25,
        font: {
          family: "Montserrat",
        },
      },
    },
    datalabels: {
      display: false,
    },
  },
  scales: {
    x: {
      offset: true,
      ticks: {
        font: {
          family: "Montserrat",
        },
      },
      grid: {
        display: false,
      },
      font: {
        family: "Montserrat",
      },
    },
    y: {
      offset: true,
      ticks: {
        callback: function (val: string | number, index: number) {
          return numFormatter(Number(val));
        },
        font: {
          family: "Montserrat",
        },
        maxTicksLimit: 5,
      },
      grid: {
        display: false,
      },
    },
  },
};

const optionsBar = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    datalabels: {
      anchor: "end" as const,
      align: "bottom" as const,
      color: "white",
      font: {
        family: "Montserrat",
      },
    },
  },
  scales: {
    x: {
      offset: true,
      ticks: {
        font: {
          family: "Montserrat",
        },
      },
      grid: {
        display: false,
      },
      font: {
        family: "Montserrat",
      },
    },
    y: {
      ticks: {
        font: {
          family: "Montserrat",
        },
        maxTicksLimit: 5,
      },
      title: {
        display: true,
        text: "Days Sales O/S",
      },
      grid: {
        display: false,
      },
    },
  },
};

const optionsPie = {
  maintainAspectRaio: false,
  aspectRaio: 1,
  plugins: {
    legend: {
      position: "right" as const,
      labels: {
        font: {
          family: "Montserrat",
        },
      },
    },
    datalabels: {
      color: ["black", "black", "black", "black", "white"],
      font: { family: "Montserrat", weight: "bold" as const },
      formatter: function (value: number) {
        return String(value) + "%";
      },
    },
  },
};



const data3 = {
  labels,
  datasets: [
    {
      categoryPercentage: 0.9,
      barPercentage: 0.9,
      label: "Days Sales O/S",
      data: [40, 60, 30, 47, 60, 28],
      backgroundColor: "#3085D8",
    },
  ],
};



const Insights = (props:any) => {
 const {
  accessToken
} = props;

  // const globalMinDate: Dayjs = dayjs("2012-03-01");
  // const globalMaxDate: Dayjs = dayjs("2023-06-01");

  const [loadedPage, setLoadedPage] = useState<boolean>(false);


  const [openPeriod, setOpenPeriod] = useState<boolean>(false);
  const [fromValue, setFromValue] = useState<Dayjs | null>();
  const [toValue, setToValue] = useState<Dayjs | null>();
  const [period, setPeriod] = useState<string>("Monthly");
  const [fromOpen, setFromOpen] = useState<boolean>(false);
  const [toOpen, setToOpen] = useState<boolean>(false);
  const [minDate, setMinDate] = useState<Dayjs>();
  const [maxDate, setMaxDate] = useState<Dayjs>();
  const [selectedTab, setSelectedTab] = useState<string>("Categories");
  const [labels,setLabels] = useState<string[]>([]);
  const [revenue,setRevenue] = useState<number[]>([]);
  const [collections,setCollections] = useState<number[]>([]);
  const [expenseBreakdown,setExpenseBreakdown] = useState<ExpenseBreakdown>({
    Categories: [],
    Merchants: [],
  });
  const [netCashBurnData,setNetCashBurnData] = useState<number[]>([]);
  const [grossCashBurnData,setGrossCashBurnData] = useState<number[]>([]);
  const [insightsData,setInsightsData] = useState<any>(null);
  const [outFlowData, setOutFlowData] = useState<CashflowTable>({} as CashflowTable);
  const [globalMinDate, setGlobalMinDate] = useState<Dayjs>();
  const [globalMaxDate, setGlobalMaxDate] = useState<Dayjs>();
  const [inFlowData, setInFlowData] = useState<CashflowTable>({} as CashflowTable);
  const [grossLabels, setGrossLabels] = useState<string[]>([]);
  const [receivables, setReceivables] = useState<number[]>([]);
  const [receivablesLabel, setReceivablesLabel] = useState<string[]>([]);
  
const data1 = {
  labels,
  datasets: [
    {
      label: "Revenue",
      data: revenue,
      backgroundColor: "#2960EC",
      borderColor: "#2960EC",
      pointRadius: 2,
    },
    {
      label: "Collections",
      data: collections,
      backgroundColor: "#39B6D2",
      borderColor: "#39B6D2",
      pointRadius: 2,
    },
  ],
};


const data2 = {
  labels:grossLabels,
  datasets: [
    {
      label: "Gross",
      data: grossCashBurnData,
      backgroundColor: "#2960EC",
      borderColor: "#2960EC",
      pointRadius: 2,
    },
    {
      label: "Net",
      data: netCashBurnData,
      backgroundColor: "#39B6D2",
      borderColor: "#39B6D2",
      pointRadius: 2,
    },
  ],
};

const data4 = {
  // labels : ["0 - 30", "31 - 60", "61 - 90", "91 - 120", "> 120"],
  labels: receivablesLabel,
  datasets: [
    {
    // data: [14.2, 19.81, 22.16, 37.5, 6.3],

      data: receivables,
      backgroundColor: ["#F0F5FE", "#4375F4", "#30A8D8", "#3287D9", "#132F77"],
    },
  ],
};


const getData = async ()=>{
  setLoadedPage(false);

  const [insightsData,cashinflowData,outflowData,statutoryData,receivables,breakdownsData] = await Promise.all([

    axios
    .post(process.env.REACT_APP_BACKEND_HOST + "v1/user/insights/insights",{
      startDate:fromValue,
      endDate:toValue,
      period
    } ,{
      headers: { Authorization: `Bearer ${accessToken}` },
    }),

    axios
          .post(process.env.REACT_APP_BACKEND_HOST + "v1/user/cashinflow/cash", 
          {startDate:fromValue,
            endDate:toValue,
            period
          },
          {
            headers: { Authorization: `Bearer ${props.accessToken}` },
          }),

          axios
        .post(process.env.REACT_APP_BACKEND_HOST + "v1/user/cashoutflow/cashout", 
        {startDate:fromValue,
          endDate:toValue,
          period
        },
        {
          headers: { Authorization: `Bearer ${props.accessToken}` },
        }),

        axios
        .post(process.env.REACT_APP_BACKEND_HOST + "v1/user/insights/statutory-liabilities", 
        {startDate:fromValue,
          endDate:toValue,
          period
        },
        {
          headers: { Authorization: `Bearer ${props.accessToken}` },
        })
        ,
        axios
        .post(process.env.REACT_APP_BACKEND_HOST + "v1/user/insights/receivables", 
        {startDate:fromValue,
          endDate:toValue,
          period
        }, 
        {
          headers: { Authorization: `Bearer ${props.accessToken}` },
        })
        ,
        axios
        .post(process.env.REACT_APP_BACKEND_HOST + "v1/user/insights/breakdowns", 
        {startDate:fromValue,
          endDate:toValue,
          period
        }, 
        {
          headers: { Authorization: `Bearer ${props.accessToken}` },
        })

  ]);

  setInsightsData(insightsData.data);

  setReceivablesLabel(Object.keys(receivables.data.receivables));
  setReceivables(Object.keys(receivables.data.receivables).map((key) => receivables.data.receivables[key]));


  setGrossLabels(cashinflowData.data.data.months)
  setInFlowData(cashinflowData.data.data.outFlowSelectedData);
  setOutFlowData(outflowData.data.data.outFlowSelectedData);


  
  let categories: {
    Name: string;
    spendAmount: number;
    Spend: number;
    Change: number;
  }[] = [
    {
      Name: "Purchase",
      spendAmount: breakdownsData.data.breakedData.purchaseAmt,
      Spend: (breakdownsData.data.breakedData.purchaseAmt/breakdownsData.data.breakedData.total)*100,
      Change: 0,
  }
  ];


  Object.keys(breakdownsData.data.breakedData.breakdowns).forEach(key=>{

    const obj = {
      Name: key,
      spendAmount: breakdownsData.data.breakedData.breakdowns[key],
      Spend: (breakdownsData.data.breakedData.breakdowns[key]/breakdownsData.data.breakedData.total)*100,
      Change: 0,
    }


    categories.push(obj);

  })
  
  categories = categories.sort(function(a, b){return b.spendAmount - a.spendAmount});

    const otherObj =  {
        Name: "Other",
        spendAmount: 0,
        Spend: 0,
        Change: 0,
    }

  let totalPer = 0;

  categories.forEach((each,idx)=>{
    if(totalPer < 90) {

      totalPer += each.Spend;
      return;
    }
      otherObj.spendAmount += each.spendAmount;
      otherObj.Spend += each.Spend;
      each.Spend = 0;
    })

  categories.push(otherObj);

  setExpenseBreakdown({...expenseBreakdown,Categories:categories})



  setLoadedPage(true);
  setOpenPeriod(false)

}



const handleMinMax = (min:string,max:string)=>{

  setMinDate(dayjs(min));
  setGlobalMinDate(dayjs(min))
  setMaxDate(dayjs(max));

  if(dayjs().subtract(1,'year').diff(dayjs(min)) > 0) {
    setFromValue(dayjs().subtract(1, 'year').set('date',1));
  } else {
    setFromValue(dayjs(min));
  }

  
  if(dayjs(max).diff(new Date()) >0) {
    setToValue(dayjs())
    setGlobalMaxDate(dayjs());
  }else {
    setToValue(dayjs(max));
    setGlobalMaxDate(dayjs(max));
  }

}

useEffect(()=>{
  axios
 .get(process.env.REACT_APP_BACKEND_HOST + "v1/user/minmax/minmax", {
   headers: { Authorization: `Bearer ${props.accessToken}` },
  
 })
 .then(({data}) => {
 
  handleMinMax(data.min,data.max);

 });

},[period])

useEffect(()=>{
  if(!globalMinDate || !globalMaxDate) return;
  getData();

},[globalMinDate,globalMaxDate])





useEffect(()=>{
    
  if(!loadedPage) return;
  // let minimum_date = dayjs(
  //   Math.max(fromValue?.valueOf()!, globalMinDate?.valueOf()!)
  //   );

  // let maximum_date = toValue;
  // maximum_date = dayjs(
  //   Math.min(maximum_date?.valueOf()!, globalMaxDate?.valueOf()!)
  // );

  // let selectedOutflow: any = {};
  // // let selectedInflow: CashflowTable = {};

  const grossCashBurn: number[] = [];
  const netCashBurn: number[] = [];
 
  // for (
  //   let year = minimum_date!.year();
  //   year <= maximum_date!.year();
  //   year++
  // ) {
  //   let min_month = 0;
  //   let max_month = 11;
  //   if (year === minimum_date!.year()) min_month = minimum_date!.month();
  //   if (year === maximum_date!.year()) max_month = maximum_date!.month();
  //   for (let month = min_month; month <= max_month; month++) {
  //     const tempDate = dayjs().month(month).year(year);
  //     const outflowTotal = outFlowData[tempDate.format("MMM YYYY")] ? outFlowData[tempDate.format("MMM YYYY")]['Cash outflow'].Total : 0;
  //     selectedOutflow[tempDate.format("MMM YYYY")] = outflowTotal;

  //     grossCashBurn.push(outflowTotal);
  //     const saleTotal = inFlowData[tempDate.format("MMM YYYY")] ? inFlowData[tempDate.format("MMM YYYY")]['Cash outflow'].Sales : 0;

  //     netCashBurn.push(outflowTotal - saleTotal);
   
  //   }
  // }

  Object.keys(outFlowData).forEach(key=>{

    const saleTotal = inFlowData[key] ? inFlowData[key]['Cash outflow'].Sales : 0;
    const outflowTotal = outFlowData[key] ? outFlowData[key]['Cash outflow'].Total : 0;
    grossCashBurn.push(outflowTotal);

      netCashBurn.push(outflowTotal - saleTotal);
  })

  setGrossCashBurnData(grossCashBurn);
  setNetCashBurnData(netCashBurn);
  
},[loadedPage])



  
useEffect(() => {

  if(!insightsData) return;
 
  setLabels(Object.keys(insightsData.collection));
  setCollections(Object.keys(insightsData.collection).map((key) => insightsData.collection[key]))
  setRevenue(Object.keys(insightsData.revenue).map((key) => insightsData.revenue[key]))
  
   
}, [insightsData]);


  const getYearStart = (date: Dayjs) => {
    const month = date.month();
    if (month <= 2) return dayjs(`${date.year() - 1}-04-01`);
    else return dayjs(`${date.year()}-04-01`);
  };

  const getYearEnd = (date: Dayjs) => {
    const month = date.month();
    if (month <= 2) return dayjs(`${date.year()}-03-01`);
    else return dayjs(`${date.year() + 1}-03-01`);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue === "Annually") {
      if (globalMinDate!.month() <= 2) {
        setMinDate(dayjs(`${globalMinDate!.year() - 1}-04-01`));
        setFromValue(dayjs(`${globalMinDate!.year() - 1}-04-01`));
      } else {
        setMinDate(dayjs(`${globalMinDate!.year()}-04-01`));
        setFromValue(dayjs(`${globalMinDate!.year()}-04-01`));
      }
      if (globalMaxDate!.month() <= 2) {
        setMaxDate(dayjs(`${globalMaxDate!.year()}-03-01`));
        setToValue(dayjs(`${globalMaxDate!.year()}-03-01`));
      } else {
        setMaxDate(dayjs(`${globalMaxDate!.year() + 1}-03-01`));
        setToValue(dayjs(`${globalMaxDate!.year() + 1}-03-01`));
      }
    } else {
      if (fromValue && toValue) {
        setFromValue(fromValue);
        setToValue(toValue);

      }
      // setMinDate(fromValue);
      // setMaxDate(toValue);
      if (newValue === "Quarterly") {
        const maxYear = toValue!.year();
        const minYear = fromValue!.year();
        setFromValue(dayjs(`${minYear}-04-01`));
        setToValue(dayjs(`${maxYear}-01-01`));
      }
    }
    setPeriod(newValue);
    setOpenPeriod(false);
  };
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const Categories = () => {
    return (
      <Grid container mt={2} style={{ overflow: "auto" }}>
        <Grid item xs={11.5}>
          <Grid
            container
            justifyContent="spread-around"
            style={{ minWidth: "575px", borderBottom: "1px solid black" }}
            pb={2}
            my={2}
          >
            <Grid item xs={2.3} lg={2} className="expense-categories-column">
              Name
            </Grid>
            <Grid
              item
              xs={1.5}
              md={1.2}
              lg={1.2}
              xl={0.8}
              className="expense-categories-column"
            >
              % Spend
            </Grid>
            <Grid item xs={4.5} lg={5}></Grid>
            <Grid
              item
              xs={2.2}
              style={{ textAlign: "center" }}
              className="expense-categories-column"
            >
              Spend Amount <br />
              (INR)
            </Grid>
            {/* <Grid
              item
              xs={1.5}
              lg={1.3}
              className="expense-categories-column"
              textAlign="center"
            >
              % Change
            </Grid> */}
          </Grid>
        </Grid>
        <Grid item xs={11.5} style={{ minWidth: "575px" }}>
          {expenseBreakdown.Categories.map((category) => {

            if(category.Spend == 0) return;
            return (
              <Grid
                key={`${category.Name}_expense`}
                container
                justifyContent="spread-around"
                my={1}
              >
                <Grid item xs={2.3} lg={2} className="expense-categories-field">
                  {category.Name}
                </Grid>
                <Grid
                  item
                  xs={1.5}
                  md={1.2}
                  lg={1.2}
                  xl={0.8}
                  className="expense-categories-field"
                >
                  {category.Spend.toFixed(2)}%
                </Grid>
                <Grid item xs={4.5} lg={5}>
                  <div className="expense-percentage">
                    <div
                      style={{ width: `${category.Spend}%` }}
                      className="expense-percentage-front"
                    ></div>
                  </div>
                </Grid>
                <Grid
                  item
                  xs={2.2}
                  className="expense-categories-field"
                  style={{ fontWeight: 600, textAlign: "center" }}
                >
                  {Math.floor(category.spendAmount).toLocaleString("en-IN")}
                  {/* {category.spendAmount} */}
                </Grid>
                {/* <Grid
                  item
                  xs={1.5}
                  lg={1.3}
                  className="expense-categories-field"
                  textAlign="center"
                >
                  {category.Change > 0 ? (
                    <>
                      <span style={{ color: "#338455", fontWeight: 600 }}>
                        {category.Change}%
                      </span>
                      <ArrowUpwardIcon
                        sx={{
                          color: "#338455",
                          paddingLeft: "0.3rem",
                          fontSize: { xs: "0.8rem", lg: "1rem" },
                        }}
                      />
                    </>
                  ) : category.Change === 0 ? (
                    <span>.</span>
                  ) : (
                    <>
                      <span style={{ color: "#C3142F", fontWeight: 600 }}>
                        {-category.Change}%
                      </span>
                      <ArrowDownwardIcon
                        sx={{
                          color: "#C3142F",
                          paddingLeft: "0.3rem",
                          fontSize: { xs: "0.8rem", lg: "1rem" },
                        }}
                      />
                    </>
                  )}
                </Grid> */}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );
  };

  const Merchants = () => {
    return <h1>Merchants</h1>;
  };

  if (!loadedPage) return <Loading />;

  return (
    <Grid container mt={1} mb={5} style={{ overflowX: "hidden" }}>
      <Modal open={openPeriod} onClose={() => setOpenPeriod(false)}>
        <Grid container className="modal-box" style={{ width: "400px" }} p={3}>
          <div className="modal-heading">Select Period</div>
          <Grid container alignItems="center">
            <Grid item xs={2.5}>
              <span className="period-label">From</span>
            </Grid>
            <Grid item xs={9} sm={8}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  open={fromOpen}
                  onOpen={() => setFromOpen(true)}
                  onClose={() => setFromOpen(false)}
                  views={period !== "Annually" ? ["year", "month"] : ["year"]}
                  minDate={minDate}
                  maxDate={toValue}
                  value={fromValue}
                  ToolbarComponent={() => (
                    <h1
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: "1.5rem",
                        marginLeft: "1rem",
                      }}
                    >
                      SELECT MIN DATE
                    </h1>
                  )}
                  onChange={(newValue) => {

                    // let month = newValue?.month();
                
                    // //@ts-ignore
                    // month++;

                    // const year = newValue?.year();
                    // // const days = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
                    
                  
                    //  //@ts-ignore
                    // const date = dayjs(`${year}-${`${month}`.padStart(2,'0')}-01T08:02:17-05:00`, "YYYY-MM-DDTHH:mm:ssZ[Z]")
                    // console.log('date',date)

                    period !== "Annually"
                    ? setFromValue(newValue)
                    : setFromValue(getYearStart(newValue!));

                    // setFromOpen(false)
                    // setOpenPeriod(false)
                  }}

                  // onMonthChange={(newValue)=>{
                   
                  //   period !== "Annually"
                  //   ? setFromValue(newValue)
                  //   : setFromValue(getYearStart(newValue!));

                  //   setFromOpen(false)
                  //   setOpenPeriod(false)
                  // }}

                  renderInput={(params) => (
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                      onClick={() => setFromOpen(true)}
                      style={{
                        marginLeft: "0.5rem",
                        fontSize: "0.9rem",
                        fontFamily: "Montserrat",
                        border: "1px solid #d3d3d3",
                        width: "100%",
                        padding: "0.5rem 1rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      <Grid item xs={8}>
                        {fromValue?.format("MMMM YYYY")}
                      </Grid>
                      <Grid item xs={1.5}>
                        <CalendarMonthIcon />
                      </Grid>
                    </Grid>
                  )}
                  shouldDisableMonth={
                    period !== "Quarterly"
                      ? undefined
                      : (month) => {
                          return !["Jan", "Apr", "Jul", "Oct"].includes(
                            month?.format("MMM")!
                          );
                        }
                  }
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container alignItems="center" mt={3}>
            <Grid item xs={2.5}>
              <span className="period-label">To</span>
            </Grid>
            <Grid item xs={9} sm={8}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileDatePicker
                  open={toOpen}
                  onOpen={() => setToOpen(true)}
                  onClose={() => setToOpen(false)}
                  views={period !== "Annually" ? ["year", "month"] : ["year"]}
                  minDate={fromValue}
                  maxDate={maxDate}
                  value={toValue}
                  ToolbarComponent={() => (
                    <h1
                      style={{
                        fontFamily: "Montserrat",
                        fontSize: "1.5rem",
                        marginLeft: "1rem",
                      }}
                    >
                      SELECT MAX DATE
                    </h1>
                  )}
                  onChange={(newValue) => {
                    let month = newValue?.month();
                
                    //@ts-ignore
                    month++;

                    const year = newValue?.year();
                    const days = moment(`${year}-${month}`, "YYYY-MM").daysInMonth();
                    
                  
                     //@ts-ignore
                    const date = dayjs(`${year}-${`${month}`.padStart(2,'0')}-${`${days}`.padStart(2,'0')}T08:02:17-05:00`, "YYYY-MM-DDTHH:mm:ssZ[Z]")
                    period !== "Annually"
                    ? setToValue(date)
                    : setToValue(getYearStart(date!));
                    // setToOpen(false)
                    // setOpenPeriod(false)
                  }}
                  // onMonthChange={(newValue)=>{
                  //   period !== "Annually"
                  //   ? setToValue(newValue?.add(1,'month').subtract(1,'day'))
                  //   : setToValue(getYearStart(newValue!));
                  //   setToOpen(false)
                  //   setOpenPeriod(false)

                  // }}
                  renderInput={(params) => {
                    return (
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        onClick={() => setToOpen(true)}
                        style={{
                          marginLeft: "0.5rem",
                          fontSize: "0.9rem",
                          fontFamily: "Montserrat",
                          border: "1px solid #d3d3d3",
                          padding: "0.5rem 1rem",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        <Grid item xs={8}>
                          {toValue?.format("MMMM YYYY")}
                        </Grid>
                        <Grid item xs={1.5}>
                          <CalendarMonthIcon />
                        </Grid>
                      </Grid>
                    );
                  }}
                  shouldDisableMonth={
                    period !== "Quarterly"
                      ? undefined
                      : (month) => {
                          return !["Jan", "Apr", "Jul", "Oct"].includes(
                            month?.format("MMM")!
                          );
                        }
                  }
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container pt={3}>
            <span className="period-label" style={{ fontWeight: 600 }}>
              Time Period
            </span>
            <Grid item xs={12} mt={2}>
              <FormControl>
                <RadioGroup row value={period} onChange={handleChange}>
                  <FormControlLabel
                    value="Monthly"
                    control={<Radio />}
                    label={<span style={{ fontSize: "0.8rem" }}>Monthly</span>}
                  />
                  <FormControlLabel
                    value="Quarterly"
                    control={<Radio />}
                    label={
                      <span style={{ fontSize: "0.8rem" }}>Quarterly</span>
                    }
                  />
                  {/* <FormControlLabel
                    value="Annually"
                    control={<Radio />}
                    label={<span style={{ fontSize: "0.8rem" }}>Annually</span>}
                  /> */}
                </RadioGroup>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <Button variant="outlined" onClick={()=>{setOpenPeriod(false)}}>Cancel</Button>
                  <Button onClick={()=>{
                    getData();
                  }} variant="contained">Ok</Button>
                </div>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
      <Grid
        item
        width="100%"
        style={{ display: "block" }}
        className="insights-padding"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Paper
            className="util-button-paper"
            sx={{ height: "auto", padding: "0.2rem" }}
            onClick={() => setOpenPeriod(true)}
          >
            <Grid
              container
              alignItems="center"
              className="util-button-text"
              style={{ paddingRight: "0.5rem" }}
            >
              <span style={{ fontSize: "0.9rem" }}>
                {fromValue?.format("MMMM YYYY")}
              </span>

              <img src={arrow} alt="arrow" width="21px" height="21px" />
              <span style={{ fontSize: "0.9rem" }}>
                {toValue?.format("MMMM YYYY")}
              </span>
            </Grid>
          </Paper>
        </LocalizationProvider>
      </Grid>
      <Grid item container xl={11} lg={12}>
        <Grid item xs={12} className="insights-padding" mt={2}>
          <Grid container justifyContent="space-between">
            <Grid item lg={5} md={5.5} sm={11} xs={12}>
              <span className="insights-heading">Revenue and Collections</span>
              <Grid container justifyContent="center" mt={3}>
                <Grid
                  container
                  sx={{
                    aspectRatio: "16/ 12",
                    width: { sm: "70%", md: "90%", xs: "100%" },
                  }}
                >
                  <Line options={optionsLine} data={data1} />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              lg={5}
              md={5.5}
              sm={11}
              xs={12}
              mr={{ lg: 10, md: 5, sm: 0 }}
            >
              <span className="insights-heading">
                {" "}
                Gross Cash Burn and Net Cash Burn
              </span>
              <Grid container justifyContent="center" mt={3}>
                <Grid
                  container
                  sx={{
                    aspectRatio: "16/ 12",
                    width: { sm: "70%", md: "90%", xs: "100%" },
                  }}
                >
                  <Line options={optionsLine} data={data2} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container mt={3} justifyContent="space-between">
            {/* <Grid item lg={5} md={5.5} sm={11} xs={12}>
              <span className="insights-heading">
                Daily Sales Outstanding (DSO)
              </span>
              <Grid container justifyContent="center" mt={5}>
                <Grid
                  container
                  sx={{
                    aspectRatio: "16/ 12",
                    width: { sm: "70%", md: "90%", xs: "100%" },
                  }}
                >
                  <Bar options={optionsBar} data={data3} />
                </Grid>
              </Grid>
            </Grid> */}
            <Grid
              item
              lg={5}
              md={5.5}
              sm={11}
              xs={12}
              mr={{ lg: 10, md: 5, sm: 0 }}
            >
              <span className="insights-heading">
                Ageing - Accounts Receivables
              </span>
              <Grid container justifyContent="center">
                <Grid
                  container
                  justifyContent="center"
                  my={-3}
                  sx={{
                    aspectRatio: "1/ 1",
                    width: { sm: "70%", md: "90%", xs: "100%" },
                  }}
                >
                  <Pie options={optionsPie} data={data4} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="insights-padding" mt={5}>
          <Grid container>
            <Grid item xs={11.5} className="insights-heading">
              Expense Breakdown
            </Grid>
            {/* <Grid item xs={11.5} className="insights-tabs settings-tabs">
              <Grid container style={{ overflow: "hidden" }}>
                <Tabs
                  value={selectedTab}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons={false}
                  style={{ overflow: "hidden" }}
                >
                  <Tab
                    value="Categories"
                    style={{ textTransform: "none" }}
                    disableRipple={true}
                    className=" insights-tab settings-tab"
                    sx={{
                      "&.Mui-selected": {
                        color: "black",
                        borderBottom: "2px solid #30A8D8",
                      },
                    }}
                    label={"Categories"}
                  />
                  <Tab
                    value="Merchants"
                    style={{ textTransform: "none" }}
                    disableRipple={true}
                    className=" insights-tab settings-tab"
                    sx={{
                      "&.Mui-selected": {
                        color: "black",
                        borderBottom: "2px solid #30A8D8",
                      },
                    }}
                    label={"Merchants"}
                  />
                </Tabs>
              </Grid>
            </Grid> */}
            <Grid item xs={11.5} sm={12}>
              {selectedTab === "Categories" ? <Categories /> : <Merchants />}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="insights-padding" mt={8}>
          <Grid item xs={11.5} className="insights-heading">
            Balance Sheet - KPIs
          </Grid>
          <Grid item xs={11.5} style={{ overflow: "auto" }}>
            <Grid container style={{ minWidth: "560px" }}>
              <Grid item xs={11.5}>
                <Grid container mt={5}>
                  {Object.keys(balanceSheet).map((key: string) => {
                    return (
                      <Grid
                        key={`${key}_balance`}
                        item
                        xs={key === "category" ? 4 : 2}
                        textAlign="center"
                        className="insights-table-column"
                        style={{
                          borderBottom:
                            key === "category" ? "" : "1px solid black",
                        }}
                      >
                        {key === "category" ? "" : key}
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={11.5}>
                {balanceSheet.category.map((category: string, index) => (
                  <Grid container key={`${category}_pnl`}>
                    {Object.keys(balanceSheet).map((key: string) => {
                      return (
                        <Grid
                          pt={1}
                          key={`${key}_balance`}
                          item
                          xs={key === "category" ? 4 : 2}
                          textAlign={key === "category" ? "left" : "center"}
                          className="insights-table-column"
                          style={{
                            borderBottom:
                              key === "category"
                                ? "1px solid #d3d3d3"
                                : "1px solid black",
                            background: key === "category" ? "#F5F6F7" : "",
                            paddingLeft: key === "category" ? "1rem" : "",
                          }}
                        >
                          {key === "category"
                            ? category
                            : String(balanceSheet[key][index])}
                        </Grid>
                      );
                    })}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="insights-padding" mt={8}>
          <Grid item xs={11.5} className="insights-heading">
            Profit & Loss - KPIs
          </Grid>
          <Grid item xs={11.5} style={{ overflow: "auto" }}>
            <Grid container style={{ minWidth: "560px" }}>
              <Grid item xs={11.5}>
                <Grid container mt={5}>
                  {Object.keys(pnl).map((key: string) => {
                    return (
                      <Grid
                        key={`${key}pnl`}
                        item
                        xs={key === "category" ? 3.5 : 8.5 / 4}
                        textAlign="center"
                        className="insights-table-column"
                        style={{
                          borderBottom:
                            key === "category" ? "" : "1px solid black",
                        }}
                      >
                        {key === "category" ? "" : key}
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={11.5}>
                {pnl.category.map((category: string, index) => (
                  <Grid container key={`${category}_pnl`}>
                    {Object.keys(pnl).map((key: string) => {
                      return (
                        <Grid
                          pt={1}
                          key={`${key}_pnl`}
                          item
                          xs={key === "category" ? 3.5 : 8.5 / 4}
                          textAlign={key === "category" ? "left" : "center"}
                          className="insights-table-column"
                          style={{
                            borderBottom:
                              key === "category"
                                ? "1px solid #d3d3d3"
                                : "1px solid black",
                            background: key === "category" ? "#F5F6F7" : "",
                            paddingLeft: key === "category" ? "1rem" : "",
                          }}
                        >
                          {key === "category"
                            ? category
                            : index === 0
                            ? pnl[key][index].toLocaleString("en-IN")
                            : String(pnl[key][index])}
                        </Grid>
                      );
                    })}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} className="insights-padding" mt={8}>
          <Grid item xs={11.5} className="insights-heading">
            Cash Flows - KPIs
          </Grid>
          <Grid item xs={11.5} style={{ overflow: "auto" }}>
            <Grid container style={{ minWidth: "560px" }}>
              <Grid item xs={11.5}>
                <Grid container mt={5}>
                  {Object.keys(cashflows).map((key: string) => {
                    return (
                      <Grid
                        key={`${key}cashflows`}
                        item
                        xs={key === "category" ? 3.5 : 8.5 / 4}
                        textAlign="center"
                        className="insights-table-column"
                        style={{
                          borderBottom:
                            key === "category" ? "" : "1px solid black",
                        }}
                      >
                        {key === "category" ? "" : key}
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Grid item xs={11.5}>
                {cashflows.category.map((category: string, index) => (
                  <Grid container key={`${category}_cashflows`}>
                    {Object.keys(cashflows).map((key: string) => {
                      return (
                        <Grid
                          pt={1}
                          key={`${key}_cashflows`}
                          item
                          xs={key === "category" ? 3.5 : 8.5 / 4}
                          textAlign={key === "category" ? "left" : "center"}
                          className="insights-table-column"
                          style={{
                            borderBottom:
                              key === "category"
                                ? "1px solid #d3d3d3"
                                : "1px solid black",
                            background: key === "category" ? "#F5F6F7" : "",
                            paddingLeft: key === "category" ? "1rem" : "",
                          }}
                        >
                          {key === "category"
                            ? category
                            : index === 0
                            ? cashflows[key][index].toLocaleString("en-IN")
                            : String(cashflows[key][index])}
                        </Grid>
                      );
                    })}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </Grid>
  );
};

export default Insights;
