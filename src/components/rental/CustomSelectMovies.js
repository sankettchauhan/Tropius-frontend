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

export default function CustomSelect({ name, title, movies, formik }) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <FormControl
        fullWidth
        error={formik.touched.movie && Boolean(formik.errors.movie)}
      >
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          name={name}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.movie}
          label="Selected Genre"
          onChange={formik.handleChange}
        >
          {movies.map((movie, index) => (
            <MenuItem key={`${movie._id}`} value={movie._id}>
              {movie.title}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.movie && formik.errors.movie && (
          <FormHelperText>{formik.errors.movie}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
