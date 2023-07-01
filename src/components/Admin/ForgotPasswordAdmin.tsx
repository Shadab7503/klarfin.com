import React, {useState, useEffect} from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import signUpImage from "../../images/signup-image.png";
import * as validators from "../../utils/validators";
import Snackbar from "@mui/material/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import {Alert} from "../../utils/components";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ForgotStatus, setForgotStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [linkSent, setLinkSent] = useState<boolean>(false);
  const [email, setEmail] = useState("example@gmail.com");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isOTPSent, setisOTPSent] = useState(false);
  const [otp,setOtp] = useState("");
  const [isPasswordMatch, SetisPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const ForgotPasswordFun =() => {
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/forgot-password`,
        {email}
      )
      .then(({data}) => {
        console.log(data);
        if (!data.succ) {
          console.log(data);
          setIsLoading(false);
          setErrorMsg(data.message);
          setForgotStatus(true);
          return;
        }
        setIsLoading(false);
        setisOTPSent(true);
        setLinkSent(true);
        setErrorMsg(data.message)
      });
  };

  const VerifyOTP = () => {
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/verify-otp`,
        {email,otp,password}
      )
      .then(({data}) => {
        if (!data.succ) {
          console.log(data);
          setIsLoading(false);
          setErrorMsg(data.message);
          setForgotStatus(true);
          return;
        }
        setIsLoading(false);
        setLinkSent(true)
        setErrorMsg(data.message);
        setTimeout(() => {
          navigate('/')
        }, 2000);
      });
  };

  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setForgotStatus(false);
    setLinkSent(false);
    setErrorMsg("");
  };

  const HandlerSendLink = () => {
    if (validators.validateEmail(email)) {
      ForgotPasswordFun();
    }
  };

  const HandlerSetPassword = () => {
    if(password !== confirmpassword){
      SetisPasswordMatch(false);
      return;
    }
    VerifyOTP();
  };

  const handleChange = event => {
    event.preventDefault();
    const value = event.target.value;
    setEmail(value);
  };

  const handleChangeOTP = event => {
    event.preventDefault();
    const value = event.target.value;
    setOtp(value);
  };

  const handleChangePassword = event => {
    event.preventDefault();
    const value = event.target.value;
    setPassword(value);
  };

  const handleChangeConfirmPassword = event => {
    SetisPasswordMatch(true);
    event.preventDefault();
    const value = event.target.value;
    setConfirmPassword(value);
  };

  return (
    <div className="signup-page">
      <Grid container className="signup-container">
        <Grid item md={6}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className="signup-container"
          >
            <Grid item xl={6} lg={8} md={10} sm={8} xs={10.5}>
              <Grid item xs={12}>
                <div className="signup-heading">Forgot Password</div>
              </Grid>
              {!isOTPSent ? (
                <Grid container py={4}>
                  <Grid item xs={12}>
                    <InputLabel className="form-label">
                      Work Email ID*
                    </InputLabel>
                    <TextField
                      className="form-label"
                      placeholder="example@gmail.com"
                      error={!validators.validateEmail(email)}
                      helperText={
                        !validators.validateEmail(email) ? "Invalid Email" : ""
                      }
                      variant="outlined"
                      fullWidth
                      name="email"
                      onChange={handleChange}
                      InputProps={{
                        style: {
                          fontSize: "1.1rem",
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root:hover": {
                          "& > fieldset": {
                            borderColor: "#186090",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      className="login-button"
                      sx={{
                        "&:hover": {
                          backgroundColor: "#30a8d8",
                        },
                      }}
                      onClick={HandlerSendLink}
                    >
                      Send OTP to Mail
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Grid item xs={12}>
                  <InputLabel className="form-label">
                    Enter OTP Sent To your Mail*
                  </InputLabel>
                  <TextField
                    className="form-label"
                    placeholder="Enter OTP"
                    variant="outlined"
                    fullWidth
                    name="otp"
                    type="text"
                    onChange={handleChangeOTP}
                    InputProps={{
                      style: {
                        fontSize: "0.8rem",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                          borderColor: "#186090",
                        },
                      },
                    }}
                  />
                  <InputLabel className="form-label">
                    Enter New Password*
                  </InputLabel>
                  <TextField
                    className="form-label"
                    placeholder="Set Password"
                    error={!validators.validatePassword(password)}
                    helperText={
                      !validators.validatePassword(password)
                        ? "Password must be atleast 8 characters and contain atleast one character and one number"
                        : ""
                    }
                    variant="outlined"
                    fullWidth
                    name="password"
                    type="password"
                    onChange={handleChangePassword}
                    InputProps={{
                      style: {
                        fontSize: "0.8rem",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                          borderColor: "#186090",
                        },
                      },
                    }}
                  />
                  <InputLabel className="form-label">
                    Confirm New Password*
                  </InputLabel>
                  <TextField
                    className="form-label"
                    placeholder="Set Password"
                    error={!validators.validatePassword(password)}
                    helperText={
                      isPasswordMatch ? "":<Alert severity="error" >Password Not Match</Alert> 
                    }
                    variant="outlined"
                    fullWidth
                    name="confirmpassword"
                    type="password"
                    onChange={handleChangeConfirmPassword}
                    InputProps={{
                      style: {
                        fontSize: "0.8rem",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root:hover": {
                        "& > fieldset": {
                          borderColor: "#186090",
                        },
                      },
                    }}
                  />
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      className="login-button"
                      sx={{
                        "&:hover": {
                          backgroundColor: "#30a8d8",
                        },
                      }}
                      onClick={HandlerSetPassword}
                    >
                      Set Password
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          sm={6}
          className="signup-right"
          sx={{
            display: {md: "block", sm: "none", xs: "none"},
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <Grid item xl={8.5} lg={10.5} md={12}>
              <img
                src={signUpImage}
                alt="Manage cashflows and forecase cashflows efficiently"
                className="signup-image"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Snackbar
        open={ForgotStatus}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity="error"
          sx={{width: "100%"}}
          className="snack"
        >
          {errorMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={linkSent}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity="success"
          sx={{width: "100%"}}
          className="snack"
        >
          {errorMsg}
        </Alert>
      </Snackbar>
      <Backdrop sx={{color: "white"}} open={isLoading} onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ForgotPassword;
