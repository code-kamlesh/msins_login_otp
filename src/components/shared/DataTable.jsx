import MUIDataTable from "mui-datatables";
import React from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true,
});

export default function DataTable() {
  const columns = [
    { name: "Name" },
    "Engagement ID",
    "Phone no.",
    "Last Call Info.",
    "More Info.",
  ];

  const options = {
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
  };

  const data = [
    [
      "Sagar Kudu",
      "1001",
      "9561516967",
      "19 May 2021, 12:30 PM",
      <Link
        to="/student"
        style={{
          textDecoration: "none",
          color: "black",
          fontStyle: "italic",
          backgroundColor: "transparent",
        }}
      >
        Click Here
      </Link>,
    ],
    [
      "Rahul Bagdi",
      "1002",
      "9328282222",
      "19 May 2021, 12:30 PM",
      <Link
        to="/student"
        style={{
          textDecoration: "none",
          color: "black",
          fontStyle: "italic",
          backgroundColor: "transparent",
        }}
      >
        Click Here
      </Link>,
    ],
    [
      "Kamlesh Singh",
      "1003",
      "8029282028",
      "17 May 2021, 05:15 PM",
      <Link
        to="/student"
        style={{
          textDecoration: "none",
          color: "black",
          fontStyle: "italic",
          backgroundColor: "transparent",
        }}
      >
        Click Here
      </Link>,
    ],
  ];

  return (
    <CacheProvider value={muiCache}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={createTheme()}>
          <Box style={{ marginTop: "10px" }}>
            <MUIDataTable
              title={"Data"}
              data={data}
              columns={columns}
              options={options}
            />
          </Box>
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}
