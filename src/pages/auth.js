import React, { useState } from "react";
import {
  Button,
  CssBaseline,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import TextField from "../components/common/TextInput";
import { makeStyles } from "@material-ui/core/styles";
import { authenticateUser, createUser } from "../axios/user";
import { Formik, Form, Field } from "formik";
import {
  fieldToTextField,
  TextField,
  TextFieldProps,
  Select,
  Switch,
} from "formik-material-ui";
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
}));

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
    e.preventDefault();
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
        <Typography component="h1" variant="h5" align="center">
          {login ? "Login" : "Sign up"}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!login && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    value={form.firstname}
                    onChange={(e) =>
                      setForm((state) => ({
                        ...state,
                        firstname: e.target.value,
                      }))
                    }
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    value={form.lastname}
                    onChange={(e) =>
                      setForm((state) => ({
                        ...state,
                        lastname: e.target.value,
                      }))
                    }
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                value={form.email}
                autoFocus={login}
                onChange={(e) =>
                  setForm((state) => ({ ...state, email: e.target.value }))
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                value={form.password}
                onChange={(e) =>
                  setForm((state) => ({ ...state, password: e.target.value }))
                }
                type="password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {login ? "Login" : "Sign up"}
          </Button>
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
        </form>
      </div>
    </Container>
  );
}
