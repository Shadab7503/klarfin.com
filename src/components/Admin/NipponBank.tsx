import React from 'react'
import { TextField, Button, MenuItem, CircularProgress, Snackbar, Card, CardContent, Typography } from '@mui/material';

function NipponBank() {
  return (
    <Card>
    <CardContent>
      <h2>Nippon Bank Details </h2>
      <Typography variant="h6" gutterBottom>
        Beneficiary Account Number
      </Typography>
      <Typography variant="body1">
        2203ALFPD9462P
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

      <Typography variant="h6" gutterBottom>
        Beneficiary Name
      </Typography>
      <Typography variant="body1">
        NIPPON INDIA MUTUAL FUND VIRTUAL POOL ACCOUNT
      </Typography>
    </CardContent>
  </Card>
  )
}

export default NipponBank