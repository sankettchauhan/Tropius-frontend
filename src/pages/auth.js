import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Container,
  LinearProgress,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { authenticateUser, createUser } from "../axios/user";
import { Formik, Form, Field } from "formik";
import CustomizedSnackbars from "../components/common/Snack";
import TextField from "../components/formik/Textfield";
import { addAuthorisedTokenToStorage } from "../helper/auth";
const _ = require("lodash");

const useStyles = makeStyles((theme) => ({
  paper: {},
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: { cursor: "pointer", "&:hover": { textDecoration: "underline" } },
  container: {
    height: "100vh",
    display: "grid",
    placeItems: "center",
  },
  textinput: {
    marginBottom: theme.spacing(2),
  },
}));

export default function Auth({ history }) {
  const classes = useStyles();
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleClick = () => setLogin((state) => !state);

  const handleSubmit = async (values) => {
    setLoading(true);
    let user;
    if (login) user = _.pick(values, ["email", "password"]);
    else user = values;
    try {
      const res = login ? await authenticateUser(user) : await createUser(user);
      setLoading(false);
      addAuthorisedTokenToStorage(res.data);
      history.push("/");
    } catch (error) {
      setSnack((snack) => ({
        open: true,
        message: error.response.data,
        severity: "error",
      }));
      console.error(error.response);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CustomizedSnackbars snack={snack} setOpen={setSnack} />
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          {login ? "Login" : "Sign up"}
        </Typography>

        <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!login) {
              if (!values.name) {
                errors.name = "Required";
              }
            }
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
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
        <Grid container justify="flex-end">
          <Grid item>
            <Typography className={classes.text} color="primary">
              {login ? (
                <>
                  Don't have an account?{" "}
                  <span className={classes.link} onClick={handleClick}>
                    Create one
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span className={classes.link} onClick={handleClick}>
                    Login
                  </span>
                </>
              )}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
