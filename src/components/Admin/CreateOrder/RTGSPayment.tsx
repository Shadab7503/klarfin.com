import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Box, Modal, Typography } from '@mui/material';
import axios from 'axios';
import { Clear } from '@mui/icons-material';
import { useAppContext } from '../../../Store/AppContext';

function RTGSPayment({ setIsLoading, setOpen, setIsSuccess, setMsg, state, setValidationErrors, setIsFailure, isLoading, accessToken, formData, handleChange, open, validationErrors }) {
  const navigate = useNavigate();
  const [storeState,dispatch] = useAppContext();
  const handleClose =async () => {
   
    await axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/pendingtrans`,formData,
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
        navigate(`/dashboardAdmin/investment/nse/details/pending/${storeState.ACTIVEINVETOR.folio.Folio}` ,{state:"Please fill UTR No. and transfer date to finish transaction"})
        setOpen(false)
      }).catch(({ response }) => {
        setIsLoading(false);
        const { data } = response;
        setIsFailure(true);
        setMsg(data.message);
        setValidationErrors(data.validationErrors);
        return;
      })
    return;
  }
  const handleSubmit = async () => {
    await axios.post(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/create-order`, formData,
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
        setMsg(`Order submitted successfully for Rs ${formData.amount}`)
        setTimeout(() => {
          formData.fundType == "Various funds through NSE" ?
            navigate(`/dashboardAdmin/investment/nse/details/${state.state.folio.Folio}`) :
            navigate(`/dashboardAdmin/investment/details/${state.state.folio.Folio}`)
        }, 3000)

      }).catch(({ response }) => {
        setIsLoading(false);
        const { data } = response;
        setIsFailure(true);
        setMsg(data.message);
        setValidationErrors(data.validationErrors);
        return;
      })
    return;
  }

  return (
    <Modal
      open={open}
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
        <Typography variant='h5' >RTGS</Typography>
        <Typography id="modal-modal-description">
          Kindly make payment of {formData.amount} from your bank account
        </Typography>
        <Typography id="modal-modal-description">
          via RTGS and provide us with the UTR here.
        </Typography>
        <TextField
          label="UTR Number"
          name="utr_no"
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          fullWidth
          error={!!validationErrors.utr_no}
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
          error={!!validationErrors.transfer_date}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
          onClick={handleSubmit}
          sx={{ marginTop: 2, width: "150px", height: "40px" }}
        >
          { isLoading ? <CircularProgress size={24} color="inherit" /> : 'INVEST'}
        </Button>
      </Box>
    </Modal>
  )
}

export default RTGSPayment;