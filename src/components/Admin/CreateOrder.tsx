import React, { useState } from 'react';
import { TextField, Button, MenuItem, CircularProgress,Alert, Snackbar, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const schemes = [
  {
    value: "ON",
    name: "OVERNIGHT FUND",
    plan: "GP",
    opt: "G"
  },
  {
    value: "LF",
    name: "LIQUID FUND",
    plan: "IG",
    opt: "G"
  },
  {
    value: "LP",
    name: "LOW DURATION FUND",
    plan: "RG",
    opt: "G"
  },
]

const CreateOrder = ({ accessToken }) => {
  const [msg,setMsg] = useState("");
  const { folio } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    "Fund": "RMF",
    "Scheme": "ON",
    "Plan": "GP",
    "Options": "G",
    "AcNo": folio,
    "Amount": '',
    "TrType": "Lump+Sum",
    "SubBroker": "",
    "SubArnCode": "",
    "EUIN": "E493979",
    "EUINDecFlag": "Y",
    "ChqBank": "",
    "PayMode": "OTBM",
    "AppName": "Klarfin"
  });

  const [validationErrors, setValidationErrors] = useState<any>({});

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);



  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name == 'Scheme') {
      const data = schemes.find(each=>each.value == value);
      if(!data) return;
      setFormData((prevData) => ({
        ...prevData,
        Scheme: data.value,
        Plan: data.plan,
        Options: data.opt
      }));
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    console.log(formData)
    axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/create-order`, formData,
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
        if(formData.PayMode == 'NEFT') {
          navigate(`/dashboardAdmin/nippon-bank`)
          return;
        }
        navigate(`/dashboardAdmin/investment/details/${folio}`)
        
      }).catch(({ response }) => {
        setIsLoading(false);
        const { data } = response;
        setValidationErrors(data.validationErrors);
      })
  };

  const handleCloseSnackbar = () => {
    setIsFailure(false);
  };

  return (
    <div style={{ margin: "4rem" }}>
   
      <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
        <CardContent>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Create Order
            </Typography>
            <TextField
              label="Fund"
              name="Fund"
              value={formData.Fund}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.Fund}
              helperText={validationErrors.Fund}
              disabled
            />

            <TextField
              label="Scheme"
              name="Scheme"
              value={formData.Scheme}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.Scheme}
              helperText={validationErrors.Scheme}
              select
            >

              {
                schemes.map(each=>{
                 return <MenuItem key={each.value} defaultChecked value={each.value}>
                  {each.name}
                </MenuItem>
                })
              }
            </TextField>

            {/* <TextField
              label="Plan"
              name="Plan"
              value={formData.Plan}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.Plan}
              helperText={validationErrors.Plan}
            />

            <TextField
              label="Options"
              name="Options"
              value={formData.Options}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.Options}
              helperText={validationErrors.Options}
            /> */}

            <TextField
              label="Account Number"
              name="AcNo"
              value={formData.AcNo}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.AcNo}
              helperText={validationErrors.AcNo}
              disabled
            />

            <TextField
              label="Amount"
              name="Amount"
              value={formData.Amount}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.Amount}
              helperText={validationErrors.Amount}
            />

            {/* <TextField
              label="Transaction Type"
              name="TrType"
              value={formData.TrType}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.TrType}
              helperText={validationErrors.TrType}
            /> */}



            {/* <TextField
              label="SubBroker"
              name="SubBroker"
              value={formData.SubBroker}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.SubBroker}
              helperText={validationErrors.SubBroker}
            />

            <TextField
              label="SubArnCode"
              name="SubArnCode"
              value={formData.SubArnCode}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.SubArnCode}
              helperText={validationErrors.SubArnCode}
            />


            <TextField
              label="EUINDecFlag"
              name="EUINDecFlag"
              value={formData.EUINDecFlag}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.EUINDecFlag}
              helperText={validationErrors.EUINDecFlag}
            /> */}

            <TextField
              label="Cheque Bank"
              name="ChqBank"
              value={formData.ChqBank}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.ChqBank}
              helperText={validationErrors.ChqBank}
            />

            <TextField
              label="Payment Mode"
              name="PayMode"
              select
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              defaultValue="OTBM"
              error={!!validationErrors.PayMode}
              helperText={validationErrors.PayMode}
            >
              <MenuItem defaultChecked value="OTBM">
                OTBM
              </MenuItem>
              <MenuItem value="NEFT">
                NEFT
              </MenuItem>
            </TextField>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>
          </form>
        </CardContent>
        <Snackbar
          open={isSuccess}
          autoHideDuration={3000}
          onClose={() => setIsSuccess(false)}
          message="Order created successfully!"
          sx={{ marginBottom: 2 }}
        />
        <Snackbar
          open={isFailure}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          sx={{ marginBottom: 2 }}
          ><Alert severity='error' >{msg}</Alert></Snackbar>
      </Card>
    </div>
  );
};

export default CreateOrder;