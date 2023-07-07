import React, { useState } from 'react';
import { TextField, Button, MenuItem, CircularProgress,Alert, Snackbar, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const schemes = [
  {
    value: "ON",
    name: "OVERNIGHT FUND ( < 5 DAYS)",
    plan: "GP",
    opt: "G"
  },
  {
    value: "LF",
    name: "LIQUID FUND (5-15 DAYS)",
    plan: "IG",
    opt: "G"
  },
  {
    value: "LP",
    name: "LOW DURATION FUND (> 2 WEEKS)",
    plan: "RG",
    opt: "G"
  },
]

const CreateOrder = ({ accessToken }) => {
  const [msg,setMsg] = useState("");
  const { folio } = useParams();
  const navigate = useNavigate();

  const bankNames = [
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
    "TAMILNAD MERCANTILE BANK LTD",
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
  ];

  const [formData, setFormData] = useState({
    "Fund": "RMF",
    "Scheme": "LP",
    "Plan": "GP",
    "Options": "G",
    "AcNo": folio,
    "Amount": '',
    "TrType": "Lump+Sum",
    "SubBroker": "",
    "SubArnCode": "",
    "EUIN": "E493979",
    "EUINDecFlag": "Y",
    "ChqBank": "KOTAK MAHINDRA BANK LTD",
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
    console.log(formData)
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
          navigate(`/dashboardAdmin/nippon-bank/${folio}`)
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
              value="Nippon India"
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              // error={!!validationErrors.Fund}
              // helperText={validationErrors.Fund}
              disabled
            />

            <TextField
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
              defaultValue={bankNames[0]}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.ChqBank}
              helperText={validationErrors.ChqBank}
              select
            >
              {bankNames.map((ele,index)=>{
                return<MenuItem value={ele} defaultChecked key={index} >{ele}</MenuItem>
              })}
            </TextField>

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