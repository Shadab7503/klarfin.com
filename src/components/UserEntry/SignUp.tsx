import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import signUpImage from "../../images/signup-image.png";
import * as validators from "../../utils/validators";
import Snackbar from "@mui/material/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { user } from "../../utils/interface";
import { industries } from "../../utils/variables";
import { Alert } from "../../utils/components";
import { useNavigate, useSearchParams } from "react-router-dom";

const SignUp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [validating, setValidating] = useState<boolean>(false);
  const [registerStatus, setRegisterStatus] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isPasswordMatch, SetisPasswordMatch] = useState(true);
  const [confirmPassword,SetConfirmPassword] = useState<String>("");
  const Navigate = useNavigate();
  const [waitingForResponse, setWaitingForResponse] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<user>({
    name: "",
    companyName: "",
    panNumber: "",
    mobileNumber: "",
    email: "",
   // industryName: "",
    password: "",
    token:''
  });

  const [searchParams, setSearchParams] = useSearchParams();
 
  const isDisabled = (type:string)=>{
    const id = searchParams.get("code");
    if(id) {
      return true;
    }
    return false;
  }

  const handleChangeConfirmPassword =(event:any)=>{
    event.preventDefault();
    SetisPasswordMatch(true);
    SetConfirmPassword(event.target.value);
  }

  useEffect(() => {
    const id = searchParams.get("code");

    axios
      .post(process.env.REACT_APP_BACKEND_HOST + 'v1/admin/data', {id})
      .then(({data})=>{
        setNewUser(data.detail)
      });


    let tokens = localStorage.getItem("tokens");
    try {
      if (tokens) window.location.href = "/dashboard";
      else setIsLoggedIn(false);
    } catch (err) {
      localStorage.removeItem("tokens");
      setIsLoggedIn(false);
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    if (name === "mobileNumber" && value.length > 10) return;
    if(name==="password"){SetisPasswordMatch(true)}
    setNewUser({ ...newUser, [name]: value });
  };
  
  const signUpUser = (user: user) => {
    console.log(user)
    
    if(user.password !== confirmPassword){
      SetisPasswordMatch(false);
      return;
    }

    let url = "v1/admin/register";

    if(searchParams.get("code")) {
      url = "v1/member/setPassword";
    }
    setValidating(true);
    if (
      !validators.validateNotEmpty(user.name) ||
      !validators.validateNotEmpty(user.companyName) ||
      !validators.validatePAN(user.panNumber) ||
      !validators.validateMobile(user.mobileNumber) ||
      !validators.validateEmail(user.email) ||
      //!validators.validateNotEmpty(user.industryName) ||
      !validators.validatePassword(user.password)
    )
      return;
    setValidating(false);
    setWaitingForResponse(true);
    const payload: any = {
      ...user
    }
    if(searchParams.get('token')) {
      payload.token = `${searchParams.get('token')}`
    }
    axios
      .post(process.env.REACT_APP_BACKEND_HOST + url, {...payload})
      .then((response) => {
        setWaitingForResponse(false);
        const {data} = response;
        if (data.success) {
          console.log("setRegister is success")
          setRegisterStatus("success");
          setTimeout(() => {
            Navigate("/")
          }, 3000);
          if(searchParams.get("code")) {
            window.location.href = '/login';
          }
          // if ("token" in response.data.detail.member.token)
          //   localStorage.setItem(
          //     "tokens",
          //     JSON.stringify({
          //       accessToken: response.data.detail.member.token.token,
          //       refreshToken:
          //         response.data.detail.member.token.refreshToken.refresh,
          //     })
          //   );
          // else
          //   localStorage.setItem(
          //     "tokens",
          //     JSON.stringify({
          //       accessToken:
          //         response.data.detail.member.token.updateToken.token,
          //       refreshToken:
          //         response.data.detail.member.token.refreshToken.refresh,
          //     })
          //   );
          setNewUser({
            name: "",
            companyName: "",
            panNumber: "",
            mobileNumber: "",
            email: "",
         //   industryName: "",
            password: "",
            token:''
          });
          // setTimeout(function () {
          //   // window.location.href = "/dashboard";
          // }, 1000);
        } else {
          setRegisterStatus("error");
          setErrorMsg(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setWaitingForResponse(false);
        setRegisterStatus("error");
        setErrorMsg(err.response.data.message);
      });
  };

  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setRegisterStatus("");
    setErrorMsg("");
  };
  if (isLoggedIn === false)
    return (
      <div className="signup-page">
        {
          registerStatus ==="success" && 
         <Alert
            onClose={handleSnackClose}
            severity="success"
            sx={{ width: "100%" }}
            className="snack"
            style={{position:'fixed'}}
          >
            You have successfully signed up. Kindly wait for approval of your account by Klarfin.
          </Alert>
        }
        <Grid container className="signup-container">
          <Grid item md={6}>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              className="signup-container"
            >
              <Grid item xl={6} lg={8} md={10} sm={8} xs={10.5}>
                <Grid container py={4}>
                  <Grid item xs={12}>
                    <div className="signup-heading">Sign Up</div>
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel className="form-label">Name as per Pancard*</InputLabel>
                    <TextField
                    disabled={isDisabled('name')}
                      className="form-label"
                      placeholder="Name as per Pancard"
                      error={
                        validating && !validators.validateNotEmpty(newUser.name)
                      }
                      helperText={
                        validating && !validators.validateNotEmpty(newUser.name)
                          ? "Name cannot be empty"
                          : ""
                      }
                      variant="outlined"
                      fullWidth
                      value={newUser.name}
                      name="name"
                      onChange={handleChange}
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
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel className="form-label">
                      Company/ Organisation Name*
                    </InputLabel>
                    <TextField
                     disabled={isDisabled('org')}
                      className="form-label"
                      placeholder="Company/ Organisation Name"
                      error={
                        validating &&
                        !validators.validateNotEmpty(newUser.companyName)
                      }
                      helperText={
                        validating &&
                        !validators.validateNotEmpty(newUser.companyName)
                          ? "Company name cannot be empty"
                          : ""
                      }
                      variant="outlined"
                      fullWidth
                      value={newUser.companyName}
                      name="companyName"
                      onChange={handleChange}
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
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel className="form-label">PAN*</InputLabel>
                    <TextField
                     disabled={isDisabled('pan')}

                      className="form-label"
                      placeholder="XXXXXXXXXX"
                      error={
                        validating && !validators.validatePAN(newUser.panNumber)
                      }
                      helperText={
                        validating && !validators.validatePAN(newUser.panNumber)
                          ? "Invalid PAN number"
                          : ""
                      }
                      variant="outlined"
                      fullWidth
                      value={newUser.panNumber}
                      name="panNumber"
                      onChange={handleChange}
                      inputProps={{ maxLength: 10 }}
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
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel className="form-label">
                      Mobile Number*
                    </InputLabel>
                    <TextField
                      className="form-label"
                      placeholder="XXXXXXXXXX"
                      error={
                        validating &&
                        !validators.validateMobile(newUser.mobileNumber)
                      }
                      helperText={
                        validating &&
                        !validators.validateMobile(newUser.mobileNumber)
                          ? "Invalid Mobile number"
                          : ""
                      }
                      variant="outlined"
                      fullWidth
                      type="number"
                      value={newUser.mobileNumber}
                      name="mobileNumber"
                      onChange={handleChange}
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
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel className="form-label">
                      Work Email ID*
                    </InputLabel>
                    <TextField
                    disabled={isDisabled('email')}

                      className="form-label"
                      placeholder="example@gmail.com"
                      error={
                        validating && !validators.validateEmail(newUser.email)
                      }
                      helperText={
                        validating && !validators.validateEmail(newUser.email)
                          ? "Invalid Email"
                          : ""
                      }
                      variant="outlined"
                      fullWidth
                      value={newUser.email}
                      name="email"
                      onChange={handleChange}
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
                  </Grid>
                  {/* <Grid item xs={12}>
                    <InputLabel className="form-label">Industry*</InputLabel>
                    <TextField
                    disabled={isDisabled('industry')}
                      select
                      className="form-label"
                      variant="outlined"
                      error={
                        validating &&
                        !validators.validateNotEmpty(newUser.industryName)
                      }
                      helperText={
                        validating &&
                        !validators.validateNotEmpty(newUser.industryName)
                          ? "Choose an industry"
                          : ""
                      }
                      fullWidth
                      value={newUser.industryName}
                      name="industryName"
                      onChange={handleChange}
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
                    >
                      {industries.map((industry) => (
                        <MenuItem key={industry} value={industry}>
                          {industry}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid> */}
                  <Grid item xs={12}>
                    <InputLabel className="form-label">Password*</InputLabel>
                    <TextField
                      className="form-label"
                      placeholder="Set Password"
                      error={
                        validating &&
                        !validators.validatePassword(newUser.password)
                      }
                      helperText={
                        validating &&
                        !validators.validatePassword(newUser.password)
                          ? "Password must be atleast 8 characters and contain atleast one character and one number"
                          : ""
                      }
                      variant="outlined"
                      fullWidth
                      value={newUser.password}
                      name="password"
                      type="password"
                      onChange={handleChange}
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
                  </Grid>
                  <Grid item xs={12}>
                  <InputLabel className="form-label">
                    Confirm New Password*
                  </InputLabel>
                  <TextField
                    className="form-label"
                    placeholder="Set Password"
                   // error={!validators.validatePassword(newUser.password)}
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
                      onClick={() => signUpUser(newUser)}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                  <Grid item xs={12} className="not-registered">
                    Already have an account?{" "}
                    <a href="/" style={{ color: "#30a8d8" }}>
                      Login here!
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            sm={6}
            className="signup-right"
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
                  src={signUpImage}
                  alt="Manage cashflows and forecase cashflows efficiently"
                  className="signup-image"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        <Snackbar
          open={registerStatus === "error"}
          autoHideDuration={60000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity="error"
            sx={{ width: "100%" }}
            className="snack"
          >
            Error: {errorMsg}
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

export default SignUp;
