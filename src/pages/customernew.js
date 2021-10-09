import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from "formik";
import TextField from "../components/formik/Textfield";
import validateCustomer from "../validators/customer";
const _ = require("lodash");

// name, phone, isGold

const useStyles = makeStyles((theme) => ({}));

export default function customernew() {
  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          phone: "",
          isGold: "",
        }}
        validate={(values) => validateCustomer(values)}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({ submitForm, isSubmitting, touched, errors }) => {
          return (
            <Form>
              {!login && (
                <Field
                  component={TextField}
                  name="name"
                  type="name"
                  label="Name"
                />
              )}
              <Field
                component={TextField}
                name="email"
                type="email"
                label="Email"
              />
              <Field
                component={TextField}
                type="password"
                label="Password"
                name="password"
              />
              {isSubmitting && <LinearProgress />}
              <Typography align="right" gutterBottom>
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
                    "Submit"
                  )}
                </Button>
              </Typography>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
