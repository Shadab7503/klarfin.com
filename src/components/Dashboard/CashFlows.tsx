import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputAdornment from "@mui/material/InputAdornment";
import NorthEastIcon from "@mui/icons-material/NorthEast";
import SouthEastIcon from '@mui/icons-material/SouthEast';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TextField from "@mui/material/TextField";
import Loading from "./Loading";
import SearchIcon from "@mui/icons-material/Search";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { inflow } from "../../dummy_data/inflow";
import scenarios from "../../images/scenarios.png";
import refresh from "../../images/refresh.png";
import arrow from "../../images/arrow.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import {
  InflowData,
  CashinFlow,
  CashflowTable,
  Inflow,
  StringDict,
  CashoutFlow,
  Outflow,
  OutflowData,
  Journal,
  JournalType,
  Payments,
  Purchase,
  PurchaseType,
} from "../../utils/interface";
import axios from "axios";
import moment, { months } from "moment";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';

import CashflowChart from "../Chart/Cashflow";
import { Button } from "@mui/material";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,

);



// import axios from "axios";

const utilButtons = [
  {
    text: "Main Scenarios",
    icon: scenarios,
  },
  {
    text: "Connect Banks",
    icon: "",
  },
  {
    text: "Refresh computation",
    icon: refresh,
  },
  {
    text: "Actual vs Forecast",
    icon: "",
  },
];

