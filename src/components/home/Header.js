import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";

const useStyles = makeStyles((theme) => ({}));

export default function Header() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item={6}>tagline</Grid>
      <Grid item={6}>image</Grid>
    </Grid>
  );
}
