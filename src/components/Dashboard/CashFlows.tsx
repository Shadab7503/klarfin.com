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
} from "../../utils/interface";
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

const CashFlows = (props: { accessToken: string }) => {
  const cashBalance: number = 235000;

  const [loadedPage, setLoadedPage] = useState<boolean>(false);
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
  const [inflowCategories, setInflowCategories] = useState<StringDict>({});

  useEffect(() => {
    // axios
    //   .get(process.env.REACT_APP_BACKEND_HOST + "v1/user/cashinflow/cash", {
    //     headers: { Authorization: `Bearer ${props.accessToken}` },
    //   })
    //   .then((response) => {
    //     // setupInflow(response.data);
    //     setupInflow(inflow);
    //   });
    setupInflow(inflow);
  }, [props]);

  const setupInflow = (inflow: Inflow) => {
    const cashinflow_data = inflow.cashinflow;

    const minimum_date = dayjs(
      cashinflow_data[0]["cashinflow_receipt"][0]["voucherdate"]
    );
    const maximum_date = dayjs(
      cashinflow_data[cashinflow_data.length - 1]["cashinflow_receipt"][0][
        "voucherdate"
      ]
    );
    setGlobalMinDate(minimum_date);
    setGlobalMaxDate(maximum_date);
    setFromValue(minimum_date);
    setToValue(maximum_date);
    setMinDate(minimum_date);
    setMaxDate(maximum_date);

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
    cashinflow_data.forEach((cashinflow) => {
      cashinflow.cashinflow_receipt.forEach((receipt, index: number) => {
        const voucherDate = dayjs(receipt.voucherdate).format("MMM YYYY");
        inflowDataTemp[voucherDate].Total += receipt.amount;
        inflowDataTemp[voucherDate][cashinflow.cashinflow_ledger[index].type] +=
          receipt.amount;
      });
    });

    setInflowCategories(inflowCategories);
    setInFlowData(inflowDataTemp);
    setLoadedPage(true);
  };

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
      setMinDate(globalMinDate);
      setFromValue(globalMinDate);
      setMaxDate(globalMaxDate);
      setToValue(globalMaxDate);
      if (newValue === "Quarterly") {
        const year = globalMaxDate!.year();
        setFromValue(dayjs(`${year}-01-01`));
        setToValue(dayjs(`${year}-01-01`));
      }
    }
    setPeriod(newValue);
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

  const getSelectedData = () => {
    let minimum_date = dayjs(
      Math.max(fromValue?.valueOf()!, globalMinDate?.valueOf()!)
    );
    let maximum_date = toValue;
    if (period === "Quarterly") maximum_date = maximum_date!.add(2, "month");
    maximum_date = dayjs(
      Math.min(maximum_date?.valueOf()!, globalMaxDate?.valueOf()!)
    );
    const quarterMap = ["Jan-Mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"];
    const categories = [...Object.keys(inflowCategories)];

    let selectedData: CashflowTable = {};

    let baseInflowData: StringDict = {};
    categories.forEach((category) => {
      baseInflowData[category] = 0;
    });

    for (
      let year = minimum_date!.year();
      year <= maximum_date!.year();
      year++
    ) {
      let min_month = 0;
      let max_month = 11;
      if (year === minimum_date!.year()) min_month = minimum_date!.month();
      if (year === maximum_date!.year()) max_month = maximum_date!.month();
      for (let month = min_month; month <= max_month; month++) {
        const tempDate = dayjs().month(month).year(year);

        if (period === "Monthly") {
          selectedData[tempDate.format("MMM YYYY")] = {
            "Cash inflow": inFlowData[tempDate.format("MMM YYYY")],
          };
        } else if (period === "Quarterly") {
          const quarterNo = Math.floor(tempDate.month() / 3);
          const quarterLabel: string = `${
            quarterMap[quarterNo]
          } ${tempDate.year()}`;

          if (!(quarterLabel in selectedData)) {
            selectedData[quarterLabel] = {
              "Cash inflow": { ...baseInflowData },
            };
          }

          categories.forEach((type) => {
            if (type === "Total") return;
            selectedData[quarterLabel]["Cash inflow"].Total +=
              inFlowData[tempDate.format("MMM YYYY")][type];
            selectedData[quarterLabel]["Cash inflow"][type] +=
              inFlowData[tempDate.format("MMM YYYY")][type];
          });
        } else {
          let annualLabel: string = `FY ${tempDate.year()}-${
            (tempDate.year() + 1) % 100
          }`;
          if (tempDate.month() <= 2) {
            annualLabel = `FY ${tempDate.year() - 1}-${tempDate.year() % 100}`;
          }
          if (!(annualLabel in selectedData)) {
            selectedData[annualLabel] = {
              "Cash inflow": { ...baseInflowData },
            };
          }

          categories.forEach((type) => {
            if (type === "Total") return;
            selectedData[annualLabel]["Cash inflow"].Total +=
              inFlowData[tempDate.format("MMM YYYY")][type];
            selectedData[annualLabel]["Cash inflow"][type] +=
              inFlowData[tempDate.format("MMM YYYY")][type];
          });
        }
      }
    }

    return (
      <TableContainer className="custom-scrollbar">
        <Table
          sx={{
            borderCollapse: "separate",
            maxWidth: "100vw",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
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
              {Object.keys(selectedData).map((month: string) => {
                return (
                  <TableCell
                    key={month}
                    align="center"
                    className="cashflows-table-column"
                    sx={{ minWidth: "110px" }}
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
                <NorthEastIcon
                  sx={{
                    fontSize: "1rem",
                    color: "#338455",
                    marginRight: "0.2rem",
                  }}
                />{" "}
                Cash inflow
              </TableCell>
              {Object.keys(selectedData).map((month: string) => {
                return (
                  <TableCell
                    key={month + "_2"}
                    align="center"
                    className="cashflows-table-column"
                    sx={{ borderBottom: "1px solid #d3d3d3" }}
                  >
                    {selectedData[month]["Cash inflow"].Total >= 1
                      ? Math.floor(
                          selectedData[month]["Cash inflow"].Total
                        ).toLocaleString("en-IN")
                      : "-"}
                  </TableCell>
                );
              })}
            </TableRow>
            {categories.map((category) => {
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
                  {Object.keys(selectedData).map((month: string) => {
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
                        {selectedData[month]["Cash inflow"][category] >= 1
                          ? Math.floor(
                              selectedData[month]["Cash inflow"][category]
                            ).toLocaleString("en-IN")
                          : "-"}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
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
              <span className="cash-balance-heading">CASH BALANCE:</span>
              <span
                className="cash-value"
                style={{
                  color: cashBalance >= 0 ? "#338455" : "#950101",
                }}
              >
                {cashBalance >= 0 ? "+" : "-"}Rs{" "}
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
                  }}
                  renderInput={(params) => (
                    <div
                      onClick={() => setFromOpen(true)}
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
                    period !== "Annually"
                      ? setToValue(newValue)
                      : setToValue(getYearEnd(newValue!));
                  }}
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
                  <FormControlLabel
                    value="Quarterly"
                    control={<Radio />}
                    label={
                      <span style={{ fontSize: "0.8rem" }}>Quarterly</span>
                    }
                  />
                  <FormControlLabel
                    value="Annually"
                    control={<Radio />}
                    label={<span style={{ fontSize: "0.8rem" }}>Annually</span>}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Modal>
      <Grid item xs={12} mt={5}>
        {getSelectedData()}
      </Grid>
    </Grid>
  );
};

export default CashFlows;
