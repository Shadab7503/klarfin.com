import React, { useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { TextField, Button, MenuItem, CircularProgress, Alert, Snackbar, Card, CardContent, Typography, useStepContext } from '@mui/material';
import axios from 'axios';
function CreateOrderOTP({ accessToken }) {
  const { state }: any = useLocation();
  const { formData } = state;
  const [msg, setMsg] = useState("");
  const { folio_id }: any = useParams();
  
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [OTP, setOTP] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    await axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/super/verify_otp_createotbm`, { otp: OTP },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then((res) => {
        if (!res.data.succ) {
          setMsg(res.data.message)
          setIsFailure(true);
          setIsLoading(false);
          return;
        }
        axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/super/create-order`, formData,
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }).then(res => {
            const { data } = res;
            if (!data.succ) {
              setIsLoading(false);
              setMsg(data.message)
              setIsFailure(true);
              return;
            }
            setIsLoading(false);
            setIsSuccess(true);
            setMsg(`Order submitted successfully for Rs ${formData.Amount}`)
            setTimeout(() => {
              navigate(`/dashboardSuper/investment/details/${folio_id}`)
            }, 3000)

          }).catch(({ response }) => {
            setIsLoading(false);
            const { data } = response;
            setIsFailure(true);
            setMsg(data.message);
            setValidationErrors(data.validationErrors);
            return;
          })
        return;
      }
      ).catch(({ response }) => {
        setIsLoading(false);
        const { data } = response;
        setIsFailure(true);
        setMsg(data.message);
        setValidationErrors(data.validationErrors);
        return;
      })
  }
  const handleChange = (event) => {
    event.preventDefault();
    const OTP = event.target.value;
    setOTP(OTP);
  }


  return (
    <div style={{ margin: "4rem" }}>
      <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
        <CardContent>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              OTP sent to {process.env.REACT_APP_SUPERADMIN_EMAIL}
            </Typography>
            <TextField
              label="OTP"
              name="otp"
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.OTP}
              helperText={validationErrors.OTP}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Order'}
            </Button>
          </form>
        </CardContent>
        <Snackbar
          open={isSuccess}
          autoHideDuration={3000}
          onClose={() => setIsSuccess(false)}
          sx={{ marginBottom: 2 }}
        >
          <Alert severity='success' >{msg}</Alert>
        </Snackbar>
        <Snackbar
          open={isFailure}
          autoHideDuration={3000}
          onClose={() => setIsFailure(false)}
          sx={{ marginBottom: 2 }}
        ><Alert severity='error' >{msg}</Alert></Snackbar>
      </Card>
    </div>
  )
}

export default CreateOrderOTP