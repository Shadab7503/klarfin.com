import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Box, Modal, Typography } from '@mui/material';
import axios from 'axios';
import { FormatNumber } from '../../../utils/formatNumber';
import { Clear } from '@mui/icons-material';

function RTGSPendingPayment({ accessToken, isModel, setIsModel, formData }) {

  const [msg, setMsg] = useState("");
  const [isFailure, setIsFailure] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const [Data, setData] = useState({ ...formData });

  const dateConverter = (str) => {
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    var date = new Date(str);
    var mnth = (date.getMonth());
    var day = ("0" + date.getDate()).slice(-2);
    var year = date.getFullYear();
    return `${day}-${month[mnth]}-${year}`;
  }

  const handleChange = (event) => {
    let { name, value } = event.target;
    if(name == "transfer_date"){
      value = dateConverter(value);
    }
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

  };

  const handleClose = () => {
    //add this formData to db form future payments
    setIsModel(false)
  }
  const handleSubmit = async () => {
    await axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/create-order`, Data,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(res => {
        const { data } = res;
        if (!data.succ) {
          setMsg(data.message)
          setIsFailure(true);
          return;
        }
        setIsLoading(false);
        setIsSuccess(true);
        setMsg(`Order submitted successfully for Rs ${formData.amount}`)
        // setTimeout(() => {
        //   formData.fundType == "Various funds through NSE" ?
        //     navigate(`/dashboardAdmin/investment/nse/details/${state.state.folio.Folio}`) :
        //     navigate(`/dashboardAdmin/investment/details/${state.state.folio.Folio}`)
        // }, 3000)

      }).catch(({ response }) => {
        setIsLoading(false);
        const { data } = response;
        setIsFailure(true);
        setMsg(data.message);
        return;
      })
    return;
  }

  return (
    <Modal
      open={isModel}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{ onClick: (event) => event.stopPropagation() }}
    >

      <Box sx={{
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -75%)',
        bgcolor: 'background.paper',
        borderRadius: "10px",
        minWidth: "40vw",
        boxShadow: 24,
        padding: "8px 16px 16px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "end" }} ><div onClick={handleClose} style={{ cursor: "pointer" }} ><Clear /></div></Box>
        <Typography variant='h5' >RTGS/NEFT</Typography>
        <Typography id="modal-modal-description">
          Kindly make payment of Rs. {FormatNumber(Data.amount)} from your bank account
        </Typography>
        <Typography id="modal-modal-description">
          via RTGS/NEFT and provide the following details.
        </Typography>
        <TextField
          label="UTR Number"
          name="utr_no"
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          type='date'
          focused
          label="Transfer Date"
          name="transfer_date"
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
          onClick={handleSubmit}
          sx={{ marginTop: 2, width: "150px", height: "40px" }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'INVEST'}
        </Button>
      </Box>
    </Modal>
  )
}

export default RTGSPendingPayment;