import React, {useState} from "react";
import {
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Alert,
  Snackbar,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import {createFolio} from "../../../services/nippon.service";
import {useNavigate} from "react-router-dom";

const RedeemCreate = ({
  handleNext,
  accessToken,
  capturedData,
  capturedDataHandler,
}) => {
  const getDate = () => {
    var currentDate = new Date();
    var day = String(currentDate.getDate()).padStart(2, "0");
    var month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    var year = currentDate.getFullYear();
    return month + "/" + day + "/" + year;
  };

  const schemes = [
    {
      value: "LP",
      name: "LOW DURATION FUND ( > 2 WEEKS )",
      plan: "RG",
      opt: "G",
    },
    {
      value: "ON",
      name: "OVERNIGHT FUND ( < 5 DAYS )",
      plan: "GP",
      opt: "G",
    },
    {
      value: "LF",
      name: "LIQUID FUND ( 5-15 DAYS )",
      plan: "IG",
      opt: "G",
    },
  ];

  const bankNames = [
    "KOTAK MAHINDRA BANK LTD",
    "YES BANK",
    "IDFC FIRST BANK LTD",
    "PUNJAB NATIONAL BANK",
    "INDUSIND BANK",
    "ICICI BANK LTD",
    "EQUITAS SMALL FINANCE BANK LTD",
    "SOUTH INDIAN BANK",
    "HDFC BANK LTD",
    "RBL BANK LIMITED",
    "BANK OF MAHARASHTRA",
    "DEUTSCHE BANK AG",
    "FEDERAL BANK",
    "KARNATAKA BANK LTD",
    "STATE BANK OF INDIA",
    "DHANALAXMI BANK",
    "TAMILNAD MERCANTILE BANK LTD",
    "AXIS BANK",
    "BANK OF BARODA",
    "CSB BANK LTD",
    "STANDARD CHARTERED BANK",
    "UNION BANK OF INDIA",
    "CANARA BANK",
    "IDBI BANK",
    "CITY UNION BANK LTD",
    "THE HONGKONG AND SHANGHAI BANKING CORPORATION LTD",
    "KARUR VYSA BANK",
    "BANDHAN BANK LTD",
    "INDIAN BANK",
    "AU SMALL FINANCE BANK",
  ];

  const [formData, setFormData] = useState({
    fund: "RMF",
    acno: capturedData.folio_id,
    scheme: schemes[0].value,
    plan: schemes[0].plan,
    options: "G",
    RedFlag: "P",
    UnitamtFlag: "A",
    UnitAmtValue: "",
    Tpin: "A",
    bank: bankNames[0],
    oldihno: 0,
    trdate: getDate(),
    entdate: getDate(),
    ShowInstaStatus: "Y",
    OTP: "",
    OTPReference: capturedData.refNo,
    SelfValidate: "Y",
    deviceid:"PARTNERAPI",
    appVersion: "1.0.1",
    appName: "Klarcap",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [failureMsg, setFailureMsg] = useState("");
  const [validationErrors, setValidationErrors] = useState<any>({});
  const Navigate = useNavigate();

  const handleChange = event => {
    const {name, value} = event.target;
    if (name == "scheme") {
      const data = schemes.find(each => each.value == value);
      if (!data) return;
      setFormData({...formData, plan: data.plan, scheme: data.value});
    }
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(formData);
    setValidationErrors({});
    setIsLoading(true);

    axios
      .post(`${process.env.REACT_APP_BACKEND_HOST}v1/super/redeem`, formData, {
        headers: {Authorization: `Bearer ${accessToken}`},
      })
      .then(res => {
        const {data} = res;
        if (!data.succ) {
          setIsLoading(false);
          setIsFailure(true);
          setFailureMsg(data.message);
          return;
        }
        setIsSuccess(true);
        setIsLoading(false);
        setTimeout(() => {
          Navigate(`/dashboardSuper/investment/details/${formData.acno}`);
        }, 2000);
        // handleNext();
      })
      .catch(({response}) => {
        setIsLoading(false);
        const {data} = response;
        setValidationErrors(data.validationErrors);
      });
  };

  const handleCloseSnackbar = () => {
    setIsFailure(false);
  };

  return (
    <Card sx={{maxWidth: 600, margin: "0 auto"}}>
      <CardContent>
        <form onSubmit={handleSubmit} style={{width: "100%"}}>
          <Typography variant="subtitle1" gutterBottom>
            Redeem request
          </Typography>
          <TextField
            label="Fund"
            name="fund"
            value={formData.fund}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.fund}
            helperText={validationErrors.fund}
          />

          <TextField
            label="Account Number"
            name="acno"
            value={formData.acno}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.acno}
            helperText={validationErrors.acno}
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
            {schemes.map(ele => {
              return (
                <MenuItem value={ele.value} defaultChecked key={ele.value}>
                  {ele.name}
                </MenuItem>
              );
            })}
          </TextField>

          {/* <TextField
            label="Plan"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.plan}
            helperText={validationErrors.plan}
          /> */}

          <TextField
            label="Options"
            name="options"
            value={formData.options}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.options}
            helperText={validationErrors.options}
          />

          <TextField
            label="Red Flag"
            name="RedFlag"
            value={formData.RedFlag}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.RedFlag}
            helperText={validationErrors.RedFlag}
          />

          <TextField
            label="Unit Amount Flag"
            name="UnitamtFlag"
            value={formData.UnitamtFlag}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.UnitamtFlag}
            helperText={validationErrors.UnitamtFlag}
          />

          <TextField
            label="Unit Amount Value"
            name="UnitAmtValue"
            value={formData.UnitAmtValue}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.UnitAmtValue}
            helperText={validationErrors.UnitAmtValue}
            type="number"
          />

          <TextField
            label="Tpin"
            name="Tpin"
            value={formData.Tpin}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.Tpin}
            helperText={validationErrors.Tpin}
          />

          <TextField
            label="Bank"
            name="bank"
            defaultValue={bankNames[0]}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            select
            error={!!validationErrors.bank}
            helperText={validationErrors.bank}
          >
            {bankNames.map((ele, index) => {
              return (
                <MenuItem value={ele} defaultChecked key={index}>
                  {ele}
                </MenuItem>
              );
            })}
          </TextField>

          <TextField
            label="Old IHNO"
            name="oldihno"
            value={formData.oldihno}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.oldihno}
            helperText={validationErrors.oldihno}
          />

          <TextField
            label="Transaction Date"
            name="trdate"
            value={formData.trdate}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            disabled
            error={!!validationErrors.trdate}
            helperText={validationErrors.trdate}
          />

          <TextField
            label="Entry Date"
            name="entdate"
            value={formData.entdate}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.entdate}
            helperText={validationErrors.entdate}
            disabled
          />

          <TextField
            label="Show Insta Status"
            name="ShowInstaStatus"
            value={formData.ShowInstaStatus}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.ShowInstaStatus}
            helperText={validationErrors.ShowInstaStatus}
          />

          <TextField
            label="OTP"
            name="OTP"
            value={formData.OTP}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.OTP}
            helperText={validationErrors.OTP}
          />

          <TextField
            label="OTP Reference"
            name="OTPReference"
            value={formData.OTPReference}
            disabled
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.OTPReference}
            helperText={validationErrors.OTPReference}
            // disabled
          />

          <TextField
            label="Self Validate"
            name="SelfValidate"
            value={formData.SelfValidate}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.SelfValidate}
            helperText={validationErrors.SelfValidate}
          />

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
        sx={{marginBottom: 2}}
      >
        <Alert severity="success">Redeem request submitted successfully!</Alert>
      </Snackbar>
      <Snackbar
        open={isFailure}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        sx={{marginBottom: 2}}
      >
        <Alert severity="error">{failureMsg}</Alert>
      </Snackbar>
    </Card>
  );
};

export default RedeemCreate;
