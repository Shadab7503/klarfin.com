import React, { useEffect, useState } from 'react';
import { TextField, Button, CircularProgress, Snackbar, Card, CardContent, Typography, MenuItem } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Investment = ({ accessToken }) => {
  const AccTypes = ['SAVINGS', 'CURRENT'];

  const [formData, setFormData] = useState({
    ACNUM: "",
    ACTYPE: "",
    IFSC: "",
    fund_id: "",
    type: 1,
    user_id:''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);


  const [users, setUsers] = useState<any>([]);
  const [funds, setFunds] = useState<any>([]);
  const [validationErrors, setValidationErrors] = useState<any>({});



  const { id } = useParams();

  const getAdmins = async () => {


    if (accessToken) {
      return await axios
        .get(
          process.env.REACT_APP_BACKEND_HOST + "v1/super/get-all-un-approved",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        )
        .then((response) => {
          if (
            "message" in response.data &&
            response.data.message === "UnApproved Admin"
          ) {

            setUsers([...response.data.admin]);


          }


        })
        .catch((err) => {
          console.log(err);

        });
    }
  }

  const getFunds = async () => {



    return await axios
      .get(
        process.env.REACT_APP_BACKEND_HOST + "v1/super/funds",
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



  const getInvestmentData = async () => {

    return await axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}v1/super/single-investment`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          params: {
            id: id
          }
        })
      .then((res) => {
        const { investment } = res.data;
        if (!investment) return;

        const senitizedData = {};
        const validKeys = Object.keys(formData);
        Object.keys(investment).forEach(key=>{

          if(!validKeys.includes(key)) return;
          senitizedData[key] = investment[key];
        
        })
        // @ts-ignore
        setFormData(senitizedData);


      });

  }


  const getFullData = async () => {

    setIsLoading(true)

    await Promise.all([
      getInvestmentData(),
      getAdmins(),
      getFunds()
    ])

    setIsLoading(false)
  }

  useEffect(() => {


    getFullData();


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

  const updateHandler = (e) => {
    e.preventDefault();
    setValidationErrors({});

    axios
      .patch(`${process.env.REACT_APP_BACKEND_HOST}v1/super/investment`, { ...formData, id },
        {
          headers: { Authorization: `Bearer ${accessToken}` },

        })
      .then(({ data }) => {
        if(data.succ) {
          setIsSuccess(true)
        }

      }).catch(({ response }) => {
        setIsLoading(false);
        const { data } = response;
        setValidationErrors(data.validationErrors);
      })
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <Card sx={{ maxWidth: 600, margin: '0 auto' }}>
      <CardContent>
        <form onSubmit={updateHandler} style={{ width: '100%' }}>
          <Typography variant="subtitle1" gutterBottom>
            Investment Update
          </Typography>

          <TextField
            label="Investor"

            onChange={handleChange}
            value={formData['user_id']}
            name='user_id'
            required
            select
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.user_id} // Check if the field has an error
            helperText={validationErrors.user_id} // Display the error message
          >
            {users.map((option) => (
              <MenuItem key={option.apiKey} value={option.id}>
                {option.companyName}
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
            value={formData.type}
          >
            <MenuItem key='org name' value={1}>
              Organization
            </MenuItem>
            <MenuItem key='promoter' value={0}>
              Promoter
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
            value={formData.fund_id}
          >
            {funds.map((option) => (
              <MenuItem key={option._id} value={option._id}>
                {option.name}
              </MenuItem>
            ))}
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
        message="Investment Updated successfully!"
        sx={{ marginBottom: 2 }}
      />
      <Snackbar
        open={isFailure}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Failed to Update Investment. Please try again."
        sx={{ marginBottom: 2 }}
      />
    </Card>
  );
};

export default Investment;