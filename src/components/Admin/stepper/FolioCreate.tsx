import React, { useState } from 'react';
import { TextField, Button,Alert,MenuItem, CircularProgress, Snackbar, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { createFolio } from '../../../services/nippon.service';
import { format } from 'date-fns';

const Folio = ({ handleNext, accessToken, capturedData, capturedDataHandler }) => {
  //console.log(capturedData);
  const [message,setMessage] = useState("");
  const [isNomOpt, setIsNomOpt] = useState<boolean>(false);
  const relationArray = ["Father", "Mother", "Husband", "Wife", "Brother", "Sister"];
  const schemes = [
    {
      value: "LP",
      name: "LOW DURATION FUND ( > 2 WEEKS )",
      plan: "RG",
      opt: "G",
    },
    {
      value: "LF",
      name: "LIQUID FUND ( 5-15 DAYS )",
      plan: "IG",
      opt: "G",
    },
    {
      value: "ON",
      name: "OVERNIGHT FUND ( < 5 DAYS )",
      plan: "GP",
      opt: "G",
    },
  ];

  const [formData, setFormData] = useState({
    pan: capturedData.pan,
    scheme: 'LF',
    plan: 'IG',
    option: 'G',
    email:"",
    mobile:"",
    // email: capturedData.invtorInf[0],
    // mobile:capturedData.invtorInf[1].toString(),
    dob: '23/11/1991',
    RI: 'Y',
    PEP: 'N',
    RPEP: 'N',
    PTI: 'Y',
    BII: 'Y',
    TAX: 'INDIVIDUAL',
    OCCUP: 3,
    INCOME: '1-5L',
    IFSC: '',
    ACTYPE: 'SAVINGS',
    ACNUM: '',
    deviceid: 'PARTNERAPI',
    appVersion: '1.0.1',
    appName: 'Klarfin',
    ResponseURL: 'https://www.iifl.com/response?responseid=1234',
    BypassURL: 'Y',
    pincode: '',
    inv_id: capturedData.inv_id,
    isNomOpt:"NO",
    NomName: "",
    NomAdd1: "",
    NomCity: "",
    NomState: "",
    NomPin: "",
    NomRel: "",
    Nom1Per:"100"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [validationErrors, setValidationErrors] = useState<any>({});

  const dateConverter = (str) =>{
    var date = new Date(str);
    var mnth = ("0" + (date.getMonth()+1)).slice(-2);
    var day  = ("0" + date.getDate()).slice(-2);
    var year = date.getFullYear();
    return `${day}/${mnth}/${year}`;
 }

 const handleChange = event => {
  let {name, value} = event.target;
  if (name == "dob") {
    const date = dateConverter(value);
    value = date;
  }
  if(name=="scheme"){
    const data = schemes.find((each)=>each.value == value);
    if(!data) return;
    setFormData({...formData,plan:data.plan,scheme:data.value});
  }
  if(name=="isNomOpt"){
    if( value == "YES") setIsNomOpt(true);
    if( value == "NO") setIsNomOpt(false);
  }
  setFormData(prevData => ({
    ...prevData,
    [name]: value,
  }));
};

  const handleSubmit = async (event) => {
    event.preventDefault();

    setValidationErrors({});
    setIsLoading(true);
    console.log(formData);
    axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/folio`, formData,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          inv_id: capturedData.inv_id
        }
      }).then(res => {
        // navigate(`/dashboardSuper/investment`)
        const { data } = res;
        setIsLoading(false);
        if (!data.succ){
          setMessage(data.message)
          setIsFailure(true)
          return;
        }
        capturedDataHandler('folio', data.folio)
        handleNext();
      }).catch(({ response }) => {
        setIsLoading(false);
        setIsFailure(true)
        const { data } = response;
        setValidationErrors(data.validationErrors);
      })


  };

  const handleCloseSnackbar = () => {
    setIsFailure(false);
  };

  return (
    <Card sx={{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
        <form onSubmit={handleSubmit} style={{width: "100%"}}>
          <Typography variant="subtitle1" gutterBottom>
            Create Folio
          </Typography>
          <TextField
            label="PAN"
            name="pan"
            value={capturedData.pan}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.pan} // Check if the field has an error
            helperText={validationErrors.pan} // Display the error message
            disabled
          />

          <TextField
              label="Scheme"
              name="scheme"
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
                return <MenuItem value={ele.value} defaultChecked key={ele.value}>{ele.name}</MenuItem>
              })}
            </TextField>
{/* 
          <TextField
            label="Scheme"
            name="scheme"
            value={formData.scheme}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.scheme} // Check if the field has an error
            helperText={validationErrors.scheme} // Display the error message
          />

          <TextField
            label="Plan"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.plan} // Check if the field has an error
            helperText={validationErrors.plan} // Display the error message
          /> */}

          <TextField
            label="Option"
            name="option"
            value={formData.option}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.option} // Check if the field has an error
            helperText={validationErrors.option} // Display the error message
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.email} // Check if the field has an error
            helperText={validationErrors.email} // Display the error message
          />

          <TextField
            label="Mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.mobile} // Check if the field has an error
            helperText={validationErrors.mobile} // Display the error message
          />

          <TextField
            label="Date of Birth"
            type="date"
            name="dob"
            //value={formData.dob}
            onChange={handleChange}
            variant="standard"
            margin="normal"
            fullWidth
            error={!!validationErrors.dob} // Check if the field has an error
            helperText={validationErrors.dob} // Display the error message
            focused
          />

          <TextField
            label="Pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.pincode} // Check if the field has an error
            helperText={validationErrors.pincode} // Display the error message
          />
          <TextField 
          label="NOMINEE OPTION"
          name="isNomOpt"
          value={formData.isNomOpt}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
          select
          >
            {
                ["YES","NO"].map(each=>{
                 return <MenuItem key={each} defaultChecked value={each}>
                  {each}
                </MenuItem>
                })
              }
          </TextField>
          {isNomOpt && (
            <>
              <TextField
                label="Nominee Name"
                name="NomName"
                value={formData.NomName}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.NomName} // Check if the field has an error
                helperText={validationErrors.NomName} // Display the error message
              />
              <TextField
                label="Nominee Address"
                name="NomAdd1"
                value={formData.NomAdd1}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.NomAdd1} // Check if the field has an error
                helperText={validationErrors.NomAdd1} // Display the error message
              />
              
              <TextField
                label="Nominee City"
                name="NomCity"
                value={formData.NomCity}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.NomCity} // Check if the field has an error
                helperText={validationErrors.NomCity} // Display the error message
              />
              <TextField
                label="Nominee State"
                name="NomState"
                value={formData.NomState}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.NomState} // Check if the field has an error
                helperText={validationErrors.NomState} // Display the error message
              />
              <TextField
                label="Nominee Pincode"
                name="NomPin"
                value={formData.NomPin}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.NomPin} // Check if the field has an error
                helperText={validationErrors.NomPin} // Display the error message
              />
              <TextField
                label="Nominee Relation"
                name="NomRel"
                value={formData.NomRel}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                select
                error={!!validationErrors.NomRel} // Check if the field has an error
                helperText={validationErrors.NomRel} // Display the error message
              >
                {
                  relationArray.map((ele,idx)=>{
                    return <MenuItem key={idx} value={ele} > {ele} </MenuItem>
                  })
                }
              </TextField>
            </>
          )}

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            fullWidth
            sx={{marginTop: 2}}
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
        message="PAN submitted successfully!"
        sx={{marginBottom: 2}}
      />
      <Snackbar
        open={isFailure}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        sx={{marginBottom: 2}}
      >
        <Alert severity="error">{message}</Alert>
      </Snackbar>
    </Card>
  );
};

export default Folio;