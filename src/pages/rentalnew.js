import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  LinearProgress,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field, useFormik } from "formik";
// import TextField from "../components/formik/Textfield";
import validationSchema from "../validators/rental";
import { Box } from "@mui/system";
import { createMovie, getMovies } from "../axios/movies";
import { getAuthorisedToken } from "../helper/auth";
import CustomizedSnackbars, {
  defaultSnackState,
} from "../components/common/Snack";
import { getRentals } from "../axios/rentals";
import CustomSelectMovies from "../components/rental/CustomSelectMovies";
import CustomSelectCustomers from "../components/rental/CustomSelectCustomers";
import { getCustomers } from "../axios/customers";
const _ = require("lodash");

// title,genre,numberInStock,dailyRentalRate
// movie select
//    get movies - store in state
// same for customer

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

export default function RentalNew() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState(defaultSnackState);
  const [customers, setCustomers] = useState(null);
  const [movies, setMovies] = useState(null);
  console.log("movies :", movies);
  console.log("customers :", customers);

  const load = async () => {
    try {
      const resMovies = await getMovies(getAuthorisedToken());
      const resCustomers = await getCustomers(getAuthorisedToken());
      if (resMovies.status === 200 && resCustomers.status === 200) {
        setMovies(resMovies.data);
        setCustomers(resCustomers.data);
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
      customer: "",
      movie: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    setLoading(true);
    const data = _.pick(values, ["dailyRentalRate", "title", "numberInStock"]);
    data.genreId = values.genre;
    try {
      const res = await createMovie(data, getAuthorisedToken());
      if (res.status === 201) {
        setLoading(false);
        setSnack((snack) => ({
          ...snack,
          open: true,
          severity: "success",
          message: "Rental created!",
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
          Create new rental
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {customers ? (
            <CustomSelectCustomers
              title="Select customer"
              customers={customers}
              formik={formik}
              name="customer"
              className={classes.mb}
            />
          ) : (
            <Box>
              <CircularProgress />
            </Box>
          )}
          {movies ? (
            <CustomSelectMovies
              title="Select movie"
              movies={movies}
              formik={formik}
              name="movie"
              className={classes.mb}
            />
          ) : (
            <Box>
              <CircularProgress />
            </Box>
          )}
          <Typography align="center">
            <Button color="primary" variant="contained" type="submit">
              Submit
            </Button>
          </Typography>
        </form>
      </Box>
    </>
  );
}
