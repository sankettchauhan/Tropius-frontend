import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles, Typography } from "@material-ui/core";
import FormHelperText from "@mui/material/FormHelperText";
import CustomTable from "./CustomTable";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
    minWidth: 120,
  },
  movie: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

export default function CustomSelect({ name, title, movies, formik }) {
  const classes = useStyles();
  const selectedMovie = movies.filter(
    ({ _id }) => _id === formik.values.movie
  )[0];
  // console.log(selectedMovie);
  const movieDetails = selectedMovie
    ? [
        { label: "Title", value: selectedMovie.title },
        { label: "Genre", value: selectedMovie.genre.name },
        {
          label: "Daily rental rate",
          value: selectedMovie.dailyRentalRate,
        },
        { label: "Number in stock", value: selectedMovie.numberInStock },
      ]
    : null;
  // console.log(movieDetails);

  return (
    <Box className={classes.container}>
      <FormControl
        fullWidth
        error={formik.touched.movieId && Boolean(formik.errors.movieId)}
      >
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          name={name}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.movieId}
          label="Selected Genre"
          onChange={formik.handleChange}
        >
          {movies.map((movie, index) => (
            <MenuItem key={`${movie._id}`} value={movie._id}>
              {movie.title}
            </MenuItem>
          ))}
        </Select>
        {formik.touched.movieId && formik.errors.movieId && (
          <FormHelperText>{formik.errors.movieId}</FormHelperText>
        )}
      </FormControl>
      {movieDetails && (
        <>
          <Typography variant="h5" align="center" className={classes.movie}>
            Movie details
          </Typography>
          <CustomTable movieDetails={movieDetails} />
        </>
      )}
    </Box>
  );
}
