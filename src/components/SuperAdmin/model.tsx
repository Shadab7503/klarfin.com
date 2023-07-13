import React, { useEffect, useState } from 'react';
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import axios from 'axios';

const Popup = ({ refno, isOpen, accessToken, handleClose }) => {
  console.log('isOpen', isOpen);

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    "InstaRemarks": "",
    "InstaStatus": "",
    "ReturnCode": "",
    "ReturnMsg": "",
    "Status": ""
  });




  const getRedeemStatus = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}v1/super/redeem/status`, { refno: refno, fund: 'RMF' },
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
      .then(({ data }) => {
        setData(data.status);
        setLoading(false);

      });

  }

  useEffect(() => {
    getRedeemStatus();
  }, [refno])

  return (
    <div>

      <Dialog open={isOpen} onBackdropClick={() => { handleClose(!isOpen) }}>
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          {loading ? (
            <div style={{ textAlign: 'center' }}>
              <CircularProgress />
              <Typography>Loading...</Typography>
            </div>
          ) : (
            <>
              <Typography variant="body2">InstaRemarks: {data.InstaRemarks} </Typography>
              <Typography variant="body2">InstaStatus: {data.InstaStatus}</Typography>
              <Typography variant="body2">ReturnCode: {data.ReturnCode}</Typography>
              <Typography variant="body2">ReturnMsg: {data.ReturnMsg}</Typography>
              <Typography variant="body2">Status: {data.Status}</Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Popup;
