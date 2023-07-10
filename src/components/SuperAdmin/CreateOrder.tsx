import React, { useEffect, useState } from 'react';
import { TextField, Button,MenuItem, CircularProgress, Snackbar, Alert,Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateOrder = ({ accessToken }) => {
  const { folio } = useParams();
  const navigate = useNavigate();
  const [pan,setPan] = useState();
  const [msg,setMsg] = useState("");

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

  const bankNames = [
    "--SELECT--",
    "KOTAK MAHINDRA BANK LTD",
    "YES BANK",
    "IDFC FIRST BANK LTD",
    "PUNJAB NATIONAL BANK",
    "INDUSIND BANK",
    "ICICI BANK LTD",
    "EQUITAS SMALL FINANCE BANK LTD",
    "SOUTH INDIAN BANK",
    "HDFC BANK LTD",
    "RBL BANK LIMITED",
    "BANK OF MAHARASHTRA",
    "DEUTSCHE BANK AG",
    "FEDERAL BANK",
    "KARNATAKA BANK LTD",
    "STATE BANK OF INDIA",
    "DHANALAXMI BANK",
    "AXIS BANK",
    "BANK OF BARODA",
    "CSB BANK LTD",
    "STANDARD CHARTERED BANK",
    "UNION BANK OF INDIA",
    "CANARA BANK",
    "IDBI BANK",
    "CITY UNION BANK LTD",
    "THE HONGKONG AND SHANGHAI BANKING CORPORATION LTD",
    "KARUR VYSA BANK",
    "BANDHAN BANK LTD",
    "INDIAN BANK",
    "AU SMALL FINANCE BANK",  
    "CITI BANK",
    "BANK OF INDIA"
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
    if(name=="Scheme"){
      const data = schemes.find((each)=>each.value == value);
      if(!data) return;
      setFormData({...formData,Plan:data.plan,Scheme:data.value});
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
    // return;
    axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/super/create-order`, formData,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(res => {
        setIsLoading(false);
        const {data} = res;
        if(!data.succ){
          setIsLoading(false)
          setIsFailure(true);
          setMsg(data.message)
          return;
        }
        setMsg(data.message);
        setIsSuccess(true);
        setTimeout(() => {
          navigate(`/dashboardSuper/investment/details/${folio}`)
        }, 2000);
      }).catch(({ response }) => {
        setIsLoading(false);
        const { data } = response;
        setValidationErrors(data.validationErrors);
      })
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}v1/super/folio`, {
        headers: {Authorization: `Bearer ${accessToken}`},
        params: {
          folio: folio,
        },
      })
      .then(({data}) => {
        console.log(data.pan);
        setPan(data.pan);
        setIsLoading(false);
      });
  },[]);




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
              onChange={handleChange}
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
              {schemes.map((ele)=>{
                return <MenuItem value={ele.value}  key={ele.value}>{ele.name}</MenuItem>
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
              defaultValue={bankNames[0]}
              variant="outlined"
              margin="normal"
              fullWidth
              select
              error={!!validationErrors.ChqBank}
              helperText={validationErrors.ChqBank}
            >
              {bankNames.map((ele,index)=>{
                return<MenuItem value={ele}  key={index} >{ele}</MenuItem>
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
              <MenuItem  value="NEFT">
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