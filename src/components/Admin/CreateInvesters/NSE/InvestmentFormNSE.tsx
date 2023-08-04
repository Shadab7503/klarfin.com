import React from 'react'
import { TextField, Button, Alert, CircularProgress, Snackbar, Card, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

function InvestmentForm({ capturedDataHandler, capturedData, accessToken, handleNext }) {
  const [isConfirm, setisConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [existInvester, setExitInvester] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [formData, setformData] = useState({
    iin: "",
    fund_id: capturedData?.fund_id,
    fundType: capturedData?.fundType
  })

  const handleChange = (event) => {
    setValidationErrors({});
    event.preventDefault();
    const { name, value } = event.target;
    setformData((formData) => ({
      ...formData,
      [name]: value
    }))
  }

  // const getAdmins = () => {
  //   if (accessToken) {
  //     axios
  //       .get(
  //         process.env.REACT_APP_BACKEND_HOST + "v1/user/investment/get-admin",
  //         {
  //           headers: { Authorization: `Bearer ${accessToken}` },
  //         }
  //       )
  //       .then((response) => {
  //         if (
  //           "message" in response.data &&
  //           response.data.message === "Admin"
  //         ) {
  //           setUsers({ ...response.data.admin[0] });
  //           capturedDataHandler("user_id", response.data.admin[0].id)
  //           console.log(" USERDATA : ", { ...response.data.admin[0] })
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }
  // useEffect(() => {
  //   getAdmins()
  // }, [])


  const saveHandler = (e) => {
    e.preventDefault();
    setValidationErrors({});
    setIsLoading(true);

    axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/nse/invest`, formData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    )
      .then(res => {
        const { data } = res;
        setIsLoading(false);
        if (!data.succ) {
          if (data.message == "Investor Already Exist") {
            setMessage(data.message)
            setExitInvester(true);
            return;
          }
          setMessage(data.message);
          setIsFailure(true);
          return;
        }
        setMessage(data.message);
        setIsSuccess(true);
        handleNext();
      })

      .catch(({ response }) => {
        setIsLoading(false);
        setIsFailure(true);
        response?.data && setValidationErrors(response.data.validationErrors);
      });

  }

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto" }}>
      <CardContent>
        <form onSubmit={saveHandler} style={{ width: "100%" }}>
          <Typography variant="subtitle1" gutterBottom>
            Investment
          </Typography>

          <TextField
            label="IIN"
            onChange={handleChange}
            focused
            name="iin"
            autoComplete='off'
            required
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.iin} // Check if the field has an error
            helperText={validationErrors.iin} // Display the error message
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </CardContent>
      <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        onClose={() => setIsSuccess(false)}
        sx={{ marginBottom: 2 }}
      ><Alert severity='success' >{message}</Alert></Snackbar>
      <Snackbar
        open={isFailure}
        autoHideDuration={3000}
        onClose={() => setIsFailure(false)}
        sx={{ marginBottom: 2 }}
      ><Alert severity='error' >{message}</Alert></Snackbar>
      <Snackbar
        open={existInvester}
        autoHideDuration={3000}
        onClose={() => setExitInvester(false)}
        sx={{ marginBottom: 2 }}
      >
        <Alert severity="warning" sx={{ width: "100%" }} className="snack">
          {message}
        </Alert>
      </Snackbar>
    </Card>
  )
}

export default InvestmentForm