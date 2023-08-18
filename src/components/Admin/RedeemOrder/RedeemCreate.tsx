import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Checkbox
} from "@mui/material";
import axios from "axios";
import { createFolio } from "../../../services/nippon.service";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../../Store/AppContext";
import { FormatNumber } from "../../../utils/formatNumber";

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
  const Navigate = useNavigate();
  const [storeState, dispatch] = useAppContext();
  const schemes = [
    {
      value: "LP",
      name: "LOW DURATION FUND ( > 2 WEEKS )",
      plan: "IG",
      opt: "G",
    },
    {
      value: "LF",
      name: "LIQUID FUND (5-15 DAYS)",
      plan: "IG",
      opt: "G"
    },
    {
      value: "ON",
      name: "OVERNIGHT FUND ( < 5 DAYS)",
      plan: "GP",
      opt: "G"
    },
  ];
  const BankName = [{ code: "HDF", title: "HDFC BANK LTD" }]
  const Funds = {
    "AFWG": "H",
    "HDFC": "H",
    "54": "H",
    "57N": "H",
    "USTGR": "H",
    "EDIRG": "P",
    "1565": "P",
    "3491": "P",
    "1746": "P",
    "LFGPGGR": "127",
    "USGPGGR": "127",
    "AFGPGR": "RMF",
    "LFIGGR": "RMF",
    "LPIGGR": "RMF",
    "ONGPGR": "RMF",
    "CPGPGR": "RMF",
    "114G": "L",
    "72SG": "L",
    "F47RG": "L",
    "086G": "L",
    "57G": "L",
  }

  const ProductCode = [
    { code: "AFWG", name: "HDFC Arbitrage Fund - Wholesale Plan - Regular Plan - Growth" },
    { code: "HDFC", name: "HDFC Liquid Fund - Regular Plan - Growth" },
    { code: "54", name: "HDFC Low Duration Fund - Regular Plan - Growth" },
    { code: "57N", name: "HDFC Overnight Fund - Regular Plan -  Growth" },
    { code: "USTGR", name: "HDFC Ultra Short Term Fund - Regular Growth" },
    { code: "EDIRG", name: "ICICI Prudential Equity Arbitrage Fund - Growth" },
    { code: "1565", name: "ICICI Prudential Liquid Fund - Regular plan - Growth" },
    { code: "3491", name: "ICICI Prudential Overnight Fund Growth" },
    { code: "1746", name: "ICICI Prudential Ultra Short Term Fund - Growth" },
    { code: "LFGPGGR", name: "Motilal Oswal Liquid Fund - Regular Growth" },
    { code: "USGPGGR", name: "Motilal Oswal Ultra Short Term Fund - Growth" },
    { code: "AFGPGR", name: "NIPPON INDIA Arbitrage Fund  - GROWTH PLAN - GROWTH" },
    { code: "LFIGGR", name: "NIPPON INDIA Liquid Fund - Growth Plan - Growth Option" },
    { code: "LPIGGR", name: "NIPPON INDIA Low Duration Fund - Growth Plan Growth Option" },
    { code: "ONGPGR", name: "NIPPON INDIA OVERNIGHT FUND - GROWTH PLAN" },
    { code: "CPGPGR", name: "NIPPON INDIA Ultra Short Duration Fund - Growth Option" },
    { code: "114G", name: "SBI Arbitrage Opportunities Fund - Regular Plan - Growth" },
    { code: "72SG", name: "SBI Liquid Fund Regular Growth" },
    { code: "F47RG", name: "SBI Magnum Low Duration Fund Regular Growth" },
    { code: "086G", name: "SBI Magnum Ultra Short Duration Fund Regular Growth" },
    { code: "57G", name: "SBI Overnight Fund Regular Growth" },
  ]

  const bankNames = [
    "--SELECT--",
    "AU SMALL FINANCE BANK",
    "AXIS BANK",
    "BANDHAN BANK LTD",
    "BANK OF BARODA",
    "BANK OF INDIA",
    "BANK OF MAHARASHTRA",
    "CANARA BANK",
    "CITI BANK",
    "CITY UNION BANK LTD",
    "CSB BANK LTD",
    "DEUTSCHE BANK AG",
    "DHANALAXMI BANK",
    "EQUITAS SMALL FINANCE BANK LTD",
    "FEDERAL BANK",
    "HDFC BANK LTD",
    "IDBI BANK",
    "IDFC FIRST BANK LTD",
    "ICICI BANK LTD",
    "INDIAN BANK",
    "INDUSIND BANK",
    "KARUR VYSA BANK",
    "KARNATAKA BANK LTD",
    "KOTAK MAHINDRA BANK LTD",
    "PUNJAB NATIONAL BANK",
    "RBL BANK LIMITED",
    "SOUTH INDIAN BANK",
    "STATE BANK OF INDIA",
    "STANDARD CHARTERED BANK",
    "THE HONGKONG AND SHANGHAI BANKING CORPORATION LTD",
    "UNION BANK OF INDIA",
    "YES BANK"
  ];
  const { state }: any = useLocation();
  const { value,data } = state;
  console.log("state : :::", state);
  const [formData, setFormData] = useState({
    fund: "",
    acno: value.AC_NO,
    scheme: schemes[0].value,
    plan: schemes[0].plan,
    options: "G",
    RedFlag: "P",
    UnitamtFlag: "A",
    UnitAmtValue: "",
    Tpin: "A",
    bank: (value.BANK ? value.BANK : " "),
    oldihno: 0,
    trdate: getDate(),
    entdate: getDate(),
    ShowInstaStatus: "Y",
    OTP: "",
    OTPReference: "",
    SelfValidate: "Y",
    deviceid: "PARTNERAPI",
    appVersion: "1.0.1",
    appName: "Klarcap",
    appln_id: "MFS264077",
    password: "8H9QWA0K",
    broker_code: "ARN-264077",
    iin: value.CUSTOMER_ID,
    poa: "N",
    poa_bank_trxn_type: "",
    trxn_acceptance: "OL",
    dp_id: "",
    acc_no: state.AC_NO,
    bank_name: "HDF",
    ifsc_code: storeState.ACTIVEINVESTOR?.IFSC,
    remarks: "test",
    trxn_initiator: "I/O",
    trans_count: 1,
    investor_auth_log: "",
    amc: "",
    folio: value.CUSTOMER_ID,
    product_code:ProductCode.filter((ele)=>ele.name.toUpperCase() == value?.Fund_Description.toUpperCase())[0]?.code,
    ft_acc_no: "",
    amt_unit_type: "Amount",
    amt_unit: "",
    all_units: "N",
    input_ref_no: "",
    fundType: "NSE",
    total_investment: `${FormatNumber(value?.currentUnits * data[0]?.NAV)}`,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [selectedFund, setSelectedFund] = useState("");
  const [phone, setPhone] = useState("");
  const [Msg, setMsg] = useState("");
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [pan, setPan] = useState(capturedData.pan);
  const handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    // if (name == "scheme") {
    //   const data = schemes.find(each => each.value == value);
    //   if (!data) return;
    //   setFormData({ ...formData, plan: data.plan, scheme: data.value });
    // }
    
    if (name == "checked" && value == "on") {
      setFormData(prevData => ({
        ...prevData,
        ["amt_unit"]: formData.total_investment,
      }));
    }
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    setIsLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/redeem`,
        formData,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then(res => {
        // navigate(`/dashboardSuper/investment`)
        const { data } = res;
        if (!data.succ) {
          setIsFailure(true);
          setIsLoading(false);
          setMsg(data.message);
          return;
        }
        setIsSuccess(true);
        setIsLoading(false);
        setMsg(`Redeem request submitted successfully for Rs ${formData.UnitAmtValue}`)
        setTimeout(() => {
          Navigate(`/dashboardAdmin/investment/details/${formData.acno}`);
        }, 3000);
      })
      .catch(({ response }) => {
        setIsLoading(false);
        const { data } = response;
        setIsFailure(true);
        setMsg("Validation Errors!")
        setValidationErrors(data.validationErrors);
      });

  };

  useEffect(() => {
    try {
      const res = axios.get(`${process.env.REACT_APP_BACKEND_HOST}v1/user/investment/folio`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then((res) => {
        const { data } = res;
        const phone = data.phone + ""
        setPhone(phone.slice(-2));
      })
    } catch (error) {
      setIsFailure(true);
      setMsg("Unable to Fetch Phone Number From Folio DB");
      return;
    }
  }, [])

  const handleCloseSnackbar = () => {
    setIsFailure(false);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto" }}>
      <CardContent>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Typography variant="subtitle1" gutterBottom>
            Redeem Request
          </Typography>
          {/* <TextField
            label="Fund Name"
            name="fundType"
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.fund}
            helperText={validationErrors.fund}
            required
            select
          >
            {Funds.map((ele, indx) => {
              return <MenuItem key={indx} value={ele.code} >{ele.title}</MenuItem>
            })}
          </TextField>
          {formData.fundType == "RMF" && <>
            <TextField
              label="Your Bank"
              name="bank"
              defaultValue={formData.bank}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.bank}
              helperText={validationErrors.bank}
              disabled
              required
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
              required
            >
              {schemes.map(ele => {
                return (
                  <MenuItem value={ele.value} defaultChecked key={ele.value}>
                    {ele.name}
                  </MenuItem>
                );
              })}
            </TextField>

            <TextField
              label="Amount"
              name="UnitAmtValue"
              value={formData.UnitAmtValue}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!validationErrors.UnitAmtValue}
              helperText={validationErrors.UnitAmtValue}
              type="number"
              required
            />

          </>} */}

          {/* <TextField
                label="Bank Name"
                name="bank_name"
                value={formData.bank_name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.bank_name}
                helperText={validationErrors.bank_name}
                select
                required
              >
                {
                  BankName.map((ele,indx)=>{
                    return<MenuItem key={indx} value={ele.code} >{ele.title}</MenuItem>
                  })
                }
              </TextField>

              <TextField
                label="IFSC"
                name="ifsc_code"
                value={formData.ifsc_code}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!validationErrors.ifsc_code}
                helperText={validationErrors.ifsc_code}
              /> */}

          <TextField
            label="Total Investment"
            name="total_investment"
            value={formData.total_investment}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.amt_unit}
            helperText={validationErrors.amt_unit}
          />
          <TextField
            label="Redeemption Amount"
            name="amt_unit"
            value={formData.amt_unit}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.amt_unit}
            helperText={validationErrors.amt_unit}
          />
          <Checkbox name="checked" onChange={handleChange} /><span>Redeem entire amount</span>
          {/* <TextField
            label="OTP"
            name="OTP"
            value={formData.OTP}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.OTP}
            helperText={validationErrors.OTP}
          /> */}

          {/* <TextField
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
            label="Plan"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.plan}
            helperText={validationErrors.plan}
          /> 

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
          /> */}
          <TextField
            label="Scheme"
            name="product_code"
            onChange={handleChange}
            value={formData.product_code}
            variant="outlined"
            margin="normal"
            fullWidth
            error={!!validationErrors.product_code}
            helperText={validationErrors.product_code}
            required
            select
          >
            {ProductCode.map((each, idx) => (
              <MenuItem key={idx} value={each.code}>
                {each.name}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isLoading}
            fullWidth
            sx={{ marginTop: 2 }}
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
        sx={{ marginBottom: 2 }}
      >
        <Alert severity="success">{Msg}</Alert>
      </Snackbar>
      <Snackbar
        open={isFailure}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        sx={{ marginBottom: 2 }}
      >
        <Alert severity="error">{Msg}</Alert>
      </Snackbar>
    </Card>
  );
};

export default RedeemCreate;
