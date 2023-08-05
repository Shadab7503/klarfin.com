import React, { useState } from 'react';
import { TextField, Button, MenuItem, CircularProgress, Alert, Snackbar, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';



const schemes = [
  {
    value: "LP",
    name: "LOW DURATION FUND (> 2 WEEKS)",
    plan: "IG",
    opt: "G"
  },
  {
    value: "LF",
    name: "LIQUID FUND (5-15 DAYS)",
    plan: "IG",
    opt: "G"
  },
  {
    value: "ON",
    name: "OVERNIGHT FUND ( < 5 DAYS)",
    plan: "GP",
    opt: "G"
  },

]

const CreateOrderNippon = ({ accessToken }) => {
  const { state }: any = useLocation();
  console.log("state", state);
  const [msg, setMsg] = React.useState("");
  const { folio }: any = useParams();
  const navigate = useNavigate();

  const bankNames = [
    "--SELECT--",
    "AU SMALL FINANCE BANK",
    "AXIS BANK",
    "BANDHAN BANK LTD",
    "BANK OF BARODA",
    "BANK OF INDIA",
    "BANK OF MAHARASHTRA",
    "CANARA BANK",
    "CITI BANK",
    "CITY UNION BANK LTD",
    "CSB BANK LTD",
    "DEUTSCHE BANK AG",
    "DHANALAXMI BANK",
    "EQUITAS SMALL FINANCE BANK LTD",
    "FEDERAL BANK",
    "HDFC BANK LTD",
    "IDBI BANK",
    "IDFC FIRST BANK LTD",
    "ICICI BANK LTD",
    "INDIAN BANK",
    "INDUSIND BANK",
    "KARUR VYSA BANK",
    "KARNATAKA BANK LTD",
    "KOTAK MAHINDRA BANK LTD",
    "PUNJAB NATIONAL BANK",
    "RBL BANK LIMITED",
    "SOUTH INDIAN BANK",
    "STATE BANK OF INDIA",
    "STANDARD CHARTERED BANK",
    "THE HONGKONG AND SHANGHAI BANKING CORPORATION LTD",
    "UNION BANK OF INDIA",
    "YES BANK"
  ];

  const Funds = [
    { key: "RMF", name: "Nippon India Mutual Fund" },
  ];

  const [formData, setFormData] = useState({
    "Fund": "RMF",
    "Scheme": "LP",
    "Plan": "IG",
    "Options": "G",
    "AcNo": folio,
    "Amount": '',
    "TrType": "Lump+Sum",
    "SubBroker": "",
    "SubArnCode": "",
    "EUIN": "E493979",
    "EUINDecFlag": "Y",
    "ChqBank": (state.BANK ? state.BANK : " "),
    "PayMode": "",
    "AppName": "Klarfin",
    "fundType": "Nippon India",
  });

  const [validationErrors, setValidationErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name == 'Scheme') {
      const data = schemes.find(each => each.value == value);
      if (!data) return;
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
    console.log("formData :",formData);
    setIsLoading(true);
    if (formData.PayMode == "NEFT") {
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
          setIsSuccess(true);
          setMsg(`Order submitted successfully for Rs ${formData.Amount ? formData.Amount : data.order.Amt}`)
          setTimeout(() => {
            if (formData.PayMode == 'NEFT') {
              navigate(`/dashboardAdmin/nippon-bank/${folio}`, { state: state })
              return;
            }
          }, 3000)

        }).catch(({ response }) => {
          setIsLoading(false);
          const { data } = response;
          //setValidationErrors(data.validationErrors);
        })
    } else if (formData.PayMode == "OTBM") {

      axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/creatotbmotp`, formData,
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
          setIsSuccess(true);
          setMsg(`OTP sent to ${state.user_id.email}`)
          setIsLoading(false);
          //axios.post('url',{data},{header}).then((res)=>{})
          setTimeout(() => {
            navigate(`/dashboardAdmin/investment/create-order-otp/${folio}`, { state: { state, formData } })
          }, 5000);
          return;
        }).catch(({ response }) => {
          setIsLoading(false);
          const { data } = response;
          setValidationErrors(data.validationErrors);
          return;
        })
      //navigate(`/dashboardAdmin/investment/details/${folio}`)
    }
    if (formData.PayMode == "") {
      setIsLoading(false);
      setMsg("Please select PayMode");
      setIsFailure(true);
      return;
    }
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
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              defaultValue={formData.Fund}
              select
              required
              disabled
              error={!!validationErrors.Fund}
              helperText={validationErrors.Fund}
            >
              {
                Funds.map((ele, idx) => {
                  return <MenuItem key={idx} value={ele.key} >{ele.name}</MenuItem>
                })
              }
            </TextField>
            <TextField
              label="Your Bank"
              name="ChqBank"
              value={formData.ChqBank}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={!!validationErrors.ChqBank}
              helperText={validationErrors.ChqBank}
              disabled
            >
              {/* {bankNames.map((ele, index) => {
                return <MenuItem value={ele} defaultChecked key={index} >{ele}</MenuItem>
              })} */}
            </TextField>

            <TextField
              label="Scheme"
              name="Scheme"
              value={formData.Scheme}
              onChange={handleChange}
              defaultValue={schemes[0].value}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              error={!!validationErrors.Scheme}
              helperText={validationErrors.Scheme}
              select
            >
              {
                schemes.map(each => {
                  return <MenuItem key={each.value} defaultChecked value={each.value}>
                    {each.name}
                  </MenuItem>
                })
              }
            </TextField>
            <TextField
              label="Amount"
              name="Amount"
              value={formData.Amount}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              required
              error={!!validationErrors.Amount}
              helperText={validationErrors.Amount}
            />

            <TextField
              label="Payment Mode"
              name="PayMode"
              select
              required
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.PayMode}
              helperText={validationErrors.PayMode}
            >
              <MenuItem defaultChecked value="OTBM">
                Auto Debit
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
          sx={{ marginBottom: 2 }}
        >
          <Alert severity='success' >{msg}</Alert>
        </Snackbar>
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

export default CreateOrderNippon;