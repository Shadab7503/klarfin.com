import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KYCCheck from '../CreateInvesters/Nippon/KycCheck';
import Folio from '../CreateInvesters/Nippon/FolioCreate';
import OTBM from '../CreateInvesters/Nippon/OTBM';
import Investment from '../CreateInvesters/Nippon/investmentForm';
import { useNavigate, useParams } from 'react-router-dom';
import SendOTP from './sendOTP';
import RedeemCreate from './RedeemCreate';

const steps = ['Send OTP', 'Redeem'];

export default function RedeemStepper({ accessToken }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const { folio_id } = useParams();
  const [capturedData, setCapturedData] = React.useState({ folio_id });
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const navigate = useNavigate();

  const isStepOptional = (step: number) => {
    return step === 5;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

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
    navigate('/dashboardAdmin/investment');
  };


  const dataCapture = (key, value) => {
    if (Array.isArray(key)) {
      let obj = {};
      key.forEach(each => {
        obj = { ...obj, ...each };
      })
      setCapturedData({ ...capturedData, ...obj })
      return;
    }
    setCapturedData({ ...capturedData, [key]: value })
  }


  return (
    <div style={{ padding: '2rem' }}>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
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

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              Thank you!, Your are done with all the steps.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Go to list</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div style={{ minHeight: '80vh' }}>

              <div style={{ marginTop: '4rem' }}>
                {
                  activeStep == 0 && <RedeemCreate capturedDataHandler={setCapturedData} capturedData={capturedData} handleNext={handleNext} accessToken={accessToken} />
                }
                {
                  activeStep == 1 && <SendOTP accessToken={accessToken} capturedDataHandler={setCapturedData} capturedData={capturedData} handleNext={handleNext} />
                }
              </div>

            </div>
            {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box> */}
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}