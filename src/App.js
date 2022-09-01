import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Main from "./components/Main";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ScrollToTop from "./components/shared/utils/ScrollToTop";
// import Main from "./components/Main";
export default function App() {
  return (
    <>
      <CssBaseline>
        <ScrollToTop />
        <Main />
      </CssBaseline>
    </>
  );
}
