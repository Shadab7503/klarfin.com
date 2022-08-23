import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import loginImage from "../images/login-image.png";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  useEffect(() => {
    const val = localStorage.getItem("tokens");
    if (val) window.location.href = "/dashboard";
    else setIsLoggedIn(false);
  }, []);
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
                          <Checkbox className="checkbox" defaultChecked />
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
      </div>
    );
  else
    return (
      <Backdrop sx={{ color: "white" }} open={true} onClick={() => {}}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
};

export default Login;
