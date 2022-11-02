import { useState } from "react";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
// import axios from "axios";
import { SetPassword } from "../../utils/interface";
import { validatePassword } from "../../utils/validators";
// import { host } from "../../utils/variables";
import { Alert } from "../../utils/components";
import { useSearchParams } from "react-router-dom";

const Verify = () => {
  const [passwordStatus, setPasswordStatus] = useState<
    "error" | "success" | ""
  >("");
  const [validating, setValidating] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState<SetPassword>({
    password: "",
    confirmPassword: "",
  });

  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setPasswordStatus("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setPassword({ ...password, [name]: value });
  };

  const setMemberPassword = (password: SetPassword) => {
    setValidating(true);
    if (
      !validatePassword(password.password) ||
      password.confirmPassword !== password.password
    )
      return;
    setValidating(false);
    const email = searchParams.get("email");
    console.log(email);
    setPasswordStatus("error");
  };

  return (
    <div className="login-page">
      <Grid container className="login-container" justifyContent="center">
        <Grid item md={6}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className="login-container"
          >
            <Grid item xl={6} lg={8} md={10} sm={8} xs={10.5}>
              <Grid container>
                <Grid item xs={12} mb={5}>
                  <div className="set-password">Set Password</div>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel className="form-label">Password</InputLabel>
                  <TextField
                    className="form-label"
                    variant="outlined"
                    fullWidth
                    type="password"
                    name="password"
                    value={password.password}
                    onChange={handleChange}
                    error={validating && !validatePassword(password.password)}
                    helperText={
                      validating && !validatePassword(password.password)
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
                  <InputLabel className="form-label">
                    Confirm Password
                  </InputLabel>
                  <TextField
                    className="form-label"
                    variant="outlined"
                    fullWidth
                    type="password"
                    name="confirmPassword"
                    value={password.confirmPassword}
                    onChange={handleChange}
                    error={
                      validating &&
                      password.confirmPassword !== password.password
                    }
                    helperText={
                      validating &&
                      password.confirmPassword !== password.password
                        ? "Passwords do not match"
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
                <Grid item xs={12} mt={5}>
                  <Button
                    variant="contained"
                    fullWidth
                    className="login-button"
                    onClick={() => setMemberPassword(password)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#30a8d8",
                      },
                    }}
                  >
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={passwordStatus === "success"}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity="success"
          sx={{ width: "100%" }}
          className="snack"
        >
          Successful
        </Alert>
      </Snackbar>
      <Snackbar
        open={passwordStatus === "error"}
        autoHideDuration={6000}
        onClose={handleSnackClose}
      >
        <Alert
          onClose={handleSnackClose}
          severity="error"
          sx={{ width: "100%" }}
          className="snack"
        >
          Error
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Verify;
