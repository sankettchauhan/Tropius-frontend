import React from "react";
import MuiTextField from "@material-ui/core/TextField";
import { fieldToTextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  textinput: {
    marginBottom: theme.spacing(2),
  },
}));

export default function TextField(props) {
  const classes = useStyles();
  return (
    <MuiTextField
      {...fieldToTextField(props)}
      variant="outlined"
      className={classes.textinput}
      fullWidth
    />
  );
}
