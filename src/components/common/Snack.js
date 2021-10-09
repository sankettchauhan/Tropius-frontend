import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { makeStyles } from "@material-ui/core";
import { drawerWidth } from "./ResponsiveDrawer";

const useStyles = makeStyles({
  snack: {
    marginLeft: drawerWidth / 2,
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const defaultSnackState = {
  open: false,
  severity: "",
  message: "",
};

export default function CustomizedSnackbars({ snack, setOpen }) {
  const classes = useStyles();

  const { open, severity, message } = snack;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen((snack) => ({
      ...snack,
      open: false,
    }));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      className={classes.snack}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
