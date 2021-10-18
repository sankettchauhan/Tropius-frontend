import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
// import TextField from "../components/formik/Textfield";
import { validationSchema } from "../validators/movie";
import { Box } from "@mui/system";
import { createMovie } from "../axios/movies";
import { getAuthorisedToken } from "../helper/auth";
import CustomizedSnackbars, {
  defaultSnackState,
} from "../components/common/Snack";
import { getGenres } from "../axios/genres";
import CustomCheckbox from "../components/movie/CustomCheckbox";
const _ = require("lodash");

/*
TODO: integrate imdb api
   send request after 1 second when title stops changing
   show list of results below the text input
   select from the list of movies and auto fill other values (except dailyRentalRate)
*/
const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    placeItems: "center",
    width: "100%",
  },
  loading: {
    marginBottom: theme.spacing(2),
  },
  mb: {
    marginBottom: theme.spacing(2),
  },
}));

export default function MovieNew() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState(defaultSnackState);
  const [genres, setGenres] = useState(null);

  const load = async () => {
    try {
      const res = await getGenres(getAuthorisedToken());
      if (res.status === 200) {
        setGenres(res.data);
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      genres: [],
      numberInStock: 0,
      dailyRentalRate: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const data = _.pick(values, ["dailyRentalRate", "title", "numberInStock"]);
    data.genreIds = values.genres.map((g) => g._id);
    try {
      const res = await createMovie(data, getAuthorisedToken());
      console.log(res);
      if (res.status === 201) {
        setLoading(false);
        setSnack((snack) => ({
          ...snack,
          open: true,
          severity: "success",
          message: "Movie created!",
        }));
      }
    } catch (error) {
      console.error(error.response);
      setLoading(false);
      setSnack((snack) => ({
        ...snack,
        open: true,
        severity: "error",
        message:
          error && error.response && error.response.data
            ? error.response.data
            : "Some error occured",
      }));
    }
  };

  return (
    <>
      <Box className={classes.container}>
        <CustomizedSnackbars snack={snack} setOpen={setSnack} />
        <Typography variant="h4" gutterBottom>
          Create new movie
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: 450 }}>
          <TextField
            fullWidth
            name="title"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            className={classes.mb}
            variant="outlined"
          />
          {genres ? (
            <CustomCheckbox
              formik={formik}
              genres={genres}
              name="genres"
              className={classes.mb}
            />
          ) : (
            <Typography align="center" className={classes.loading}>
              <CircularProgress />
            </Typography>
          )}
          <TextField
            fullWidth
            name="dailyRentalRate"
            label="Daily rental rate"
            value={formik.values.dailyRentalRate}
            onChange={formik.handleChange}
            error={
              formik.touched.dailyRentalRate &&
              Boolean(formik.errors.dailyRentalRate)
            }
            helperText={
              formik.touched.dailyRentalRate && formik.errors.dailyRentalRate
            }
            className={classes.mb}
            variant="outlined"
          />
          <TextField
            fullWidth
            name="numberInStock"
            label="Number in stock"
            value={formik.values.numberInStock}
            onChange={formik.handleChange}
            error={
              formik.touched.numberInStock &&
              Boolean(formik.errors.numberInStock)
            }
            helperText={
              formik.touched.numberInStock && formik.errors.numberInStock
            }
            className={classes.mb}
            variant="outlined"
          />
          <Typography align="center">
            <Button color="primary" variant="contained" type="submit">
              {loading ? <CircularProgress color="inherit" /> : "Submit"}
            </Button>
          </Typography>
        </form>
      </Box>
    </>
  );
}
