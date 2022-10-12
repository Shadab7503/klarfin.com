import { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import scenarios from "../../images/scenarios.png";
import refresh from "../../images/refresh.png";
import arrow from "../../images/arrow.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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

const CashFlows = () => {
  const [fromValue, setFromValue] = useState<Dayjs | null>(dayjs("2012-03-01"));
  const [toValue, setToValue] = useState<Dayjs | null>(dayjs("2023-06-01"));
  const [fromOpen, setFromOpen] = useState<boolean>(false);
  const [toOpen, setToOpen] = useState<boolean>(false);

  const cashBalance: number = 235000;

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
              >
                <Grid
                  container
                  alignItems="center"
                  className="util-button-text"
                >
                  <MobileDatePicker
                    open={fromOpen}
                    onOpen={() => setFromOpen(true)}
                    onClose={() => setFromOpen(false)}
                    views={["year", "month"]}
                    minDate={dayjs("2012-03-01")}
                    maxDate={toValue}
                    value={fromValue}
                    toolbarTitle="SELECT MIN DATE"
                    onChange={(newValue) => {
                      setFromValue(newValue);
                    }}
                    renderInput={(params) => (
                      <span
                        onClick={() => setFromOpen(true)}
                        style={{ fontSize: "0.9rem" }}
                      >
                        {params.inputProps?.value}
                      </span>
                    )}
                  />
                  <img src={arrow} alt="arrow" width="21px" height="21px" />
                  <MobileDatePicker
                    open={toOpen}
                    onOpen={() => setToOpen(true)}
                    onClose={() => setToOpen(false)}
                    views={["year", "month"]}
                    minDate={fromValue}
                    maxDate={dayjs("2023-06-01")}
                    value={toValue}
                    toolbarTitle="SELECT MAX DATE"
                    onChange={(newValue) => {
                      setToValue(newValue);
                    }}
                    renderInput={(params) => (
                      <span
                        onClick={() => setToOpen(true)}
                        style={{ fontSize: "0.9rem" }}
                      >
                        {params.inputProps?.value}
                      </span>
                    )}
                  />
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
    </Grid>
  );
};

export default CashFlows;
