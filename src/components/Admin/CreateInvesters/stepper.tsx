import * as React from "react";
import { TextField, Button, CircularProgress, Snackbar, Card, CardContent, Typography, MenuItem, Paper } from '@mui/material';
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import KYCCheck from "./Nippon/KycCheck";
import Folio from "./Nippon/FolioCreate";
import OTBM from "./Nippon/OTBM";
import axios from "axios";
import Investment from "./Nippon/investmentForm";
import { useLocation, useNavigate } from "react-router-dom";
import InvestmentFormNSE from "./NSE/InvestmentFormNSE";
import FolioCreateNSE from "./NSE/FolioCreateNSE";

const stepsNippon = ["Investment", "KYC check", "Create Folio", "EOTBM"];
const stepsNse = ["Investment", "Final"];

export default function HorizontalLinearStepper({ accessToken }) {
  const location: any = useLocation().state;
  const [activeStep, setActiveStep] = React.useState(location.status);
  //const [activeStep, setActiveStep] = React.useState(1);
  const [validationErrors, setValidationErrors] = React.useState<any>({})
  const [capturedData, setCapturedData] = React.useState({
    inv_id: location._id,
    pan: location.folio?.pan,
    folio: location.folio?.Folio,
    fund_id:"",
    fundType:"",
    ACTYPE:"SAVINGS"
  });
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const navigate = useNavigate();
  const isStepOptional = (step: number) => {
    return step === 5;
  };
  const [funds, setFunds] = React.useState<any>([]);
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const getFunds = () => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_HOST + "v1/user/investment/funds",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (
          response.data.succ
        ) {
          setFunds([...response.data.funds]);
          console.log(response)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  React.useEffect(() => {
    getFunds();
  }, [])

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    navigate("/dashboardAdmin/investment");
  };

  const dataCapture = (key, value) => {
    if (Array.isArray(key)) {
      let obj = {};
      key.forEach((each) => {
        obj = { ...obj, ...each };
      });
      setCapturedData({ ...capturedData, ...obj });
      return;
    }
    setCapturedData({ ...capturedData, [key]: value });
    console.log("formData : ",capturedData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCapturedData((prevData) => ({
      ...prevData,
      "fund_id":value._id,
      "fundType":value.name,
    }));
    console.log(capturedData);
  };
  

  return (
    <div style={{ padding: "2rem" }}>
      <Box sx={{ width: "100%"}}>
        {capturedData.fund_id == "" &&<Paper sx={{width:"100%",minHeight:"30vh",p:2,display:"flex",flexDirection:"column" ,alignItems:"center"}} >
          <Typography variant="h5" sx={{m:3}}>Select Funds in Which Want You to Invest</Typography>
          <TextField
            label="Fund"
            onChange={handleChange}
            name="fund_id"
            required
            select
            variant="outlined"
            margin="normal"
            sx={{width:"40vw"}}
            error={!!validationErrors.fund_id} // Check if the field has an error
            helperText={validationErrors.fund_id} // Display the error message
          >
            {funds.map(option => (
              <MenuItem key={option._id} value={option}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Paper>}
        {
          capturedData.fundType == "Nippon India" &&<>
          <Stepper activeStep={activeStep}>
          {stepsNippon.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === stepsNippon.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Thank you!, Your are done with all the steps.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Go to list</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ minHeight: "80vh" }}>
              <div style={{ marginTop: "4rem" }}>
                {activeStep == 0 && (
                  <Investment
                    capturedDataHandler={dataCapture}
                    captureData={capturedData}
                    accessToken={accessToken}
                    handleNext={handleNext}
                  />
                )}
                {activeStep == 1 && (
                  <KYCCheck
                    accessToken={accessToken}
                    capturedDataHandler={dataCapture}
                    capturedData={capturedData}
                    handleNext={handleNext}
                  />
                )}

                {activeStep == 2 && (
                  <Folio
                    capturedDataHandler={dataCapture}
                    capturedData={capturedData}
                    handleNext={handleNext}
                    accessToken={accessToken}
                  />
                )}
                {activeStep == 3 && (
                  <OTBM
                    capturedDataHandler={dataCapture}
                    capturedData={capturedData}
                    handleNext={handleNext}
                    accessToken={accessToken}
                  />
                )}
              </div>
            </div>
          </React.Fragment>
        )}
          </>
        }
        {
          capturedData.fundType == "Various funds through NSE" &&<>
          <Stepper activeStep={activeStep}>
          {stepsNse.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === stepsNse.length - 1 ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Thank you!, Your are done with all the steps.
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Go to list</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ minHeight: "80vh" }}>
              <div style={{ marginTop: "4rem" }}>
                {activeStep == 0 && (
                  <InvestmentFormNSE
                    capturedDataHandler={dataCapture}
                    accessToken={accessToken}
                    handleNext={handleNext}
                    capturedData = {capturedData}
                  />
                )}
              </div>
            </div>
          </React.Fragment>
        )}
          </>
        }
      </Box>
    </div>
  );
}
