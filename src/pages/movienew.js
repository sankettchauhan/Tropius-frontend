import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  LinearProgress,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { Select } from "formik-material-ui";
import TextField from "../components/formik/Textfield";
import validateMovie from "../validators/movie";
import { Box } from "@mui/system";
import { createMovie } from "../axios/movies";
import { getAuthorisedToken } from "../helper/auth";
import CustomizedSnackbars, {
  defaultSnackState,
} from "../components/common/Snack";
import { getGenres } from "../axios/genres";
import CustomSelect from "../components/movie/CustomSelect";
const _ = require("lodash");

// title,genre,numberInStock,dailyRentalRate

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    placeItems: "center",
    width: "100%",
  },
  loading: {
    marginBottom: theme.spacing(2),
  },
}));

export default function MovieNew() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState(defaultSnackState);
  const [genres, setGenres] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState("");

  const load = async () => {
    try {
      const res = await getGenres(getAuthorisedToken());
      if (res.status === 200) {
        setGenres(res.data.map((d) => d.name));
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (values) => {
    setLoading(true);
    const data = values;
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
        <Formik
          initialValues={{
            title: "",
            numberInStock: 0,
            dailyRentalRate: 0,
          }}
          validate={(values) => validateMovie(values)}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ submitForm, isSubmitting, touched, errors }) => {
            return (
              <Form>
                <Field
                  component={TextField}
                  name="title"
                  type="text"
                  label="Title"
                />

                {genres ? (
                  <CustomSelect
                    genres={genres}
                    title={"Select genre"}
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                  />
                ) : (
                  <Typography align="center" className={classes.loading}>
                    <CircularProgress />
                  </Typography>
                )}

                {/* <FormControl>
                  <InputLabel htmlFor="age-simple">Genre</InputLabel>
                  <Field
                    component={Select}
                    name="genre"
                    // inputProps={{
                    //   id: "age-simple",
                    // }}
                  >
                    {genres.map((genre, index) => (
                      <MenuItem key={`${genre}-${index + 1}`} value={genre}>
                        {genre}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl> */}
                <Field
                  component={TextField}
                  name="dailyRentalRate"
                  type="text"
                  label="Daily rental rate"
                />
                <Field
                  component={TextField}
                  name="numberInStock"
                  type="text"
                  label="Number in stock"
                />
                {isSubmitting && <LinearProgress />}
                <Typography align="center" gutterBottom>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || !_.isEmpty(errors)}
                    onClick={submitForm}
                  >
                    {loading ? (
                      <CircularProgress
                        color="inherit"
                        className={classes.circle}
                      />
                    ) : (
                      "create movie"
                    )}
                  </Button>
                </Typography>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
}
