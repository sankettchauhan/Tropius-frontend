import { Grid, makeStyles, Typography } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { deleteCustomer, getCustomers } from "../axios/customers";
import CustomCard from "../components/customer/CustomCard";
import { getAuthorisedToken } from "../helper/auth";
import CustomizedSnackbars, {
  defaultSnackState,
} from "../components/common/Snack";

// send req to get all customers
// load in state
// render on frontend
//    show loading when req is in progress
//    show list of customers in a card

const useStyles = makeStyles((theme) => ({
  loading: {
    display: "inline-block",
    position: "relative",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  container: {
    marginTop: theme.spacing(1),
  },
}));

export default function CustomerView() {
  const classes = useStyles();

  const [customers, setCustomers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snack, setSnack] = useState(defaultSnackState);

  const load = async () => {
    try {
      const resCustomers = await getCustomers(getAuthorisedToken());
      if (resCustomers.status === 200) {
        setCustomers(resCustomers.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
    }
  };

  const handleDelete = async (customerid) => {
    try {
      await deleteCustomer(customerid, getAuthorisedToken());
      setSnack((snack) => ({
        open: true,
        severity: "success",
        message: "Customer deleted successfully!",
      }));
      load();
    } catch (error) {
      console.error("Error: ", error);
      setSnack((snack) => ({
        open: true,
        severity: "error",
        message: "Some error occured.",
      }));
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading)
    return (
      <Box className={classes.loading}>
        <CircularProgress size={60} />
      </Box>
    );

  return (
    <>
      <CustomizedSnackbars snack={snack} setOpen={setSnack} />
      <Typography sx={{ marginLeft: "1em" }} variant="h4" gutterBottom>
        List of customers
      </Typography>
      <Grid container className={classes.container} spacing={3}>
        {/* display all customers */}
        {customers.map((customer, index) => {
          let customerData = customer;
          // editlink = /customers/edit/:customerid
          customerData.editLink = `/customers/edit/${customer._id}`;
          customerData.deleteLink = () => handleDelete(customer._id);
          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={`${customer.name}-${index + 1}`}
            >
              <CustomCard customer={customerData} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
