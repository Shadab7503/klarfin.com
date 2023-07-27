import React from 'react'
import { TextField, Button, Alert, CircularProgress, Snackbar, Card, CardContent, Typography, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

function InvestmentForm({ capturedDataHandler,capturedData ,accessToken, handleNext }) {
  const [isConfirm, setisConfirm] = useState(false);
  const [message, setMessage] = useState("");

  const BranchContry = [{ code: "IND", title: "INDIA" }];
  const BankName = [{code:"HDF" , title:"HDFC BANK LTD"}]
  const AccTypes = [{ code: "SB", title: "SAVINGS" }, { code: "CA", title: 'CURRENT' }];
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
  const [existInvester, setExitInvester] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [users, setUsers] = useState<any>({});
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
            setUsers({ ...response.data.admin[0] });
            capturedDataHandler("user_id",response.data.admin[0].id)
            console.log({ ...response.data.admin[0] })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    getAdmins()
  }, [])


  const handleChange = (event) => {
    const { name, value } = event.target;
    capturedDataHandler(name,value);
  };

  const handleCloseSnackbar = () => {
    setIsFailure(false);
  };

  const saveHandler = (e) => {
    e.preventDefault();
    console.log(capturedData)
    setValidationErrors({});
    setIsLoading(true);
    //console.log(capturedData)
    if (capturedData.ACNUM != capturedData.CONMACNUM) {
      setIsLoading(false);
      setisConfirm(true);
      return;
    } else {
      console.log("capturedData : ",capturedData)
      axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/invest`, capturedData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
        .then(res => {
          const { data } = res;
          console.log(data)
          // navigate(`/dashboardSuper/investment`)
          setIsLoading(false);
          if (!data.succ) {
            if (data.public_msg == "Investor Already Exist") {
              setExitInvester(true);
              return;
            }
          }
          capturedDataHandler([
            { inv_id: data.invData.id },
            { pan: data.invData.pan },
          ]);
          handleNext();
        })
        .catch(({ response }) => {
          setIsLoading(false);
          setIsFailure(true);
          response?.data && setValidationErrors(response.data.validationErrors);
        });
    }
  }

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto" }}>
      <CardContent>
        <form onSubmit={saveHandler} style={{ width: "100%" }}>
          <Typography variant="subtitle1" gutterBottom>
            Investment
          </Typography>

          <TextField
            label="Investor"
            //onChange={handleChange}
            focused
            value={users.name}
            name="user_id"
            autoComplete='off'
            required
            //select
            variant="outlined"
            margin="normal"
            fullWidth
          //error={!!validationErrors.user_id} // Check if the field has an error
          //helperText={validationErrors.user_id} // Display the error message
          >
            {/* {users.map(option => (
            <MenuItem key={option.apiKey} value={option.id}>
              {`${option.name}  (${option.email})`}
            </MenuItem>
          ))} */}
          </TextField>

          <TextField
            label="Type"
            onChange={handleChange}
            name="type"
            required
            select
            defaultValue={users[0]?.companyName}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.ACTYPE} // Check if the field has an error
            helperText={validationErrors.ACTYPE} // Display the error message
          >
            <MenuItem key="org name" value={0}>
              Individual
            </MenuItem>
            <MenuItem key="Proprietorship" value={1}>
              Proprietorship
            </MenuItem>
            <MenuItem key="Partnership" value={2}>
              Partnership
            </MenuItem>
            <MenuItem key="Proprietorship" value={3}>
              Company
            </MenuItem>
          </TextField>
          <TextField
            label="Pan Number"
            name="pan"
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            error={!!validationErrors.PAN}
            helperText={validationErrors.PAN}
          ></TextField>
           <TextField
            label="Bank Name"
            name="BANK"
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            select
            required
            error={!!validationErrors.BANK}
            helperText={validationErrors.BANK}
          >
            {BankName.map((ele,indx)=>{
              return <MenuItem key={indx} value={ele.code} >{ele.title}</MenuItem>
            })}
          </TextField>

          <TextField
            label="IFSC"
            name="IFSC"
            value={capturedData.IFSC}
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
            label="Branch Name"
            name="branch_name"
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            error={!!validationErrors.branch_name}
            helperText={validationErrors.branch_name}
          ></TextField>
          <TextField
            label="Branch Address"
            name="branch_addr1"
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            error={!!validationErrors.branch_addr1}
            helperText={validationErrors.branch_addr1}
          ></TextField>
          <TextField
            label="Branch City"
            name="branch_city"
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            error={!!validationErrors.branch_city}
            helperText={validationErrors.branch_city}
          ></TextField>
          <TextField
            label="Branch Contry"
            name="branch_contry"
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            select
            required
            error={!!validationErrors.branch_contry}
            helperText={validationErrors.branch_contry}
          >
            {BranchContry.map((ele,indx)=>{
              return <MenuItem key={indx} value={ele.code} >{ele.title}</MenuItem>
            })}
          </TextField>
          <TextField
            label="Branch Pincode"
            name="branch_pincode"
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
            error={!!validationErrors.branch_pincode}
            helperText={validationErrors.branch_pincode}
          ></TextField>

          <TextField
            label="Account Type"
            onChange={handleChange}
            name="ACTYPE"
            required
            select
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.ACTYPE} // Check if the field has an error
            helperText={validationErrors.ACTYPE} // Display the error message
          >
            {AccTypes.map((each, idx) => (
              <MenuItem key={idx} value={each.code}>
                {each.title}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Account Number"
            name="ACNUM"
            value={capturedData.ACNUM}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            type='password'
            error={!!validationErrors.ACNUM} // Check if the field has an error
            helperText={validationErrors.ACNUM} // Display the error message
            required
            onPaste={e => {
              e.preventDefault();
            }}
            autoComplete="off"
          />
          <TextField
            label="Confirm Account Number"
            name="CONMACNUM"
            value={capturedData.CONMACNUM}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.CONMACNUM} // Check if the field has an error
            helperText={validationErrors.CONMACNUM} // Display the error message
            required
            onPaste={e => {
              e.preventDefault();
            }}
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
        message="Investment submitted successfully!"
        sx={{ marginBottom: 2 }}
      />
      <Snackbar
        open={isConfirm}
        autoHideDuration={3000}
        onClose={() => setisConfirm(false)}
        sx={{ marginBottom: 2 }}
      >
        <Alert severity="error">Please Enter Same Account Number</Alert>
      </Snackbar>
      <Snackbar
        open={existInvester}
        autoHideDuration={3000}
        onClose={() => setExitInvester(false)}
        sx={{ marginBottom: 2 }}
      >
        <Alert severity="warning" sx={{ width: "100%" }} className="snack">
          Investor Already Exist !
        </Alert>
      </Snackbar>

      <Snackbar
        open={isFailure}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        sx={{ marginBottom: 2 }}
      >
        <Alert severity='error' >Investment Not Created ,Please Try Again</Alert>
      </Snackbar>
    </Card>
  )
}

export default InvestmentForm