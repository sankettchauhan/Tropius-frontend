import React, { useState } from "react";
import {
  Button,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import { CheckboxWithLabel } from "formik-material-ui";
import TextField from "../components/formik/Textfield";
import validateGenre from "../validators/genre";
import { Box } from "@mui/system";
import { createGenre } from "../axios/genres";
import { getAuthorisedToken } from "../helper/auth";
import CustomizedSnackbars, {
  defaultSnackState,
} from "../components/common/Snack";
const _ = require("lodash");

// name

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    placeItems: "center",
    width: "100%",
  },
}));

export default function GenreNew() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState(defaultSnackState);

  const handleSubmit = async (values) => {
    setLoading(true);
    const data = values;
    try {
      const res = await createGenre(data, getAuthorisedToken());
      if (res.status === 201) {
        setLoading(false);
        setSnack((snack) => ({
          ...snack,
          open: true,
          severity: "success",
          message: "Genre created!",
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
          Create new genre
        </Typography>
        <Formik
          initialValues={{
            name: "",
          }}
          validate={(values) => validateGenre(values)}
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
                  name="name"
                  type="text"
                  label="Name"
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
                      "create genre"
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
