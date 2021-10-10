import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@material-ui/core";
import FormHelperText from "@mui/material/FormHelperText";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
    minWidth: 120,
  },
}));

export default function CustomSelect({ name, title, customers, formik }) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <FormControl
        fullWidth
        error={formik.touched.customer && Boolean(formik.errors.customer)}
      >
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          name={name}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.customer}
          label="Select customer"
          onChange={formik.handleChange}
        >
          {customers.map((customer, index) => (
            <MenuItem key={`${customer._id}`} value={customer._id}>
              {customer.name}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.customer && formik.errors.customer && (
          <FormHelperText>{formik.errors.customer}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
