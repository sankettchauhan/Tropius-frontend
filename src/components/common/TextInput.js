import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {},
};

function ClassNames(props) {
  const { classes, children, className, ...other } = props;

  return (
    <TextField
      variant="outlined"
      className={clsx(classes.root, className)}
      fullWidth
      {...other}
    >
      {children || "class names"}
    </TextField>
  );
}

ClassNames.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default withStyles(styles)(ClassNames);
