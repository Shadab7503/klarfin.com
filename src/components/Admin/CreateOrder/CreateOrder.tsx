import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, CircularProgress, Alert, Snackbar, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { url } from 'inspector';
import FormNippon from './FormNippon';
import FormNSE from './FormNSE';


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

const CreateOrder = ({ accessToken }) => {
  const { state }: any = useLocation();
  const [msg, setMsg] = useState("");
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

  const Funds = [{ key: "RMF", name: "Nippon India" }, { key: "NSE", name: "NSE" }];

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
    "fundType":"",
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
    console.log(formData);
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
        setMsg(`Order submitted successfully for Rs ${formData.Amount?formData.Amount:data.order.Amt}`)
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
      if(formData.PayMode==""){
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
              name="fundType"
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              select
              required
            //error={!!validationErrors.Fund}
            //helperText={validationErrors.Fund}
            >
              {
                Funds.map((ele, idx) => {
                  return <MenuItem key={idx} value={ele.name} defaultValue={ele.key} >{ele.name}</MenuItem>
                })
              }
            </TextField>
            {
              formData.fundType == "Nippon India" && <FormNippon schemes={schemes} formData={formData} setCaptureData={handleChange} />
            }
            {
              formData.fundType == "NSE" && <FormNSE formData={formData} setCaptureData={handleChange} setFormData={setFormData} />
            }

            {/* <TextField
              label="Your Bank"
              name="ChqBank"
              value={formData.ChqBank}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.ChqBank}
              helperText={validationErrors.ChqBank}
              disabled
              required
            >
              {bankNames.map((ele, index) => {
                return <MenuItem value={ele} defaultChecked key={index} >{ele}</MenuItem>
              })}
            </TextField> */}

            {/* <TextField
              label="Scheme"
              name="Scheme"
              value={formData.Scheme}
              onChange={handleChange}
              defaultValue={schemes[0].value}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.Scheme}
              helperText={validationErrors.Scheme}
              select
              required
            >
              {
                schemes.map(each => {
                  return <MenuItem key={each.value} defaultChecked value={each.value}>
                    {each.name}
                  </MenuItem>
                })
              }
            </TextField> */}

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

            {/* <TextField
              label="Folio Number"
              name="AcNo"
              value={formData.AcNo}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.AcNo}
              helperText={validationErrors.AcNo}
              disabled
            /> */}

            {/* <TextField
              label="Amount"
              name="Amount"
              value={formData.Amount}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.Amount}
              helperText={validationErrors.Amount}
            /> */}

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

            {/* <TextField
              label="Payment Mode"
              name="PayMode"
              select
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.PayMode}
              helperText={validationErrors.PayMode}
              required
            >
              <MenuItem defaultChecked value="OTBM">
                Auto Debit
              </MenuItem>
              <MenuItem value="NEFT">
                NEFT
              </MenuItem>
            </TextField> */}
            { formData.fundType !==""&& <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={isLoading}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
            </Button>}
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

export default CreateOrder;