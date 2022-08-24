import Grid from "@mui/material/Grid";
import TypographyText from "../../components/shared/TypographyText";
import SelectOption from "../../components/shared/SelectOption";
import { Box } from "@mui/material";
import TextFields from "../../components/shared/TextFields";
import TextareaAutosizeBox from "./../../components/shared/TextareaAutosizeBox";

export default function ExistingBusinessInnovator() {
  const selectExistingIdeaButton = [
    "Yes(Self Owned)",
    "Yes(Family Owned)",
    "No",
  ];
  const selectRaisedMoneyButton = ["Yes", "No"];
  const selectAadharRegistrationButton = ["Yes", "No"];
  const selectGSTRegistrationButton = ["Yes", "No"];

  const selectDIPPRegistrationButton = ["Yes", "No"];

  return (
    <>
      {/* <TypographyText
        variant="h6"
        typoText="Existing Business- Innovator"
        gutterBottom="gutterBottom"
      /> */}
      <Grid container spacing={6}>
        {/*Start- Existing Business Entrepreneur questions */}
        <Grid item xs={12} sm={6} md={6}>
          <p>1. Do you have an existing Innovative idea/ startup</p>
          <SelectOption
            label="Existing Idea"
            id="existingIdea"
            name="existingIdea"
            options={selectExistingIdeaButton}
            fullWidth="fullWidth"
            autoFocus={true}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <p>
            2. In the past 12 months have you raised any money from any source?
          </p>
          <Grid item>
            <SelectOption
              label="Raised Money"
              id="raisedMoney"
              name="raisedMoney"
              options={selectRaisedMoneyButton}
              variant="standard"
              fullWidth="fullWidth"
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <p>3. Do you have Udyog Aadhar registration?</p>
          <SelectOption
            //label="Do you have an existing business"
            id="udhyogAadharRegistration"
            name="udhyogAadharRegistration"
            label="Aadhar Registration"
            options={selectAadharRegistrationButton}
            fullWidth="fullWidth"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <p>4. Do you have DIPP registration?</p>
          <SelectOption
            //label="Do you have an existing business"
            id="dippRegistration"
            name="dippRegistration"
            label="Aadhar Registration"
            options={selectDIPPRegistrationButton}
            fullWidth="fullWidth"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <p>5. Do you have GST registration?</p>
          <SelectOption
            //label="Do you have an existing business"
            id="gstRegistration"
            name="gstRegistration"
            label="GST Registration"
            options={selectGSTRegistrationButton}
            fullWidth="fullWidth"
            variant="standard"
            //minWidth= "10"
          />
        </Grid>
      </Grid>

      <Grid container spacing={6} mt={1}>
        <Grid item xs={12}>
          <p>6. What is the Innovative Idea</p>

          <TextareaAutosizeBox
            id="innovativeIdea"
            name="innovativeIdea"
            fullWidth="fullWidth"
            label="Innovative Idea"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <br />
        <Grid item xs={12}>
          <p>
            7. Where do you Intend to setup your business(include village,
            block, district){" "}
          </p>
          <TextareaAutosizeBox
            id="businessSetup"
            name="businessSetup"
            fullWidth="fullWidth"
            label="Business Setup"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <br />
        <Grid item xs={12}>
          <p>
            8. What are the services/ products you want to provide through the
            business ? List all the applicable products and services
          </p>

          <TextareaAutosizeBox
            id="businessServices"
            fullWidth="fullWidth"
            name="businessServices"
            label="Business Services"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <br />
        <Grid item xs={12}>
          <p>
            9. Who will be the suppliers of your business? List type of
            suppliers materials to be sourced etc.
          </p>

          <TextareaAutosizeBox
            id="suppliers"
            fullWidth="fullWidth"
            name="suppliers"
            label="Suppliers"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <br />{" "}
        <Grid item xs={12}>
          <p>
            10. Who are your target customers? Be specific include gender, age
            range etc
          </p>

          <TextareaAutosizeBox
            fullWidth="fullWidth"
            id="targetCustomers"
            name="targetCustomers"
            label="Target Customers"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <br />{" "}
        <Grid item xs={12}>
          <p>
            11. What is the requirement to implement the innovative idea? List
            all that is applicable?
          </p>

          <TextareaAutosizeBox
            id="innovativeIdea"
            fullWidth="fullWidth"
            name="innovativeIdea"
            label="Innovative Idea"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <br />{" "}
        <Grid item xs={12}>
          <p>
            12. Who is the important stake holders of your business (suppliers,
            partners, govt bodies etc)?
          </p>

          <TextareaAutosizeBox
            id="stakeHolders"
            fullWidth="fullWidth"
            name="stakeHolders"
            label="Stake Holders"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <br />{" "}
        <Grid item xs={12}>
          <p>
            13. Which are the avenues for raising funds for your business? Why
            do you think sources mentioned by you will lend you money? List all
            possible sources?
          </p>

          <TextareaAutosizeBox
            id="raisingFunds"
            fullWidth="fullWidth"
            name="raisingFunds"
            label="Raising Funds"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <Grid item xs={12}>
          <p>14.What is the Unique Selling Point(USP) of your idea?</p>

          <TextareaAutosizeBox
            fullWidth="fullWidth"
            id="usp"
            name="usp"
            label="Unique Selling Point"
            placeholder="Maximum 100 characters only."
          />
        </Grid>{" "}
        <Grid item xs={12}>
          <p>
            15.Is there any competition for your idea if yes then please provide
            details?
          </p>

          <TextareaAutosizeBox
            fullWidth="fullWidth"
            id="competition"
            name="compitition"
            label="Compitition"
            placeholder="Maximum 100 characters only."
          />
        </Grid>{" "}
        <Grid item xs={12}>
          <p>
            16. What is the road-map/ time line in devloping your product/
            services of your innovative idea?
          </p>

          <TextareaAutosizeBox
            id="innovativeIdeaRoadmap"
            fullWidth="fullWidth"
            name="innovativeIdeaRoadmap"
            label="Innovative Idea Roadmap"
            placeholder="Maximum 100 characters only."
          />
        </Grid>{" "}
        <Grid item xs={12}>
          <p>17. What is the proposed revenue model?</p>

          <TextareaAutosizeBox
            fullWidth="fullWidth"
            id="proposedRevenueModel"
            name="proposedRevenueModel"
            label="Revenue Model"
            placeholder="Maximum 100 characters only."
          />
        </Grid>{" "}
        <Grid item xs={12}>
          <p>18. Any potential intellectual componant?</p>

          <TextareaAutosizeBox
            id="intellectual"
            fullWidth="fullWidth"
            name="intellectual"
            label="Intellectual"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
      </Grid>
    </>
  );
}
