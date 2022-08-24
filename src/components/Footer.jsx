import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import footerlogo from "../assets/images/TataSTRIVE.png";
import Grid from "@mui/material/Grid";
import { width } from "@mui/system";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://tatastrive.com/">
        Tata Strive
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: "flex",
        //flexDirection: "column",
        //minHeight: "100vh",
        justifyContent: "space-around",
        width: "100%",
        backgroundColor: "#62c4e7",
        //position: "fixed",
        mt: 0,
        mb: 0,
      }}
    >
      {/* <CssBaseline /> */}

      <Box
        component="footer"
        sx={{
          py: 2.5,
          px: 2,
          mt: "auto",
          // mb:2
        }}
      >
        {/* <Container maxWidth="sm" align="center">
          <Typography variant="body1">Our Partner</Typography>

          <Copyright />
          <img src={footerlogo} alt="logo" />
        </Container> */}
        <Grid container spacing={2} maxWidth="sm">
          <Grid item mt="15px">
            <Typography style={{ color: "#FFFFFF" }}>
              In Partnership With
            </Typography>
            {/* <Copyright /> */}
          </Grid>
          <Grid item>
            <img
              src={footerlogo}
              style={{
                maxHeight: "37px",
                maxWidth: "100%",
                //verticalAlign: "sub",
              }}
              alt="logo"
            />
          </Grid>
          <Grid item mt="1px">
            <Typography style={{ color: "#FFFFFF" }}>V 0.1</Typography>
            {/* <Copyright /> */}
          </Grid>
          {/* <Grid item xs={4}>
            2
          </Grid>
          <Grid item xs={8}>
            3
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
}
