import React from "react";
import { makeStyles, Theme, createStyles } from "@mui/styles";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, StepButton, StepContent } from "@mui/material";
import BasicDetailsForm from "../pages/forms/BasicDetailsForm";
import SocioEconomicEntepreneurForm from "../pages/forms/SocioEconomicEntepreneurForm";
import SocioEconomicInnovatorForm from "../pages/forms/SocioEconomicInnovatorForm";
import TypographyText from "./shared/TypographyText";
import ExperienceDetails from "../pages/forms/ExperienceDetailsForm";
import ExistingBusinessEntrepreneurshipForm from "../pages/forms/ExistingBusinessEnterpreneurForm";
import BusinessCaseEntrepreneurForm from "../pages/forms/BusinessCaseEntrepreneurForm";
import ExistingBusinessInnovator from "../pages/forms/ExistingBusinessInnovatorForm";
import UploadDocuments from "./upload-documents/UploadDocuments";
import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DialogBox from "./shared/DialogBox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
    [theme.breakpoints.up("md")]: {
      backgroundColor: "red",
    },
  }),
);

function getSteps() {
  if(window?.studentType ==="Innovator"){
    return [
      <b style={{ color: "purple" }}>Basic Details</b>,
      <b style={{ color: "purple" }}>Socio Economic-Innovator</b>,
      // <b style={{ color: "purple" }}>Socio Economic-Entepreneur</b>,
      <b style={{ color: "purple" }}>Experience Details</b>,
      // <b style={{ color: "purple" }}>
      //   Existing Business Entrepreneurship Details
      // </b>,
      // <b style={{ color: "purple" }}>Business Case Entepreneur</b>,
      <b style={{ color: "purple" }}>Existing Business Innovator</b>,
      <b style={{ color: "purple" }}>Upload Documents</b>,
    ]
  }
  else{
    return [
      <b style={{ color: "purple" }}>Basic Details</b>,
      // <b style={{ color: "purple" }}>Socio Economic-Innovator</b>,
      <b style={{ color: "purple" }}>Socio Economic-Entepreneur</b>,
      <b style={{ color: "purple" }}>Experience Details</b>,
      <b style={{ color: "purple" }}>
        Existing Business Entrepreneurship Details
      </b>,
      <b style={{ color: "purple" }}>Business Case Entepreneur</b>,
      // <b style={{ color: "purple" }}>Existing Business Innovator</b>,
      <b style={{ color: "purple" }}>Upload Documents</b>,
    ];
  }
  
}

function getStepContent(step) {
  if(window?.studentType ==="Innovator"){
    switch (step) {
      case 0:
        return <BasicDetailsForm />;
      case 1:
        return <SocioEconomicInnovatorForm />;
      // case 2:
      //    return <SocioEconomicEntepreneurForm />;
      case 2:
        return <ExperienceDetails />;
      // case 4:
      //   return <ExistingBusinessEntrepreneurshipForm />;
      // case 5:
      //   return <BusinessCaseEntrepreneurForm />;
      case 3:
        return <ExistingBusinessInnovator />;
      case 4:
        return <UploadDocuments />;
      default:
        throw new Error("Unknown step");
    }
  }
  else{
    switch (step) {
      case 0:
        return <BasicDetailsForm />;
      // case 1:
      //   return <SocioEconomicInnovatorForm />;
      case 1:
         return <SocioEconomicEntepreneurForm />;
      case 2:
        return <ExperienceDetails />;
      case 3:
        return <ExistingBusinessEntrepreneurshipForm />;
      // case 5:
      //   return <BusinessCaseEntrepreneurForm />;
      case 4:
        return <ExistingBusinessInnovator />;
      case 5:
        return <UploadDocuments />;
      default:
        throw new Error("Unknown step");
    }
  }
}

export default function StepperForm() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const steps = getSteps();

  console.log("Steps>>",steps)
  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  // const handleReset = () => {
  //   //setActiveStep(0);
  // };

  const handleSave = () => {};

  ////////
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };
  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <h1 style={{ textAlign: "center" }}>Beneficiary Details Form</h1>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Stepper
          nonLinear
          activeStep={activeStep}
          orientation="vertical"
          mb={2}
        >
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              {/* <StepLabel>{label}</StepLabel> */}
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    {/* <Button onClick={handleReset} className={classes.button}>
                    Reset
                  </Button> */}
                    <Button
                      onClick={handleSave}
                      className={classes.button}
                      //variant="contained"
                    >
                      Save
                    </Button>

                    {/* <Button
                    variant="contained"
                    color="primary"
                    // onClick={handleNext}
                    onClick={handleComplete}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button> */}

                    {activeStep === steps.length - 1 ? (
                      <DialogBox onClick={handleComplete} />
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        // onClick={handleNext}
                        onClick={handleComplete}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    )}
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Container>
      {activeStep === steps.length && (
        <>
          {/* <Paper round elevation={24} mt={2} className={classes.resetContainer}> */}
          {/* <TypographyText
            variant="h5"
            gutterBottom="gutterBottom"
            typoText=" Dear user, Your Application is Successfully Submitted!"
          />
          <TypographyText
            variant="subtitle1"
            typoText="Your Engagement ID is #2001539. We have emailed your details over
            your email-id, and will send you an update when your documents has
            the progress."
            gutterBottom="gutterBottom"
          /> */}

          <Alert icon={false} severity="success">
            Dear User, Your Application is Successfully Submitted!
          </Alert>
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Your Engagement ID is #2001539. We have emailed your details over
            your email-id, and will send you an update when your documents has
            the progress.
          </Alert>

          {/* <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button> */}
          {/* </Paper> */}
        </>
      )}
    </div>
  );
}
