import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import loginImage from "../../images/login-image.png";
import axios from "axios";
import { loginDetails } from "../../utils/interface";
import { validateEmail, validatePassword } from "../../utils/validators";
import { Alert } from "../../utils/components";

const LoginSuper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
  const [loginStatus, setLoginStatus] = useState<"error" | "success" | "">("");
  const [validating, setValidating] = useState<boolean>(false);
  const [loginInfo, setLoginInfo] = useState<loginDetails>({
    email: "",
    password: "",
    remember: true,
  });

  useEffect(() => {
    let tokens = localStorage.getItem("superTokens");
    try {
      if (tokens) window.location.href = "/dashboardSuper";
      else setIsLoggedIn(false);
    } catch (err) {
      localStorage.removeItem("superTokens");
      setIsLoggedIn(false);
    }
  }, []);

  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setLoginStatus("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (name === "remember")
      setLoginInfo({ ...loginInfo, remember: event.target.checked });
    else setLoginInfo({ ...loginInfo, [name]: value });
  };

  const loginUser = (user: loginDetails) => {
    setValidating(true);
    if (!validateEmail(user.email) || !validatePassword(user.password)) return;
    setValidating(false);
    setWaitingForResponse(true);
    axios
      .post(process.env.REACT_APP_BACKEND_HOST + "v1/super/login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        setWaitingForResponse(false);
        console.log(response.data);
        if (response.data.success) {
          setLoginStatus("success");
          setLoginInfo({
            email: "",
            password: "",
            remember: true,
          });
          if ("token" in response.data.detail.member.token)
            localStorage.setItem(
              "superTokens",
              JSON.stringify({
                accessToken: response.data.detail.member.token.token,
                refreshToken:
                  response.data.detail.member.token.refreshToken.refresh,
              })
            );
          else
            localStorage.setItem(
              "superTokens",
              JSON.stringify({
                accessToken:
                  response.data.detail.member.token.updateToken.token,
                refreshToken:
                  response.data.detail.member.token.refreshToken.refresh,
              })
            );
          setTimeout(function () {
            window.location.href = "/dashboardSuper";
          }, 1000);
        } else {
          setLoginStatus("error");
        }
      })
      .catch((err) => {
        console.log(err);
        setWaitingForResponse(false);
        setLoginStatus("error");
      });
  };

  if (!isLoggedIn)
    return (
      <div className="login-page">
        <Grid container className="login-container">
          <Grid item md={6}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              className="login-container"
            >
              <Grid item xl={6} lg={8} md={10} sm={8} xs={10.5}>
                <Grid container>
                  <Grid item xs={12}>
                    <div className="login-heading">Login</div>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel className="form-label">Email</InputLabel>
                    <TextField
                      className="form-label"
                      placeholder="example@gmail.com"
                      variant="outlined"
                      fullWidth
                      name="email"
                      value={loginInfo.email}
                      onChange={handleChange}
                      error={validating && !validateEmail(loginInfo.email)}
                      helperText={
                        validating && !validateEmail(loginInfo.email)
                          ? "Invalid Email"
                          : ""
                      }
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
                    <InputLabel className="form-label">Password</InputLabel>
                    <TextField
                      className="form-label"
                      placeholder="passwordexample123"
                      variant="outlined"
                      fullWidth
                      type="password"
                      name="password"
                      value={loginInfo.password}
                      onChange={handleChange}
                      error={
                        validating && !validatePassword(loginInfo.password)
                      }
                      helperText={
                        validating && !validatePassword(loginInfo.password)
                          ? "Password must be atleast 8 characters and contain atleast one character and one number"
                          : ""
                      }
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
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="remember"
                            value={loginInfo.remember}
                            onChange={handleChange}
                            className="checkbox"
                            defaultChecked
                          />
                        }
                        label="Remember Me"
                        className="remember-me"
                      />
                      <span className="forgot-password">Forgot Password?</span>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      className="login-button"
                      onClick={() => loginUser(loginInfo)}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#30a8d8",
                        },
                      }}
                    >
                      Login
                    </Button>
                  </Grid>
                  <Grid item xs={12} className="not-registered">
                    Not registered yet?{" "}
                    <a href="/register" style={{ color: "#30a8d8" }}>
                      Create an Account!
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            sm={6}
            className="login-right"
            sx={{
              display: { md: "block", sm: "none", xs: "none" },
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
                  src={loginImage}
                  alt="Manage cashflows and forecase cashflows efficiently"
                  className="login-image"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar
          open={loginStatus === "success"}
          autoHideDuration={6000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity="success"
            sx={{ width: "100%" }}
            className="snack"
          >
            Successfully Logged In!
          </Alert>
        </Snackbar>
        <Snackbar
          open={loginStatus === "error"}
          autoHideDuration={6000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity="error"
            sx={{ width: "100%" }}
            className="snack"
          >
            Error: Failed to Login
          </Alert>
        </Snackbar>
        <Backdrop
          sx={{ color: "white" }}
          open={waitingForResponse}
          onClick={() => {}}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  else
    return (
      <Backdrop sx={{ color: "white" }} open={true} onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
};

export default LoginSuper;
