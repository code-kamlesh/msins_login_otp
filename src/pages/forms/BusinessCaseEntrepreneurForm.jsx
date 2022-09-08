import * as React from "react";
import Grid from "@mui/material/Grid";
import TextareaAutosizeBox from "../../components/shared/TextareaAutosizeBox";
import AddressData from "../../components/shared/AddressData";
import useStyles  from '../../components/layout'
import { Link, useNavigate } from 'react-router-dom'
import Container from "@mui/material/Container";
import { Button } from "@mui/material";
import Stack from '@mui/material/Stack';

export default function BusinessCaseEntrepreneurForm() {
  const history = useNavigate();
  const classes = useStyles();
  
  
  const submitData = ()=>{
    history('/uploadDocuments' ,{replace:true})
  }
  const handleBack = ()=>{
    history('/Businessdetails' ,{replace:true})
  }

  return (
    <div className={classes.root} >
       <h3 style={{ textAlign: "center" }}>Business Case Entepreneur</h3>
       <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
    <React.Fragment className={classes.actionsContainer}>   
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <p>
            1. Where do you Intend to setup your business(include village,
            block, district)?
          </p>
        </Grid>
        <AddressData autoFocus={true} />
        <Grid item xs={12}>
          <p>
            2. What are the services/ products you want to provide through the
            business ? List all the applicable products and services?
          </p>
          <TextareaAutosizeBox
            id="businessServices"
            name="businessServices"
            label="Business Services or Products"
            placeholder="Maximum 100 characters only."
            fullWidth="fullWidth"
            
          />
        </Grid>
        <br />
        <Grid item xs={12}>
          <p>
            3. Who are your target customers? Be specific include gender, age
            range etc?
          </p>

          <TextareaAutosizeBox
            id="targetCustomers"
            name="targetCustomers"
            label="Target Customers"
            fullWidth="fullWidth"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <br />
        <Grid item xs={12}>
          <p>
            4. Have you done any market research on your targeted market? If yes
            please provide the details?
          </p>
          <TextareaAutosizeBox
            id="marketResearch"
            name="marketResearch"
            label="Market Research"
            fullWidth="fullWidth"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <br />
        <Grid item xs={12}>
          <p>
            5. What is the raw materials for your business? List all that is
            applicable.
          </p>

          <TextareaAutosizeBox
            id="rawMaterials"
            fullWidth="fullWidth"
            name="rawMaterials"
            label="Raw Materials"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <br />
        <Grid item xs={12}>
          <p>
            6. Who will be the suppliers of your business? List type of
            suppliers materials to be sourced etc.
          </p>

          <TextareaAutosizeBox
            id="suppliers"
            name="suppliers"
            fullWidth="fullWidth"
            label="Suppliers"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <br />{" "}
        <Grid item xs={12}>
          <p>
            7. Which are the avenues for raising funds for your business? What
            do you think sources mentioned by you will land you money? List all
            applicable sources.
          </p>

          <TextareaAutosizeBox
            id="raisingFunds"
            name="raisingFunds"
            fullWidth="fullWidth"
            label="Raising Funds"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <br />{" "}
        <Grid item xs={12}>
          <p>
            8. Is there any competition for your business? If yes please provide
            details.
          </p>

          <TextareaAutosizeBox
            id="competition"
            name="competition"
            fullWidth="fullWidth"
            label="Competition"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <br />{" "}
        <Grid item xs={12}>
          <p>9. What is the price per unit of your main product/ service?</p>

          <TextareaAutosizeBox
            id="pricePerUnit"
            name="pricePerUnit"
            label="Price Per Unit"
            fullWidth="fullWidth"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        <br />{" "}
        <Grid item xs={12}>
          <p>10. What is the expected revenue of your business per month?</p>

          <TextareaAutosizeBox
            id="expectedRevenue"
            name="expectedRevenue"
            label="Expected Revenue"
            fullWidth="fullWidth"
            placeholder="Maximum 100 characters only."
          />
        </Grid>
        {/* End of Business Case Entepreneur */}
      </Grid>
      <Stack direction="row" spacing={2}>
        <Button type="submit" variant="contained" color="primary" onClick={handleBack} >Back</Button>
        <Button type="submit" variant="contained" color="primary" onClick={submitData} >Next</Button>
      </Stack>
      </React.Fragment>
      </Container>
    </div>
  );
}
