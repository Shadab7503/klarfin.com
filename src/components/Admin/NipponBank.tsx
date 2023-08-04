import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Snackbar,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import Loading from "./Loading";
import { Grid } from "@mui/joy";
import { DataGrid } from "@mui/x-data-grid";

function NipponBank({ accessToken }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(false);
  const { folio_id } = useParams();
  const [data, setData] = useState();
  console.log(folio_id, state);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/folio`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: {
          folio: folio_id,
        },
      })
      .then(({ data }) => {
        setData(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <Card>
      <CardContent  >
        <Typography variant="h6" gutterBottom>
          Kindly add the following bank account details as beneficiary, if not added already.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Kindly transfer the order amount into this account to finish your order.
        </Typography>
      </CardContent>
      <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}  >
        <Grid>
          <h2>Nippon Bank Details </h2>
          <Typography variant="h6" gutterBottom>
            Beneficiary Account Number
          </Typography>
          <Typography variant="body1">{`2203${data}`}</Typography>

          <Typography variant="h6" gutterBottom>
            Beneficiary Bank IFSC code
          </Typography>
          <Typography variant="body1">ICIC0000104</Typography>

          <Typography variant="h6" gutterBottom>
            Beneficiary Bank Name
          </Typography>
          <Typography variant="body1">ICICI Bank</Typography>
          <Typography variant="h6" gutterBottom>
            Type of Account
          </Typography>
          <Typography variant="body1">Current Account</Typography>
          <Typography variant="h6" gutterBottom>
            Beneficiary Name
          </Typography>
          <Typography variant="body1">
            NIPPON INDIA MUTUAL FUND VIRTUAL POOL ACCOUNT
          </Typography>
        </Grid>
        <Grid container spacing={2} style={{ padding: '20px', margin: '10px' }} >
          <Button variant="contained" style={{ background: "green", marginRight: "1rem" }}
            onClick={() => {
              navigate(`/dashboardAdmin/order/${folio_id}`,
                { state: state });
            }}>
            Create New Order
          </Button>
          <Button variant="contained" style={{ background: "orange", marginRight: "1rem" }}
            onClick={() => {
              {state.fundType == "Various funds through NSE" ? navigate(`/dashboardAdmin/investment/nse/details/${folio_id}`):navigate(`/dashboardAdmin/investment/details/${folio_id}`) }}}>
            View Reports
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default NipponBank;
