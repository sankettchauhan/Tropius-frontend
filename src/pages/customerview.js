import { Grid, makeStyles } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getCustomers } from "../axios/customers";
import CustomCard from "../components/customer/CustomCard";
import { getAuthorisedToken } from "../helper/auth";

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
}));

export default function CustomerView() {
  const classes = useStyles();

  const [customers, setCustomers] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await getCustomers(getAuthorisedToken());
      if (res.status === 200) {
        setCustomers(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
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
      <Grid container>
        {customers.map((customer, index) => (
          <>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <CustomCard key={`${customer.name}-${index + 1}`} />
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
}
