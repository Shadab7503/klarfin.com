import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
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

function NipponBank({accessToken}) {
  const [loading, setLoading] = useState(false);
  const {folio} = useParams();
  const [data,setData] = useState();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/folio`, {
        headers: {Authorization: `Bearer ${accessToken}`},
        params: {
          folio: folio,
        },
      })
      .then(({data}) => {
        setData(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <Card>
        <CardContent>
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
          
        </CardContent>
    </Card>
  );
}

export default NipponBank;
