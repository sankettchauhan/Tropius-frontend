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

export default function CustomSelect({ name, title, genres, formik }) {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <FormControl
        fullWidth
        error={formik.touched.genre && Boolean(formik.errors.genre)}
      >
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          name={name}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.genre}
          label="Selected Genre"
          onChange={formik.handleChange}
        >
          {genres.map((genre, index) => (
            <MenuItem key={`${genre._id}`} value={genre._id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.genre && formik.errors.genre && (
          <FormHelperText>{formik.errors.genre}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
}