const CashFlows = (props: any) => {

  const [globalMinDate, setGlobalMinDate] = useState<Dayjs>();
  const [globalMaxDate, setGlobalMaxDate] = useState<Dayjs>();
  const [openPeriod, setOpenPeriod] = useState<boolean>(false);
  const [fromValue, setFromValue] = useState<Dayjs | null>();
  const [toValue, setToValue] = useState<Dayjs | null>();
  const [period, setPeriod] = useState<string>("Monthly");
  const [fromOpen, setFromOpen] = useState<boolean>(false);
  const [toOpen, setToOpen] = useState<boolean>(false);
  const [minDate, setMinDate] = useState<Dayjs>();
  const [maxDate, setMaxDate] = useState<Dayjs>();

  const [inFlowData, setInFlowData] = useState<InflowData>({} as InflowData);
  const [outFlowData, setOutFlowData] = useState<InflowData>({} as InflowData);
  const [inflowCategories, setInflowCategories] = useState<StringDict>({});
  const [outflowCategories, setOutflowCategories] = useState<StringDict>({});
  const [openingBalance, setOpeningBalance] = useState<number>(0);
  const [cashBalance, setBalance] = useState<number>(0);
  const [loadedPage, setLoadedPage] = useState<boolean>(false);

  const [inflowSelectedData, setInflowSelectedData] = useState<CashflowTable>();
  const [inflowSelectedCategories, setInflowSelectedCategories] = useState<string[]>();
  const [outflowSelectedData, setOutflowSelectedData] = useState<CashflowTable>();
  const [outflowSelectedCategories, setOutflowSelectedCategories] = useState<string[]>();
  const [selectedMonths, setSelectedMonths] = useState<string[]>();
  const [openingBal, setOpeningBal] = useState<number[]>();
  const [closingBal, setClosingBal] = useState<number[]>();
  const [cellWidth, setCellWidth] = useState<number>(126);
  const [marginLeft, setMarginLeft] = useState<number>(80);
  const [inflowGraphData, setInflowGraphData] = useState<number[]>([]);
  const [outflowGraphData, setOutflowGraphData] = useState<number[]>([]);


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

    // if(dayjs(min).add(1, 'year').diff(max) > 0) {
    //   // setToValue(dayjs(max))
    //   setGlobalMaxDate(dayjs(max))
    // } else {
    //   // setToValue(dayjs(min).add(1, 'year'))
    //   setGlobalMaxDate(dayjs(min).add(1, 'year'))
    // }

  }

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_HOST + "v1/user/minmax/minmax", {
        headers: { Authorization: `Bearer ${props.accessToken}` },

      })
      .then(({ data }) => {

       handleMinMax(data.min,data.max);
      });


  }, [period])


  const getData = async () => {

    setLoadedPage(false);

   const [balRes,inflowRes,outflowRes] =  await Promise.all([

      axios
    .post(process.env.REACT_APP_BACKEND_HOST + "v1/user/balance/balance", {
      startDate: fromValue,
        endDate: toValue,
       minDate,
        maxDate,
        period
    }, {
      headers: { Authorization: `Bearer ${props.accessToken}` },

    }),

    axios
      .post(process.env.REACT_APP_BACKEND_HOST + "v1/user/cashinflow/cash", {
        startDate: fromValue,
        endDate: toValue,
        period
      }, {
        headers: { Authorization: `Bearer ${props.accessToken}` }
      }),

      axios
      .post(process.env.REACT_APP_BACKEND_HOST + "v1/user/cashoutflow/cashout", {
        startDate: fromValue,
        endDate: toValue,
        period
      }, {
        headers: { Authorization: `Bearer ${props.accessToken}` }
      })

    ]);

    const openingObj = {};

    balRes.data.openingBalArrr.forEach(each=>{
      openingObj[each.date] = each.value;
    });



    const closingObj = {};

    balRes.data.closeingBalArr.forEach(each=>{
      closingObj[each.date] = each.value;
    });

     //@ts-ignore
    setOpeningBal(openingObj);
    //@ts-ignore
    setClosingBal(closingObj);
    setBalance(balRes.data.balance);
    console.log('datadatadata',balRes.data);

      setInflowSelectedData(inflowRes.data.data.outFlowSelectedData);
      setSelectedMonths(inflowRes.data.data.months);
      // console.log('data.data.months',data.data.months);
      setInflowGraphData(inflowRes.data.data.cashoutflowGraph);
      setInflowSelectedCategories(inflowRes.data.data.outCategories);

      setOutflowSelectedData(outflowRes.data.data.outFlowSelectedData);
      setOutflowSelectedCategories(outflowRes.data.data.outCategories);
      setOutflowGraphData(outflowRes.data.data.cashoutflowGraph);

    setLoadedPage(true);
    setOpenPeriod(false)
  }

  useEffect(() => {

    if(!globalMinDate || !globalMaxDate) return;

    getData();

  }, [globalMinDate,globalMaxDate,period]);


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

  const utilButton = (text: string, icon = "") => {
    return (
      <Paper
        style={{
          fontSize: "0.9rem",
          width: "100%",
          height: "35.19px",
        }}
        className="util-button-paper"
      >
        <Grid
          container
          alignItems="center"
          className="util-button-text"
          height="100%"
        >
          {icon !== "" ? (
            <img src={icon} alt={text} width="19px" height="19px" />
          ) : null}
          <span style={{ paddingLeft: "0.5rem" }}>{text}</span>
          {text === "Main Scenarios" ? (
            <KeyboardArrowDownIcon style={{ fontSize: "1.2rem" }} />
          ) : null}
        </Grid>
      </Paper>
    );
  };


  useEffect(() => {
    const wid = document.querySelector('.check-width');
    if (wid) {
      setCellWidth(wid.clientWidth);
    }
    const searchBar = document.querySelector('.searchBar');
    if (searchBar) {
      setMarginLeft(searchBar.clientWidth - 135);
    }
    const table = document.querySelector('.scroller-1');
    const table2 = document.querySelector('.scroller-2');

    table?.addEventListener('scroll', (e) => {
      // table.scro
      if (!table2) return;
      table2.scrollLeft = table.scrollLeft;
    })
    table2?.addEventListener('scroll', (e) => {
      // table.scro
      if (!table) return;
      table.scrollLeft = table2.scrollLeft;
    })


  })

  // useEffect(()=>{

  //   if(loading) return;

  //   let minimum_date = dayjs(
  //     Math.max(fromValue?.valueOf()!, globalMinDate?.valueOf()!)
  //     );

  //     let maximum_date = toValue;
  //     console.log('minimum_date',minimum_date,toValue,toValue?.year());

  //   if (period === "Quarterly") maximum_date = maximum_date!.add(2, "month");
  //   // maximum_date = dayjs(
  //   //   Math.min(maximum_date?.valueOf()!, globalMaxDate?.valueOf()!)
  //   // );
  //   const quarterMap = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
  //   const categories = [...Object.keys(inflowCategories)];
  //   const outCategories = [...Object.keys(outflowCategories)];

  //   if(!categories.length || !outCategories.length) return;


  //   let selectedData: CashflowTable = {};

  //   let baseInflowData: StringDict = {};
  //   categories.forEach((category) => {
  //     baseInflowData[category] = 0;
  //   });


  //   let baseOutflowData: StringDict = {};
  //   outCategories.forEach((category) => {
  //     baseOutflowData[category] = 0;
  //   });

  //   let outFlowSelectedData: CashflowTable = {};

  //   const cashinflowGraph:any = [];
  //   const cashoutflowGraph:any = [];

  //   const cashInflowRowData:number[] = [];
  //   const cashOutflowRowData:number[] = [];

  //   // console.log('inFlowData',inFlowData)
  //   console.log('minimum_date!.year()',minimum_date!.year())
  //   console.log('maximum_date!.year()',maximum_date!.year())
  //   for (
  //     let year = minimum_date!.year();
  //     year <= maximum_date!.year();
  //     year++
  //   ) {
  //     let min_month = 0;
  //     let max_month = 11;
  //     if (year === minimum_date!.year()) min_month = minimum_date!.month();
  //     if (year === maximum_date!.year()) max_month = maximum_date!.month();
  //     for (let month = min_month; month <= max_month; month++) {
  //       const tempDate = dayjs().month(month).year(year);

  //       if (period === "Monthly") {
  //         selectedData[tempDate.format("MMM YYYY")] = {
  //           "Cash inflow": inFlowData[tempDate.format("MMM YYYY")] ? inFlowData[tempDate.format("MMM YYYY")]  : baseInflowData,
  //         };

  //         cashInflowRowData.push(inFlowData[tempDate.format("MMM YYYY")] ? inFlowData[tempDate.format("MMM YYYY")].Total  : baseInflowData.Total);

  //         outFlowSelectedData[tempDate.format("MMM YYYY")] = {
  //           "Cash outflow": outFlowData[tempDate.format("MMM YYYY")] ? outFlowData[tempDate.format("MMM YYYY")] : baseOutflowData,
  //         };

  //         cashOutflowRowData.push(outFlowData[tempDate.format("MMM YYYY")] ? outFlowData[tempDate.format("MMM YYYY")].Total  : baseOutflowData.Total);

  //       } 

  //       else if (period === "Quarterly") {
  //         const quarterNo = Math.floor(tempDate.month() / 3);
  //         const quarterLabel: string = `${
  //           quarterMap[quarterNo]
  //         } ${tempDate.year()}`;

  //         if (!(quarterLabel in selectedData)) {
  //           selectedData[quarterLabel] = {
  //             "Cash inflow": { ...baseInflowData },
  //           };
  //         }

  //         // console.log('outFlowSelectedData',selectedData,quarterLabel);

  //         if (!(quarterLabel in outFlowSelectedData)) {

  //           outFlowSelectedData[quarterLabel] = {
  //             "Cash outflow": {...baseOutflowData},
  //           };
  //         }


  //         categories.forEach((type) => {
  //           if (type === "Total") return;
  //           selectedData[quarterLabel]["Cash inflow"].Total +=
  //           inFlowData[tempDate.format("MMM YYYY")] ? 
  //             inFlowData[tempDate.format("MMM YYYY")][type] : 0;

  //           selectedData[quarterLabel]["Cash inflow"][type] +=
  //           inFlowData[tempDate.format("MMM YYYY")] ?
  //             inFlowData[tempDate.format("MMM YYYY")][type] : 0;
  //         });

  //         outCategories.forEach((type) => {
  //           if (type === "Total") return;
  //           outFlowSelectedData[quarterLabel]["Cash outflow"].Total +=
  //           outFlowData[tempDate.format("MMM YYYY")] ?
  //           outFlowData[tempDate.format("MMM YYYY")][type] : 0;
  //           outFlowSelectedData[quarterLabel]["Cash outflow"][type] +=
  //           outFlowData[tempDate.format("MMM YYYY")] ? 
  //           outFlowData[tempDate.format("MMM YYYY")][type] : 0;
  //         });
  //       } else {
  //         let annualLabel: string = `FY ${tempDate.year()}-${
  //           (tempDate.year() + 1) % 100
  //         }`;
  //         if (tempDate.month() <= 2) {
  //           annualLabel = `FY ${tempDate.year() - 1}-${tempDate.year() % 100}`;
  //         }
  //         if (!(annualLabel in selectedData)) {
  //           selectedData[annualLabel] = {
  //             "Cash inflow": { ...baseInflowData },
  //           };

  //           outFlowSelectedData[annualLabel] = {
  //             "Cash outflow": { ...baseOutflowData },
  //           };
  //         }

  //         categories.forEach((type) => {
  //           if (type === "Total") return;
  //           selectedData[annualLabel]["Cash inflow"].Total +=
  //             inFlowData[tempDate.format("MMM YYYY")][type];
  //           selectedData[annualLabel]["Cash inflow"][type] +=
  //             inFlowData[tempDate.format("MMM YYYY")][type];
  //         });

  //         outCategories.forEach((type) => {
  //           if (type === "Total") return;
  //           outFlowSelectedData[annualLabel]["Cash outflow"].Total +=
  //             inFlowData[tempDate.format("MMM YYYY")][type];
  //           outFlowSelectedData[annualLabel]["Cash outflow"][type] +=
  //             inFlowData[tempDate.format("MMM YYYY")][type];
  //         });

  //       }
  //     }
  //   }

  //   console.log('selectedData',selectedData)
  //   let months = Object.keys(selectedData);
  //   if(Object.keys(outFlowSelectedData).length > Object.keys(selectedData).length) {
  //     months = Object.keys(outFlowSelectedData);
  //   }

  //   let closing = 0;

  //   let openingAmt = openingBalance*-1 == -0 ? 0 : openingBalance*-1; 


  //   if (period === "Quarterly") {
  //   //     for(let i =3;i<=5;i++) {
  //   //       const tempDate = dayjs().month(i).year(2020);
  //   // // console.log('tempDate.format("MMM YYYY")',tempDate.format("MMM YYYY"))
  //   //     let  data1 = inFlowData[tempDate.format("MMM YYYY")] ? inFlowData[tempDate.format("MMM YYYY")].Total  : 0;
  //   //     let  data2 = outFlowData[tempDate.format("MMM YYYY")] ? outFlowData[tempDate.format("MMM YYYY")].Total  : 0;

  //   //       closing = openingAmt + (data1 -  data2);

  //   //       openingAmt = closing; 
  //   //     }

  //       openingAmt = 0;

  //   }


  //   if(closing) {
  //     openingAmt = closing;
  //   }



  //   const openingBalArr:number[] = [];
  //   const closeingBalArr:number[] = [];
  //   openingBalArr.push(openingAmt);

  //   months.map((month: string,idx:number,arr:string[]) => {
  //     selectedData[month]["Cash inflow"].Total >= 1
  //     ? cashinflowGraph.push(selectedData[month]["Cash inflow"].Total)
  //     : cashinflowGraph.push(0)

  //     const cashinflowTotal = selectedData[month]["Cash inflow"].Total
  //     const cashOutFlowTotal = outFlowSelectedData[month]["Cash outflow"].Total 

  //     let closingBal = 0;

  //     if(cashinflowTotal == 0 ) {
  //       closingBal = openingAmt - cashOutFlowTotal;
  //     } else {
  //       closingBal = openingAmt + (cashinflowTotal -  cashOutFlowTotal);
  //     }

  //     if(idx !== arr.length-1) {
  //       openingBalArr.push(closingBal);
  //     }
  //     if(idx !== arr.length) {
  //       setBalance(closingBal);
  //     }

  //     closeingBalArr.push(closingBal);

  //     openingAmt = closingBal;

  //   })

  //   Object.keys(outFlowSelectedData).map((month: string) => {
  //     // console.log(outFlowSelectedData[month]);
  //     outFlowSelectedData[month]["Cash outflow"].Total >= 1
  //     ? cashoutflowGraph.push(outFlowSelectedData[month]["Cash outflow"].Total)
  //     : cashoutflowGraph.push(0)

  //   })

  //     setBarData({labels:months,datasets:[

  //       {
  //         type: 'line' as const,
  //         label: 'Closing Balance',
  //         borderColor: '#186090',
  //         borderWidth: 1,
  //         fill: false,
  //         data:[...closeingBalArr],
  //       },
  //       {
  //         type: 'bar' as const,
  //         label: 'Cash Inflow',
  //         backgroundColor: '#338455',
  //         data: cashinflowGraph,
  //         borderColor: 'white',
  //         barPercentage: 1,
  //         categoryPercentage: 0.3,
  //         borderWidth: 0,     
  //       },
  //       {
  //         type: 'bar' as const,
  //         label: 'Cash Outflow',
  //         backgroundColor: '#C5221F',
  //         barPercentage: 1,
  //         categoryPercentage: 0.3,
  //         data:  cashoutflowGraph,
  //         borderWidth: 0, 
  //       },
  //     ]})

  //   setInflowSelectedData(selectedData);
  //   setOutflowSelectedData(outFlowSelectedData);
  //   setSelectedMonths(months);
  //   setOpeningBal([...openingBalArr]);
  //   setClosingBal([...closeingBalArr]);
  //   setInflowSelectedCategories(categories)
  //   setOutflowSelectedCategories(outCategories);
  //   setLoadedPage(true);

  // // },[globalMaxDate,globalMinDate,fromValue,toValue,openingBalance])
  // },[loading,globalMaxDate,globalMinDate,fromValue,toValue])

  const getSelectedData = () => {
 
    if (!selectedMonths || !inflowSelectedData || !outflowSelectedData || !closingBal || !openingBal 
      || !inflowSelectedCategories || !outflowSelectedCategories) return <div>Loading...</div>

      const scrollbar = document.querySelector('.custom-scrollbar');
      if(scrollbar) {
        const width = scrollbar.clientWidth;
        scrollbar.scrollTo(width,0)
      }
    return (
      <div className="custom-scrollbar__container custom-scrollbar">

        <TableContainer className="custom-scrollbar hideScroll scroller-1">
          <Table
            className="table-1"
            sx={{
              borderCollapse: "separate",
              maxWidth: "100vw",
            }}
          >
            <TableHead>

              <TableRow >
              {/* <TableCell
                  className="searchBar"
                  style={{
                    padding: 0,
                    paddingLeft: "1rem",
                    position: "sticky",
                    left: 0,
                    background: "white",
                  }}
                >
                
                </TableCell> */}

                <TableCell colSpan={selectedMonths.length} style={{ padding: 0 }} >
                  <CashflowChart closingBal={closingBal} lebels={[...Object.keys(outflowSelectedData)]} inflowGraphData={inflowGraphData} outflowGraphData={outflowGraphData} marginLeft={marginLeft} width={(selectedMonths.length * cellWidth) + cellWidth} />
                </TableCell>
                

              </TableRow>

            </TableHead>
          </Table>
        </TableContainer>
        <TableContainer className="custom-scrollbar scroller-2">
          <Table
            sx={{
              borderCollapse: "separate",
              maxWidth: "100vw",
            }}
          >
            <TableHead>


              <TableRow className="row-width">
                <TableCell
                  className="searchBar"
                  style={{
                    padding: 0,
                    paddingLeft: "1rem",
                    border: "1px solid #d3d3d3",
                    position: "sticky",
                    left: 0,
                    background: "white",
                  }}
                >
                  <TextField
                    inputProps={{
                      style: {
                        padding: 5,
                        // height: "100%",
                      },
                    }}
                    sx={{ height: "100%" }}
                    className="topbar-search"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
                    variant="standard"
                    placeholder="Search"
                  />
                </TableCell>

                {selectedMonths.map((month: string) => {
                  return (
                    <TableCell
                      key={month}
                      align="center"
                      className="cashflows-table-column check-width"
                      sx={{ minWidth: "110px", maxWidth: "110px" }}
                    >
                      {month}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{ position: "sticky", left: 0 }}
                  className="cashflows-table-category"
                >
                  <div style={{display:'flex',alignItems:'center'}}>
                    <ShowChartIcon  sx={{
                    fontSize: "1rem",
                    color: "#3492D4",
                    marginRight: "0.3rem",
                    
                  }} />
                    {" "}
                    <p>Cash balance at beginning of the {period == 'Monthly' ? 'month' : 'quarter'}</p>

                  </div>
                  
                </TableCell>
                {selectedMonths.map((month:any,idx) => {
                  // if(!openingBal[month]) return null;

                  return (
                    <TableCell
                      key={month+idx}
                      align="center"
                      className="cashflows-table-column"
                      sx={{ borderBottom: "1px solid #d3d3d3" }}
                    >
                    {Math.floor(openingBal[month]).toLocaleString("en-IN")}
                    {/* { openingBal[month] } */}
                    </TableCell>
                  );
                })}
                </TableRow>
              <TableRow>
                <TableCell
                  sx={{ position: "sticky", left: 0 }}
                  className="cashflows-table-category"
                >
                  <NorthEastIcon
                    sx={{
                      fontSize: "1rem",
                      color: "#338455",
                      marginRight: "0.2rem",
                    }}
                  />{" "}
                  Cash inflow
                </TableCell>
                {Object.keys(inflowSelectedData).map((month: string) => {
                  return (
                    <TableCell
                      key={month + "_2"}
                      align="center"
                      className="cashflows-table-column"
                      sx={{ borderBottom: "1px solid #d3d3d3" }}
                    >
                      {inflowSelectedData[month]["Cash outflow"].Total >= 1
                        ? Math.floor(
                          inflowSelectedData[month]["Cash outflow"].Total
                        ).toLocaleString("en-IN")
                        : "-"}
                    </TableCell>
                  );
                })}
              </TableRow>

              {inflowSelectedCategories.map((category) => {
                if (category === "Total")
                  return <React.Fragment key={category}></React.Fragment>;
                return (
                  <TableRow key={category}>
                    <TableCell
                      className="cashflows-table-subcategory"
                      sx={{
                        borderBottom: "1px solid #d3d3d3",
                        minWidth: { xs: "80px", sm: "150px" },
                        position: "sticky",
                        left: 0,
                        background: "white",
                      }}
                    >
                      {category}
                    </TableCell>
                    {Object.keys(inflowSelectedData).map((month: string) => {
                      return (
                        <TableCell
                          key={month + "_3"}
                          align="center"
                          sx={{
                            borderBottom: "1px solid #d3d3d3",
                            fontFamily: "Montserrat",
                            fontWeight: 600,
                          }}
                        >
                          {inflowSelectedData[month]["Cash outflow"][category] >= 1
                            ? Math.floor(
                              inflowSelectedData[month]["Cash outflow"][category]
                            ).toLocaleString("en-IN")
                            : "-"}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}

              <TableRow>
                <TableCell
                  sx={{ position: "sticky", left: 0 }}
                  className="cashflows-table-category"
                >
                  <SouthEastIcon
                    sx={{
                      fontSize: "1rem",
                      color: "#eb0014",
                      marginRight: "0.2rem",
                    }}
                  />{" "}
                  Cash outflow
                </TableCell>
                {Object.keys(outflowSelectedData).map((month: string) => {

                  return (
                    <TableCell
                      key={month + "_2"}
                      align="center"
                      className="cashflows-table-column"
                      sx={{ borderBottom: "1px solid #d3d3d3" }}
                    >
                      {outflowSelectedData[month]["Cash outflow"].Total >= 1
                        ? Math.floor(
                          outflowSelectedData[month]["Cash outflow"].Total
                        ).toLocaleString("en-IN")
                        : "-"}
                    </TableCell>
                  );
                })}
              </TableRow>

              {outflowSelectedCategories.map((category: string) => {
                if (category === "Total")
                  return <React.Fragment key={category}></React.Fragment>;
                return (
                  <TableRow key={category}>
                    <TableCell
                      className="cashflows-table-subcategory"
                      sx={{
                        borderBottom: "1px solid #d3d3d3",
                        minWidth: { xs: "80px", sm: "150px" },
                        position: "sticky",
                        left: 0,
                        background: "white",
                      }}
                    >
                      {category}
                    </TableCell>
                    {Object.keys(outflowSelectedData).map((month: string) => {
                      //  if(outFlowSelectedData[month]) {
                      //   // console.log('not',month)
                      // }

                      return (
                        <TableCell
                          key={month + "_3"}
                          align="center"
                          sx={{
                            borderBottom: "1px solid #d3d3d3",
                            fontFamily: "Montserrat",
                            fontWeight: 600,
                          }}
                        >
                          {outflowSelectedData[month]["Cash outflow"][category] >= 1
                            ? Math.floor(
                              outflowSelectedData[month]["Cash outflow"][category]
                            ).toLocaleString("en-IN")
                            : "-"}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell
                  sx={{ position: "sticky", left: 0 }}
                  className="cashflows-table-category"
                >
                  <div style={{display:'flex',alignItems:'center'}}>
                    <ShowChartIcon  sx={{
                    fontSize: "1rem",
                    color: "#3492D4",
                    marginRight: "0.3rem",
                    
                  }} />
                    {" "}
                    <p>Cash balance at end of the {period == 'Monthly' ? 'month' : 'quarter'}</p>

                  </div>
                </TableCell>
                {selectedMonths.map((month:any,idx) => {
                  if(!closingBal[month]) return null;

                  return (
                    <TableCell
                      key={month+idx}
                      align="center"
                      className="cashflows-table-column"
                      sx={{ borderBottom: "1px solid #d3d3d3" }}
                    >
                    {Math.floor(closingBal[month]).toLocaleString("en-IN")}

                    </TableCell>
                  );
                })}
                </TableRow>


            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };

  if (!loadedPage) return <Loading />;
  return (
    <Grid container className="cashflows">
      <Grid item xs={12} className="util-buttons">
        <Grid container alignItems="center">
          <Grid item lg="auto" mr={1}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Paper
                sx={{
                  width: "100%",
                }}
                className="util-button-paper"
                onClick={() => setOpenPeriod(true)}
              >
                <Grid
                  container
                  alignItems="center"
                  className="util-button-text"
                >
                  <span style={{ fontSize: "0.9rem" }}>
                    {fromValue?.format("MMM YYYY")}
                  </span>

                  <img src={arrow} alt="arrow" width="21px" height="21px" />
                  <span style={{ fontSize: "0.9rem" }}>
                    {toValue?.format("MMM YYYY")}
                  </span>
                </Grid>
              </Paper>
            </LocalizationProvider>
          </Grid>
          {utilButtons.map((util) => (
            <Grid
              key={util.text}
              item
              lg="auto"
              style={{ height: "100%" }}
              mr={1}
            >
              {utilButton(util.text, util.icon)}
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container className="cash-display" justifyContent="space-between">
          <Grid item>
            <div className="cash-balance">
              <span className="cash-balance-heading">CASH BALANCE ( {toValue?.format("MMM YYYY")} )</span>
              <span
                className="cash-value"
                style={{
                  color: cashBalance >= 0 ? "#338455" : "#950101",
                }}
              >
                {cashBalance >= 0 ? "+" : "-"}INR{" "}
                {Math.abs(cashBalance).toLocaleString("en-IN")}
              </span>
            </div>
          </Grid>
        </Grid>


      </Grid>
      <Modal open={openPeriod} onClose={() => setOpenPeriod(false)}>
        <Grid container className="modal-box" style={{ width: "400px" }} p={3}>
          <div className="modal-heading">Select Period</div>
          <Grid container alignItems="center">
            <Grid item xs={2.5}>
              <span className="period-label">From</span>
            </Grid>
            <Grid item xs={6}>
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
                    period !== "Annually"
                    ? setFromValue(newValue)
                    : setFromValue(getYearStart(newValue!));

                    // period !== "Annually"
                    // ? setFromValue(newValue)
                    // : setFromValue(getYearStart(newValue!));
                  }}
                  // onMonthChange={(newValue)=>{
                  //   period !== "Annually"
                  //   ? setFromValue(newValue)
                  //   : setFromValue(getYearStart(newValue!));

                  //   setFromOpen(false)
                  //   setOpenPeriod(false)
                  // }}
                  renderInput={(params) => (
                    <div
                      onClick={() => setFromOpen(true) }
                      style={{
                        marginLeft: "0.5rem",
                        display: "inline-block",
                        fontSize: "0.9rem",
                        fontFamily: "Montserrat",
                        border: "1px solid #d3d3d3",
                        width: "100%",
                        padding: "0.5rem 1rem",
                        fontWeight: 600,
                      }}
                    >
                      {fromValue?.format("MMMM YYYY")}
                    </div>
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
            <Grid item xs={6}>
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
                      <div
                        onClick={() => setToOpen(true)}
                        style={{
                          marginLeft: "0.5rem",
                          display: "inline-block",
                          fontSize: "0.9rem",
                          fontFamily: "Montserrat",
                          border: "1px solid #d3d3d3",
                          padding: "0.5rem 1rem",
                          width: "100%",
                          fontWeight: 600,
                        }}
                      >
                        {toValue?.format("MMMM YYYY")}
                      </div>
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
                  {/* <FormControlLabel
                    value="Quarterly"
                    control={<Radio />}
                    label={
                      <span style={{ fontSize: "0.8rem" }}>Quarterly</span>
                    }
                  /> */}
                  {/* <FormControlLabel
                    value="Annually"
                    control={<Radio />}
                    label={<span style={{ fontSize: "0.8rem" }}>Annually</span>}
                  /> */}
                </RadioGroup>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                  <Button style={{marginRight:'2rem'}} variant="outlined" onClick={()=>{setOpenPeriod(false)}}>Cancel</Button>
                  <Button onClick={()=>{
                    getData();
                  }} variant="contained">Ok</Button>
                </div>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
      {
        inflowGraphData.length < 1
        && 
        <Grid item xs={12} mt={2}>
        <Grid container className="receivables-warning" justifyContent="center">
          <span style={{ color: "#C3142F", textAlign: "center" }}>
            {" "}
            Kindly sync your tally data with Klarfin. Just takes 2 minutes.
          </span>
        </Grid>
      </Grid>

      }
      
      <Grid item xs={12} mt={5}>
        {getSelectedData()}
      </Grid>
    </Grid>
  );
};

export default CashFlows;
