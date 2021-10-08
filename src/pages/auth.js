import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Container,
  LinearProgress,
  Box,
} from "@material-ui/core";
import MuiTextField from "@material-ui/core/TextField";
import CustomTextField from "../components/common/TextInput";
import { makeStyles } from "@material-ui/core/styles";
import { authenticateUser, createUser } from "../axios/user";
import { Formik, Form, Field } from "formik";
import { fieldToTextField, TextFieldProps } from "formik-material-ui";
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
  link: {
    textDecoration: "none",
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

function TextField(props) {
  const {
    form: { setFieldValue },
    field: { name },
  } = props;
  // const onChange = React.useCallback(
  //   (event) => {
  //     const { value } = event.target;
  //     setFieldValue(name, value ? value.toUpperCase() : "");
  //   },
  //   [setFieldValue, name]
  // );
  const classes = useStyles();
  return (
    <MuiTextField
      {...fieldToTextField(props)}
      // onChange={onChange}
      variant="outlined"
      className={classes.textinput}
      fullWidth
    />
  );
}

export default function Auth({ history }) {
  const classes = useStyles();
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [login, setLogin] = useState(true);

  const handleClick = () => setLogin((state) => !state);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    let user = {
      email: form.email,
      password: form.password,
    };
    if (!login) user.name = `${form.firstname} ${form.lastname}`;
    try {
      const res = login ? await authenticateUser(user) : await createUser(user);
      console.log(res);
    } catch (error) {}
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          {login ? "Login" : "Sign up"}
        </Typography>

        <Formik
          initialValues={{
            email: "",
            password: "",
            firstname: "",
            lastname: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!login) {
              if (!values.firstname) {
                errors.firstname = "Required";
              }
              if (!values.lastname) {
                errors.lastname = "Required";
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
            console.log(values);
            // handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              {!login && (
                <Field
                  component={TextField}
                  name="firstname"
                  type="firstname"
                  label="Firstname"
                />
              )}
              {!login && (
                <Field
                  component={TextField}
                  name="lastname"
                  type="lastname"
                  label="Lastname"
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
                  disabled={isSubmitting}
                  onClick={submitForm}
                >
                  Submit
                </Button>
              </Typography>
            </Form>
          )}
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
