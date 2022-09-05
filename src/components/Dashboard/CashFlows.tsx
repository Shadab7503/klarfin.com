import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import scenarios from "../../images/scenarios.png";
import refresh from "../../images/refresh.png";
import arrow from "../../images/arrow.png";
import { dashboardAreaUtils } from "../../utils/interface";

const CashFlows = (props: dashboardAreaUtils) => {
  const [fromValue, setFromValue] = useState<Dayjs | null>(dayjs("2012-03-01"));
  const [toValue, setToValue] = useState<Dayjs | null>(dayjs("2023-06-01"));
  const [fromOpen, setFromOpen] = useState<boolean>(false);
  const [toOpen, setToOpen] = useState<boolean>(false);

  const cashBalance: number = 235000;

  const utilButton = (text: string, icon = "") => {
    return (
      <Paper
        style={{
          margin: "0 0.2rem",
        }}
        className="util-button-paper"
      >
        <Grid container alignItems="center" className="util-button-text">
          {icon !== "" ? (
            <img src={icon} alt={text} width="19px" height="19px" />
          ) : null}
          <span style={{ paddingLeft: "0.5rem" }} className="xs-none">
            {text}
          </span>
        </Grid>
      </Paper>
    );
  };

  return (
    <Grid item xs={true}>
      <Grid container className="cashflows">
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={() => props.setDrawerOpen(true)}
          color="inherit"
          sx={{ display: { sm: "block", md: "none" } }}
        >
          <MenuIcon style={{ fontSize: "2rem" }} />
        </IconButton>
        <Grid item xs={12} className="test-account">
          You are connected to a test account containing mock data. Click here
          to start your own cash forecast
        </Grid>
        <Grid item xs={12} className="util-buttons">
          <Grid container alignItems="center">
            <Grid item xs={true} sm="auto">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Paper
                  sx={{
                    margin: "0.3rem 0.3rem",
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
                        <span onClick={() => setFromOpen(true)}>
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
                        <span onClick={() => setToOpen(true)}>
                          {params.inputProps?.value}
                        </span>
                      )}
                    />
                  </Grid>
                </Paper>
              </LocalizationProvider>
            </Grid>
            {utilButton("Main Scenarios", scenarios)}
            {utilButton("Refresh computation", refresh)}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            className="cash-display"
            justifyContent="space-between"
          >
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
            <Grid item>
              <div className="delete-mock">
                <span className="delete-mock-text">Delete Mock Data</span>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CashFlows;
