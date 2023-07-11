import React, { useEffect, useState } from 'react';
import { TextField, Button, CircularProgress, Snackbar, Card, CardContent, Typography, MenuItem } from '@mui/material';
import axios from 'axios';
import { Alert } from '../../../utils/components';

const Investment = ({ handleNext, accessToken, capturedDataHandler }) => {
  const [formData, setFormData] = useState({
    IFSC: '',
    ACTYPE: 'SAVINGS',
    ACNUM: '',
    BANK:'',
  });

  const AccTypes = ['SAVINGS', 'CURRENT'];
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [existInvester,setExitInvester] = useState(false);
  const [isFailure, setIsFailure] = useState(false);


  const [users, setUsers] = useState<any>([]);
  const [funds, setFunds] = useState<any>([]);

  const [validationErrors, setValidationErrors] = useState<any>({});

  const getAdmins = () => {
    if (accessToken) {
      axios
        .get(
          process.env.REACT_APP_BACKEND_HOST + "v1/user/investment/get-admin",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          if (
            "message" in response.data &&
            response.data.message === "Admin"
          ) {
            setUsers([...response.data.admin]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const getFunds = () => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_HOST + "v1/user/investment/funds",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (
          response.data.succ
        ) {
          setFunds([...response.data.funds]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAdmins()
    getFunds()
  }, [])


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCloseSnackbar = () => {
    setIsFailure(false);
  };

  const saveHandler = (e) => {
    e.preventDefault();
    setValidationErrors({});

    setIsLoading(true);
    //console.log(formData)
    axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/invest`, formData,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(res => {
        const { data } = res;
        //console.log(data);
        setIsLoading(false);
        if (!data.succ) {
          if(data.public_msg == "Investor Already Exist"){
            setExitInvester(true);
            return;
          }
        };
        capturedDataHandler([{ inv_id: data.invData.id }, { pan: data.invData.pan }]);
        handleNext()
      }).catch(({ response }) => {
        setIsLoading(false);
        const { data } = response;
        setValidationErrors(data.validationErrors);
      })

  }

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
      <CardContent>
        
        <form onSubmit={saveHandler} style={{ width: '100%' }}>
          <Typography variant="subtitle1" gutterBottom>
            Investment
          </Typography>

          <TextField
            label="Investor"

            onChange={handleChange}
            value={formData['user_id']}
            name='user_id'
            required
            select
            defaultValue={users[0]?.name}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.user_id} // Check if the field has an error
            helperText={validationErrors.user_id} // Display the error message
          >
            {users.map((option) => (
              <MenuItem key={option.apiKey} value={option.id}>
                {`${option.name} (${option.email})`}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Type"
            onChange={handleChange}
            name='type'
            required
            select
            defaultValue={users[0]?.companyName}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.type} // Check if the field has an error
            helperText={validationErrors.type} // Display the error message
          >
            <MenuItem key='org name' value={0}>
              Individual
            </MenuItem>
            <MenuItem key='Proprietorship' value={1}>
              Proprietorship
            </MenuItem>
            <MenuItem key='Partnership' value={2}>
            Partnership
            </MenuItem>
            <MenuItem key='Proprietorship' value={3}>
            Company
            </MenuItem>

          </TextField>

          <TextField
            label="Fund"

            onChange={handleChange}
            name='fund_id'
            required
            select
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.fund_id} // Check if the field has an error
            helperText={validationErrors.fund_id} // Display the error message
          >
            {funds.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Bank Name"
            name="BANK"
            onChange={handleChange}
            defaultValue={bankNames[0]}
            variant="outlined"
            margin="normal"
            fullWidth
            select
            error={!!validationErrors.BANK}
            helperText={validationErrors.BANK}
          >
            {bankNames.map((ele, index) => {
              return <MenuItem value={ele} key={index} >{ele}</MenuItem>
            })}
          </TextField>

          <TextField
            label="IFSC"
            name="IFSC"
            value={formData.IFSC}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.IFSC} // Check if the field has an error
            helperText={validationErrors.IFSC} // Display the error message
            required
            // onPaste={(e)=>{e.preventDefault()}}
            autoComplete="off"
          />


          <TextField
            label="Account Type"
            onChange={handleChange}
            name='ACTYPE'
            required
            select
            variant="outlined"
            margin="normal"
            fullWidth
            defaultValue="SAVINGS"
            error={!!validationErrors.ACTYPE} // Check if the field has an error
            helperText={validationErrors.ACTYPE} // Display the error message
            
          >
            {AccTypes.map((each) => (
              <MenuItem key={each} value={each}>
                {each}
              </MenuItem>
            ))}
          </TextField>


          <TextField
            label="Account Number"
            name="ACNUM"
            value={formData.ACNUM}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.ACNUM} // Check if the field has an error
            helperText={validationErrors.ACNUM} // Display the error message
            required
            onPaste={(e)=>{e.preventDefault()}}
            autoComplete="off"
          />


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
        message="Investment submitted successfully!"
        sx={{ marginBottom: 2 }}
      />
      <Snackbar
        open={existInvester}
        autoHideDuration={3000}
        onClose={() => setExitInvester(false)}
        message=""
        sx={{ marginBottom: 2 }}
      >
        <Alert
            severity="warning"
            sx={{ width: "100%" }}
            className="snack"
          >
            Investment Already Exist!
          </Alert>
      </Snackbar>
      
      <Snackbar
        open={isFailure}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Failed to submit Investment. Please try again."
        sx={{ marginBottom: 2 }}
      />
    </Card>
  );
};

export default Investment;