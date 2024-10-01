import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Payment from "./Payment";

import SelectAddress from "./SelectAddress";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

export default function Checkout({
  setOpen,
  navigate,
  style,
  selectAddress,
  address,
}) {
  const stripePromise = loadStripe(process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY);
  const [isCheckoutValid, setIsCheckoutValid] = useState(true);

  const handlePayment = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      console.error("Stripe failed to load");
    }
    // Further Stripe logic goes here
  };

  const steps = [
    {
      label: "Select delivery address",
      description: (
        <SelectAddress
          navigate={navigate}
          selectAddress={selectAddress}
          address={address}
          setIsCheckoutValid={setIsCheckoutValid}
        />
      ),
    },
    {
      label: "Select Payment methods",
      description: (
        <Payment
          navigate={navigate}
          style={style}
          setOpen={setOpen}
          selectAddress={selectAddress}
          address={address}
        />
      ),
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 1) {
      handlePayment();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{ maxWidth: 400 }}
      style={{
        overflowY: "scroll",
        height: "calc( 24rem)",
        "&::-webkit-scrollbar": {
          width: "6px", // Customize scrollbar width for Webkit browsers
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f0f0f0", // Track color
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888", // Scrollbar thumb color
          borderRadius: "10px", // Round edges of the scrollbar
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555", // Thumb color on hover
        },
        scrollbarWidth: "thin",
        scrollbarColor: "#888 #f0f0f0",
      }}
    >
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 1 ? (
                  <Typography variant="caption">
                    Choose on of the available payment methods
                  </Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <>{step.description}</>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={activeStep === 0 && !isCheckoutValid}
                  >
                    {index === steps.length - 1 ? "Confirm" : "Continue"}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          {/* <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button> */}
        </Paper>
      )}
    </Box>
  );
}
