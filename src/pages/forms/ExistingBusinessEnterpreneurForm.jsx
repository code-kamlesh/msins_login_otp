import * as React from "react";
import Grid from "@mui/material/Grid";
import TypographyText from "../../components/shared/TypographyText";
import TextFields from "../../components/shared/TextFields";

import SelectOption from "../../components/shared/SelectOption";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextareaAutosizeBox from "../../components/shared/TextareaAutosizeBox";
import { Box } from "@mui/material";
import AddressData from "../../components/shared/AddressData";

//adding select box options
const selectLevelOptions = [
  "Level 0: Idea - Unproven concept, no testing has been performed",
  "Level 1: Proof Of Concept - Basic Research, technology validation done",
  "Level 2: Minimum viable product, testing and certification done and first workable and saleable version ready",
  "Level 3: Prototype - build in a laboratory environment and tested or experienced by user",
  "Level 4: Full Commercial - Innovation(Product)  available for consumers",
];
const selectExistingBusinessOptions = [
  "Yes(Self Owned)",
  "Yes(Family Owned)",
  "No",
];
const selectBorrowedMoneyOptions = ["Yes", "No"];
const selectDepositMoneyOptions = ["Yes", "No"];
const selectudhyogAadharRegistrationOptions = ["Yes", "No"];
const selectgstRegistrationOptions = ["Yes", "No", "Don't know"];

export default function ExistingBusinessEntrepreneurshipForm() {
  return (
    <React.Fragment>
      {/* <TypographyText
        variant="h6"
        typoText="Existing Business Entrepreneurship Details"
        gutterBottom="gutterBottom"
      /> */}
      <Grid container spacing={6}>
        {/*Start- Existing Business Entrepreneur questions */}
        <Grid item xs={12}>
          <p>1. Select your level</p>
          <SelectOption
            label="Select Level"
            id="selectLevel"
            name="selectLevel"
            options={selectLevelOptions}
            fullWidth="fullWidth"
            autoFocus={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <p>2. Do you have an existing business?</p>
          <Grid item>
            <SelectOption
              label="Existing business"
              id="existingBusiness"
              name="existingBusiness"
              options={selectExistingBusinessOptions}
              variant="standard"
              fullWidth="fullWidth"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <p>3. Did you ever deposit your money in a bank or savings group??</p>
          <SelectOption
            //label="Do you have an existing business"
            id="DepositMoney"
            name="DepositMoney"
            label="Deposit Money"
            options={selectDepositMoneyOptions}
            variant="standard"
            minWidth="md"
            fullWidth="fullWidth"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <p>
            4. If you had to obtain a loan for INR 2,00,000 within the next
            month, how confident are you of being able to arrange such a loan?
          </p>
          <Grid item xs={12} sm={6} md={6}>
            <Box mt={2}>
              <TextFields
                required
                id="loanAmountDuration"
                name="loanAmountDuration"
                type="number"
                //label="Aadhar Number"
                fullWidth="fullWidth"
                placeholder="e.g 1 to 10 months"
                variant="standard"
                autoFocus={false}
                onInput={(e) => {
                  e.target.value = Math.max(0, parseInt(e.target.value))
                    .toString()
                    .slice(0, 2);
                }}
              />
            </Box>
          </Grid>
        </Grid>{" "}
        <Grid item xs={12} sm={6} md={6}>
          <p>
            5. In the past 12 months have you borrowed any money from any source
            ?
          </p>
          <br />
          <SelectOption
            //label="Do you have an existing business"
            id="borrowedMoney"
            name="borrowedMoney"
            label="Borrowed Money"
            options={selectBorrowedMoneyOptions}
            variant="standard"
            fullWidth="fullWidth"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <p>6. From whom will you be obtaining such a loan?</p>
          <Box mt={2.5}>
            <TextFields
              required
              id="loanSource"
              name="loanSource"
              type="text"
              //label="Aadhar Number"
              fullWidth="fullWidth"
              placeholder="e.g bank"
              variant="standard"
              autoFocus={false}
              inputProps={{ maxLength: 45 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <p>7. Do you have Udyog Aadhar registration?</p>
          <SelectOption
            //label="Do you have an existing business"
            id="udhyogAadharRegistration"
            name="udhyogAadharRegistration"
            label="Aadhar Registration"
            options={selectudhyogAadharRegistrationOptions}
            variant="standard"
            fullWidth="fullWidth"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <p>8. Do you have GST registration?</p>
          <SelectOption
            //label="Do you have an existing business"
            id="gstRegistration"
            name="gstRegistration"
            label="GST Registration"
            options={selectgstRegistrationOptions}
            variant="standard"
            fullWidth="fullWidth"
            //minWidth= "10"
          />
        </Grid>
        {/*End- Existing Business Entrepreneur questions */}
      </Grid>
    </React.Fragment>
  );
}
