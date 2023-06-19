import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Alert,
  Button,
  Grid,
  Modal,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import TableCell from "@mui/material/TableCell";
import axios from "axios";
import Loading from "./Loading";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function InvestmentScreen(props) {
  const [investment, setInvestment] = useState({
    amount: 0,
    day1: "",
    day2: "",
    frequency: "",
    fund: "",
    portfolio: 0,
    returns: "0",
  });

  const [promoterData, setPromoterData] = useState({
    amount: 0,
    day1: "",
    day2: "",
    frequency: "",
    fund: "",
    portfolio: 0,
    returns: "0",
  });

  const [loading, setLoading] = useState(false);
  const [investModal, setInvestModal] = useState(false);
  const [redeemModal, setRedeemModal] = useState(false);

  const [publicMsg, setPublicMsg] = useState("");

  const [redeemData, setRedeemData] = useState({ amount: "", fund: "" });
  const [investmentData, setInvestmentData] = useState({
    amount: "",
    fund: "",
  });

  const getData = async () => {
    setLoading(true);

    const [investmentRes, promoterRes] = await Promise.all([
      axios.get(
        process.env.REACT_APP_BACKEND_HOST + "v1/user/investment/index",

        {
          headers: { Authorization: `Bearer ${props.accessToken}` },
          params: { type: 0 },
        }
      ),
      axios.get(
        process.env.REACT_APP_BACKEND_HOST + "v1/user/investment/index",

        {
          headers: { Authorization: `Bearer ${props.accessToken}` },
          params: { type: 1 },
        }
      ),
      axios.get(
        process.env.REACT_APP_BACKEND_HOST + "v1/user/investment/index",

        {
          headers: { Authorization: `Bearer ${props.accessToken}` },
          params: { type: 2 },
        }
      ),
      axios.get(
        process.env.REACT_APP_BACKEND_HOST + "v1/user/investment/index",

        {
          headers: { Authorization: `Bearer ${props.accessToken}` },
          params: { type: 3 },
        }
      ),
    ]);

    const investmentDataRes = investmentRes.data;
    setLoading(false);
    setInvestment(investmentRes.data.investment);
    const fund = investmentRes.data.investment?.fund;

    setRedeemData({ ...redeemData, fund });
    setInvestmentData({ ...investmentData, fund });

    // const promoterData = promoterRes.data;

    setPromoterData(promoterRes.data.investment);
  };

  useEffect(() => {
    getData();
  }, []);

  const investmentHandler = (e) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/invest`,
        { ...investmentData, type: value == 1 ? "promoter" : "" },
        {
          headers: { Authorization: `Bearer ${props.accessToken}` },
        }
      )
      .then(({ data }) => {
        const { public_msg } = data;
        setPublicMsg(public_msg);
        setTimeout(() => {
          setInvestModal(false);
        }, 1000);

        setTimeout(() => {
          setPublicMsg("");
        }, 6000);
      });
  };

  const redeemHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/redeem`,
        { ...redeemData, type: value == 1 ? "promoter" : "" },
        {
          headers: { Authorization: `Bearer ${props.accessToken}` },
        }
      )
      .then(({ data }) => {
        const { public_msg } = data;
        setPublicMsg(public_msg);
        setTimeout(() => {
          setRedeemModal(false);
        }, 1000);

        setTimeout(() => {
          setPublicMsg("");
        }, 6000);
      });
  };

  const statementHandler = () => {
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/statement`,
        { type: value == 1 ? "promoter" : "" },
        {
          headers: { Authorization: `Bearer ${props.accessToken}` },
        }
      )
      .then(({ data }) => {
        const { public_msg } = data;
        setPublicMsg(public_msg);
        setTimeout(() => {
          setPublicMsg("");
        }, 6000);
      });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    let fund = "";
    if (newValue == 1) {
      fund = promoterData?.fund;
      // setInvestment({...promoterData});
    }

    if (newValue == 0) {
      fund = investment?.fund;
      // setInvestment({...investment});
    }

    setRedeemData({ ...redeemData, fund });
    setInvestmentData({ ...investmentData, fund });

    setValue(newValue);
  };

  if (loading) return <Loading />;

  return (
    <div style={{ fontFamily: "Montserrat" }}>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Tabs
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            centered
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              style={{ width: "50%", fontWeight: "bold" }}
              label={props.user?.companyName}
              {...a11yProps(0)}
            />
            <Tab
              style={{ width: "50%", fontWeight: "bold" }}
              label="Promoter"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "1.5rem",
            }}
          >
            {investment && (
              <Grid item>
                <div className="cash-balance">
                  <span className="cash-balance-heading">TOTAL RETURNS</span>
                  <span
                    className="cash-value"
                    style={{
                      color: "#338455",
                    }}
                  >
                    INR {Math.abs(+investment?.returns).toLocaleString("en-IN")}
                  </span>
                </div>
              </Grid>
            )}

            {investment && (
              <Button
                type="submit"
                sx={{
                  background: "#231955",
                  fontFamily: "Work Sans",
                  fontWeight: "bold",
                  padding: "0.5rem 1rem",
                  borderRadius: "2rem",
                  fontSize: "0.8rem",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#231955",
                  },
                }}
                onClick={() => {
                  setInvestModal(true);
                }}
              >
                Invest Now
              </Button>
            )}
          </div>

          {!investment && (
            <div style={{ margin: "2rem" }}>
              <Typography
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  backgroundColor: " #00a1d147",
                }}
                variant="h5"
                component="h2"
              >
                No Investment Found
              </Typography>
            </div>
          )}

          {investment && (
            <div style={{ margin: "2rem" }}>
              <Typography
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  backgroundColor: " #00a1d147",
                }}
                variant="h5"
                component="h2"
              >
                Frequency of Investment
              </Typography>

              <Grid>
                <TableContainer className="custom-scrollbar">
                  <Table
                    sx={{
                      borderCollapse: "separate",
                    }}
                  >
                    <TableHead>
                      <TableRow className="receivables-header">
                        <TableCell
                          key="type"
                          align="center"
                          className="receivables-column-header"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Frequency
                        </TableCell>

                        <TableCell
                          key="type"
                          align="center"
                          className="receivables-column-header"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Day
                        </TableCell>

                        <TableCell
                          key="type"
                          align="center"
                          className="receivables-column-header"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Amount (INR)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key="key">
                        <TableCell
                          key="key"
                          className="receivables-row-value"
                          style={{ textAlign: "center" }}
                        >
                          {investment?.frequency}
                        </TableCell>

                        <TableCell
                          key="key"
                          className="receivables-row-value"
                          style={{ textAlign: "center" }}
                        >
                          {investment?.frequency == "Twice in a week"
                            ? [investment?.day1, investment?.day2].join(", ")
                            : investment?.day1}
                        </TableCell>

                        <TableCell
                          key="key"
                          className="receivables-row-value"
                          style={{ textAlign: "center" }}
                        >
                          {investment?.amount.toLocaleString("en-IN")}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </div>
          )}

          {publicMsg && (
            <Snackbar
              open={publicMsg !== ""}
              autoHideDuration={6000}
              // onClose={handleSnackClose}
            >
              <Alert
                // onClose={handleSnackClose}
                severity="success"
                sx={{ width: "100%" }}
                className="snack"
              >
                {publicMsg}
              </Alert>
            </Snackbar>
          )}

          {investment && (
            <div style={{ margin: "2rem" }}>
              <Typography
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  backgroundColor: " #00a1d147",
                }}
                variant="h5"
                component="h2"
              >
                Investments of {props.user?.companyName}
              </Typography>

              <Grid>
                <TableContainer className="custom-scrollbar">
                  <Table
                    sx={{
                      borderCollapse: "separate",
                    }}
                  >
                    <TableHead>
                      <TableRow className="receivables-header">
                        <TableCell
                          key="type"
                          align="center"
                          className="receivables-column-header"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Current Portfolio Amount (INR)
                        </TableCell>

                        <TableCell
                          key="type"
                          align="center"
                          className="receivables-column-header"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key="key">
                        <TableCell
                          key="key"
                          className="receivables-row-value"
                          style={{ textAlign: "center" }}
                        >
                          {investment?.portfolio.toLocaleString("en-IN")}
                        </TableCell>

                        <TableCell align="center">
                          <Grid container justifyContent="center">
                            <Grid
                              item
                              className="bills-pay"
                              py={1}
                              px={2}
                              mx={2}
                              onClick={() => {
                                setRedeemModal(true);
                              }}
                            >
                              Redeem
                            </Grid>
                            <Grid
                              item
                              className="bills-pay"
                              py={1}
                              px={2}
                              onClick={() => {
                                statementHandler();
                              }}
                            >
                              Request Statement
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </div>
          )}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "1.5rem",
            }}
          >
            {promoterData && (
              <Grid item>
                <div className="cash-balance">
                  <span className="cash-balance-heading">TOTAL RETURNS</span>
                  <span
                    className="cash-value"
                    style={{
                      color: "#338455",
                    }}
                  >
                    INR{" "}
                    {Math.abs(+promoterData?.returns).toLocaleString("en-IN")}
                  </span>
                </div>
              </Grid>
            )}

            {promoterData && (
              <Button
                type="submit"
                sx={{
                  background: "#231955",
                  fontFamily: "Work Sans",
                  fontWeight: "bold",
                  padding: "0.5rem 1rem",
                  borderRadius: "2rem",
                  fontSize: "0.8rem",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#231955",
                  },
                }}
                onClick={() => {
                  setInvestModal(true);
                }}
              >
                Invest Now
              </Button>
            )}
          </div>

          {!promoterData && (
            <div style={{ margin: "2rem" }}>
              <Typography
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  backgroundColor: " #00a1d147",
                }}
                variant="h5"
                component="h2"
              >
                No Investment Found
              </Typography>
            </div>
          )}

          {promoterData && (
            <div style={{ margin: "2rem" }}>
              <Typography
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  backgroundColor: " #00a1d147",
                }}
                variant="h5"
                component="h2"
              >
                Frequency of Investment
              </Typography>

              <Grid>
                <TableContainer className="custom-scrollbar">
                  <Table
                    sx={{
                      borderCollapse: "separate",
                    }}
                  >
                    <TableHead>
                      <TableRow className="receivables-header">
                        <TableCell
                          key="type"
                          align="center"
                          className="receivables-column-header"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Frequency
                        </TableCell>

                        <TableCell
                          key="type"
                          align="center"
                          className="receivables-column-header"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Day
                        </TableCell>

                        <TableCell
                          key="type"
                          align="center"
                          className="receivables-column-header"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Amount (INR)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key="key">
                        <TableCell
                          key="key"
                          className="receivables-row-value"
                          style={{ textAlign: "center" }}
                        >
                          {promoterData?.frequency}
                        </TableCell>

                        <TableCell
                          key="key"
                          className="receivables-row-value"
                          style={{ textAlign: "center" }}
                        >
                          {promoterData?.frequency == "Twice in a week"
                            ? [promoterData?.day1, promoterData?.day2].join(
                                ", "
                              )
                            : promoterData?.day1}
                        </TableCell>

                        <TableCell
                          key="key"
                          className="receivables-row-value"
                          style={{ textAlign: "center" }}
                        >
                          {promoterData?.amount.toLocaleString("en-IN")}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </div>
          )}

          {publicMsg && (
            <Snackbar
              open={publicMsg !== ""}
              autoHideDuration={6000}
              // onClose={handleSnackClose}
            >
              <Alert
                // onClose={handleSnackClose}
                severity="success"
                sx={{ width: "100%" }}
                className="snack"
              >
                {publicMsg}
              </Alert>
            </Snackbar>
          )}

          {promoterData && (
            <div style={{ margin: "2rem" }}>
              <Typography
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  backgroundColor: " #00a1d147",
                }}
                variant="h5"
                component="h2"
              >
                Investments of Promoter
              </Typography>

              <Grid>
                <TableContainer className="custom-scrollbar">
                  <Table
                    sx={{
                      borderCollapse: "separate",
                    }}
                  >
                    <TableHead>
                      <TableRow className="receivables-header">
                        <TableCell
                          key="type"
                          align="center"
                          className="receivables-column-header"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Current Portfolio Amount (INR)
                        </TableCell>

                        <TableCell
                          key="type"
                          align="center"
                          className="receivables-column-header"
                          style={{
                            fontWeight: "bold",
                            textDecoration: "underline",
                          }}
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow key="key">
                        <TableCell
                          key="key"
                          className="receivables-row-value"
                          style={{ textAlign: "center" }}
                        >
                          {promoterData?.portfolio.toLocaleString("en-IN")}
                        </TableCell>

                        <TableCell align="center">
                          <Grid container justifyContent="center">
                            <Grid
                              item
                              className="bills-pay"
                              py={1}
                              px={2}
                              mx={2}
                              onClick={() => {
                                setRedeemModal(true);
                              }}
                            >
                              Redeem
                            </Grid>
                            <Grid
                              item
                              className="bills-pay"
                              py={1}
                              px={2}
                              onClick={() => {
                                statementHandler();
                              }}
                            >
                              Request Statement
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </div>
          )}
        </TabPanel>
      </Box>

      <Modal
        open={investModal}
        onClose={() => {
          setInvestModal(!investModal);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            style={{ textAlign: "center", marginBottom: "2rem" }}
            variant="h6"
            component="h2"
          >
            Invest Now
          </Typography>

          {/* {
          publicMsg &&   <Snackbar
          open={publicMsg !== ""}
          autoHideDuration={6000}
          // onClose={handleSnackClose}
        >
          <Alert
            // onClose={handleSnackClose}
            severity="success"
            sx={{ width: "100%" }}
            className="snack"
          >
            {publicMsg}
          </Alert>
        </Snackbar>
        } */}

          <form onSubmit={investmentHandler}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <Typography
                style={{
                  textAlign: "center",
                  marginLeft: "1rem",
                  width: "50%",
                }}
                component="p"
              >
                Investment Amount
              </Typography>
              <input
                onChange={(e) => {
                  setInvestmentData({
                    ...investmentData,
                    amount: e.target.value,
                  });
                }}
                required
                type="number"
                className="MuiOutlinedInput-input"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <Typography
                style={{
                  textAlign: "center",
                  marginLeft: "1rem",
                  width: "50%",
                }}
                component="p"
              >
                Fund
              </Typography>
              <input
                readOnly
                value={investmentData?.fund}
                onChange={(e) => {
                  setInvestmentData({
                    ...investmentData,
                    fund: e.target.value,
                  });
                }}
                required
                type="text"
                className="MuiOutlinedInput-input"
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <Button
                type="submit"
                sx={{
                  background: "#231955",
                  fontFamily: "Work Sans",
                  fontWeight: "bold",
                  padding: "0.5rem 1rem",
                  borderRadius: "2rem",
                  fontSize: "0.8rem",
                  marginTop: "1rem",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#231955",
                  },
                }}
              >
                Submit Order
              </Button>
            </div>
          </form>
        </Box>
      </Modal>

      <Modal
        open={redeemModal}
        onClose={() => {
          setRedeemModal(!redeemModal);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            style={{ textAlign: "center", marginBottom: "2rem" }}
            variant="h6"
            component="h2"
          >
            Redeem Now
          </Typography>

          <form onSubmit={redeemHandler}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Typography
                style={{
                  textAlign: "center",
                  marginLeft: "1rem",
                  width: "50%",
                }}
                component="p"
              >
                Investment Redemption Amount
              </Typography>

              <input
                max={
                  value == 0 ? investment?.portfolio : promoterData?.portfolio
                }
                onChange={(e) => {
                  setRedeemData({ ...redeemData, amount: e.target.value });
                }}
                required
                type="number"
                className="MuiOutlinedInput-input"
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "1rem",
              }}
            >
              <Typography
                style={{
                  textAlign: "center",
                  marginLeft: "1rem",
                  width: "50%",
                }}
                component="p"
              >
                Fund
              </Typography>
              <input
                readOnly
                value={redeemData?.fund}
                onChange={(e) => {
                  setRedeemData({ ...redeemData, fund: e.target.value });
                }}
                required
                type="text"
                className="MuiOutlinedInput-input"
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "2rem",
              }}
            >
              <Button
                type="submit"
                sx={{
                  background: "#231955",
                  fontFamily: "Work Sans",
                  fontWeight: "bold",
                  padding: "0.5rem 1rem",
                  borderRadius: "2rem",
                  fontSize: "0.8rem",
                  marginTop: "1rem",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: "#231955",
                  },
                }}
              >
                Submit Redemption Order
              </Button>
            </div>

            <p style={{ textAlign: "center" }}>
              {" "}
              Maximum Redeemable Amount is{" "}
              <span style={{ color: "red" }}>
                {value == 0
                  ? investment?.portfolio.toLocaleString("en-IN")
                  : promoterData?.portfolio.toLocaleString("en-IN")}
              </span>{" "}
              INR
            </p>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
