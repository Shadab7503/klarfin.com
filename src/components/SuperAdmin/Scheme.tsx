import { Paper, Typography } from '@mui/material';
import { List, ListItem, ListItemText } from '@mui/material';
import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Loading from '../Dashboard/Loading';
import { stringify } from 'querystring';
import { FormatNumber } from '../../utils/formatNumber';

const Scheme = (props) => {

  const [scheme, setScheme] = useState({ BankName: '', Folio: '', Nav: '', Nav_Date: '', Plan_code: '', SchemeCategory: '', SchemeDescription: '', Totalunits: '', InvestedAmt: '', FreeAmt: '', InProcessAmt: '', TotalAmt: '' });

  const [loading, setLoading] = useState(false);


  const getSchemeData = () => {
    setLoading(true);
    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}v1/super/scheme`, { acno: props.folio_id, plan: props.filter.plan, scheme: props.filter.scheme },
        {
          headers: { Authorization: `Bearer ${props.accessToken}` }
        })
      .then(({ data }) => {
        setScheme(data.schemeData);
        console.log("Scheme Data : ",data.schemeData)
        setLoading(false);
      });

  }

  useEffect(() => {
    getSchemeData()
  }, [props.filter])


  const { BankName, Folio, Nav, Nav_Date, Plan_code, SchemeDescription, Totalunits, InvestedAmt, FreeAmt, InProcessAmt, TotalAmt } = scheme;
  if (loading) return <Loading />;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6}>
        <Paper elevation={3} sx={{ p: 2,height: '87%' }}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            Scheme Description
          </Typography>
          <Typography variant="body1">{SchemeDescription}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={6} >
        <Paper elevation={3} sx={{ p: 2,height: '87%' }}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            Folio
          </Typography>
          <Typography variant="body1">{Folio}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            Gain/Loss
          </Typography>
          <Typography variant="body1">
            {(parseFloat(TotalAmt) -
              (parseFloat(InvestedAmt) - parseFloat(InProcessAmt)))}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            Actual Amount Invested
          </Typography>
          <Typography variant="body1">
            {(parseInt(InvestedAmt) - parseInt(InProcessAmt))}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            Current Value
          </Typography>
          <Typography variant="body1">{FormatNumber(TotalAmt)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            Total Units
          </Typography>
          <Typography variant="body1">{FormatNumber(Totalunits)}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            In Process Amount
          </Typography>
          <Typography variant="body1">{FormatNumber(InProcessAmt)}</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};


export default Scheme;