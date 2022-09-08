import React from "react";
import { makeStyles, Theme, createStyles } from "@mui/styles";
import { use } from "i18next";

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

export default useStyles;