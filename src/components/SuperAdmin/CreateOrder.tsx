import React, { useEffect, useState } from 'react';
import { TextField, Button, MenuItem, CircularProgress, Snackbar, Alert, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const CreateOrder = ({ accessToken }) => {
  const { folio } = useParams();
  const { state }:any = useLocation()
  const navigate = useNavigate();
  const [pan, setPan] = useState();
  const [msg, setMsg] = useState("");

  const schemes = [
    {
      value: "LP",
      name: "LOW DURATION FUND ( > 2 WEEKS )",
      plan: "RG",
      opt: "G",
    },
    {
      value: "ON",
      name: "OVERNIGHT FUND ( < 5 DAYS )",
      plan: "GP",
      opt: "G",
    },
    {
      value: "LF",
      name: "LIQUID FUND ( 5-15 DAYS )",
      plan: "IG",
      opt: "G",
    },

  ];
  console.log("state",state);
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
  const [formData, setFormData] = useState({
    "Fund": "RMF",
    "Scheme": "LP",
    "Plan": "RG",
    "Options": "G",
    "AcNo": folio,
    "Amount": '',
    "TrType": "Lump+Sum",
    "SubBroker": "",
    "SubArnCode": "",
    "EUIN": "E493979",
    "EUINDecFlag": "Y",
    "ChqBank": (state.BANK ? state.BANK : " "),
    "PayMode": "OTBM",
    "AppName": "Klarfin"
  });

  const [validationErrors, setValidationErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name == "Scheme") {
      const data = schemes.find((each) => each.value == value);
      if (!data) return;
      setFormData({ ...formData, Plan: data.plan, Scheme: data.value });
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
   

    if (formData.PayMode == "NEFT") {
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
            navigate(`/dashboardSuper/investment/details/${folio}`)
          }, 2000);

        }).catch(({ response }) => {
          setIsLoading(false);
          const { data } = response;
          setValidationErrors(data.validationErrors);
        })
    } else if (formData.PayMode == "OTBM") {
      if (Number(formData.Amount) < 5000) {
        setIsLoading(false);
        setIsFailure(true);
        setMsg("Minimum Amount is : 5000.00")
        return
      }
      axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/super/creatotbmotp`, formData,
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
          setMsg(`OTP is sending to ${process.env.REACT_APP_SUPERADMIN_EMAIL}`)
          setIsLoading(false);
          //axios.post('url',{data},{header}).then((res)=>{})
          setTimeout(() => {
            navigate(`/dashboardSuper/investment/create-order-otp/${folio}`, { state: { state, formData } })
          }, 4000);
          return;
        }).catch(({ response }) => {
          setIsLoading(false);
          const { data } = response;
          setValidationErrors(data.validationErrors);
          return;
        })

      //navigate(`/dashboardAdmin/investment/details/${folio}`)
    }
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}v1/super/folio`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          folio: folio,
        },
      })
      .then(({ data }) => {
        setPan(data.pan);
        setIsLoading(false);
      });
  }, []);


  const handleCloseSnackbar = () => {
    setIsFailure(false);
    setIsSuccess(false)
  };

  return (
    <div style={{ margin: "4rem" }}>
      <Card>
        <CardContent>
          <h2>Nippon Bank Details </h2>
          <Typography variant="h6" gutterBottom>
            Beneficiary Account Number
          </Typography>
          <Typography variant="body1">
            {`2203${pan}`}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Beneficiary Bank IFSC code
          </Typography>
          <Typography variant="body1">
            ICIC0000104
          </Typography>

          <Typography variant="h6" gutterBottom>
            Beneficiary Bank Name
          </Typography>
          <Typography variant="body1">
            ICICI Bank
          </Typography>
          <Typography variant="h6">
            Type of Account
          </Typography>
          <Typography variant="body1" gutterBottom>
            Current Account
          </Typography>
          <Typography variant="h6" gutterBottom>
            Beneficiary Name
          </Typography>
          <Typography variant="body1">
            NIPPON INDIA MUTUAL FUND VIRTUAL POOL ACCOUNT
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
        <CardContent>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
              Create Order
            </Typography>
            <TextField
              label="Fund"
              name="Fund"
              value="Nippon India"
              //onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.Fund}
              helperText={validationErrors.Fund}
            />

            <TextField
              label="Scheme"
              name="Scheme"
              onChange={handleChange}
              defaultValue={schemes[0].value}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.Scheme}
              helperText={validationErrors.Scheme}
              select
            >
              {schemes.map((ele) => {
                return <MenuItem value={ele.value} key={ele.value}>{ele.name}</MenuItem>
              })}
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
            /> */}

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
            />

            <TextField
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

            <TextField
              label="Transaction Type"
              name="TrType"
              value={formData.TrType}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.TrType}
              helperText={validationErrors.TrType}
            />



            {/*             <TextField
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
              label="Select Cheque Bank"
              name="ChqBank"
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              select
              error={!!validationErrors.ChqBank}
              helperText={validationErrors.ChqBank}
              required
            >
              {bankNames.map((ele, index) => {
                return <MenuItem value={ele} key={index} >{ele}</MenuItem>
              })}
            </TextField>

            <TextField
              label="Payment Mode"
              name="PayMode"
              select
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              defaultValue="OTBM"
              fullWidth
              error={!!validationErrors.PayMode}
              helperText={validationErrors.PayMode}
            >
              <MenuItem value="OTBM">
                OTBM (One Time Bank Mandate)
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
          onClose={handleCloseSnackbar}
          sx={{ marginBottom: 2 }}
        ><Alert severity='success' >{msg}</Alert></Snackbar>
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