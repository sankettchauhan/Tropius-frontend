import React, { useEffect, useState } from "react";
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
import validateCustomer from "../validators/customer";
import { Box } from "@mui/system";
import {
  createCustomer,
  getCustomerById,
  updateCustomer,
} from "../axios/customers";
import { getAuthorisedToken } from "../helper/auth";
import CustomizedSnackbars, {
  defaultSnackState,
} from "../components/common/Snack";
const _ = require("lodash");

// name, phone, isGold

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    placeItems: "center",
    width: "100%",
  },
}));

export default function CustomerNew({ edit, customerId }) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState(defaultSnackState);
  // editedState contains form details when the form is in edit mode
  const [editedState, setEditedState] = useState({});

  useEffect(() => {
    // get details of existing customer and fill them in the form
    const load = async () => {
      setLoading(true);
      try {
        const res = await getCustomerById(customerId, getAuthorisedToken());
        if (res.status === 200) {
          setEditedState(res.data);
        }
      } catch (error) {
        setSnack((snack) => ({
          ...snack,
          open: true,
          severity: "error",
          message:
            error && error.response && error.response.data
              ? error.response.data
              : "Some error occured",
        }));
      } finally {
        setLoading(false);
      }
    };

    // load details if edit details page
    if (edit) {
      load();
    }
  }, [edit, customerId]);

  // todo: complete else statement
  // takes values of formik as argument
  const handleSubmit = async (values) => {
    try {
      // new customer
      if (!edit) {
        setLoading(true);
        // get values from formik (form)
        let data = values;
        const res = await createCustomer(data, getAuthorisedToken());
        if (res.status === 200) {
          setLoading(false);
          setSnack((snack) => ({
            ...snack,
            open: true,
            severity: "success",
            message: "Customer created!",
          }));
        }
      }
      // edit details of existing customer
      else {
        setLoading(true);
        // get values from formik (form)
        let data = _.pick(values, ["name", "phone", "isGold"]);
        const res = await updateCustomer(
          customerId,
          data,
          getAuthorisedToken()
        );
        if (res.status === 200) {
          setLoading(false);
          setSnack((snack) => ({
            ...snack,
            open: true,
            severity: "success",
            message: "Customer details edited!",
          }));
        }
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

  if (loading) return <h1>Loading..</h1>;

  return (
    <>
      <Box className={classes.container}>
        <CustomizedSnackbars snack={snack} setOpen={setSnack} />
        <Typography variant="h4" gutterBottom>
          {edit ? "Edit details of customer" : "Create new customer"}
        </Typography>
        <Formik
          initialValues={
            edit
              ? { ...editedState }
              : {
                  name: "",
                  phone: "",
                  isGold: false,
                }
          }
          validate={(values) => validateCustomer(values)}
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
                <Field
                  component={TextField}
                  name="phone"
                  type="text"
                  label="Phone no"
                />
                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="isGold"
                  Label={{ label: "Is Gold?" }}
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
                    ) : edit ? (
                      "edit details"
                    ) : (
                      "create customer"
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
