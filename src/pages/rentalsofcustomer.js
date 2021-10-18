import {
  CircularProgress,
  makeStyles,
  Grid,
  Typography,
} from "@material-ui/core";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getRentalsOfCustomer } from "../axios/rentals";
import CustomCardForCustomer from "../components/rental/CustomCardForCustomer";
import { getAuthorisedToken } from "../helper/auth";

const useStyles = makeStyles((theme) => ({
  loading: {
    display: "inline-block",
    position: "relative",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  container: {
    // padding: "1em",
  },
}));

export default function Rentalsofcustomer({ match }) {
  const classes = useStyles();
  const customerId = match.params.customerid;

  const [rentals, setRentals] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(rentals);

  const load = async () => {
    try {
      const res = await getRentalsOfCustomer(customerId, getAuthorisedToken());
      if (res.status === 200) {
        const processedRentals = res.data.filter((r) =>
          Boolean(r.dateReturned)
        );
        const unprocessedRentals = res.data.filter(
          (r) => !Boolean(r.dateReturned)
        );
        setRentals({
          processed: processedRentals,
          unprocessed: unprocessedRentals,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error(error.response);
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

  if (rentals.processed.length === 0 && rentals.unprocessed.length === 0)
    return <Typography>This customer has no rentals.</Typography>;

  return (
    <>
      <Typography sx={{ marginLeft: "1em" }} variant="h4" gutterBottom>
        List of rentals
      </Typography>
      <Grid container className={classes.container} spacing={3}>
        {rentals.unprocessed.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="h5">Unprocessed rentals</Typography>
            </Grid>
            {rentals.unprocessed.map((rental, index) => (
              <>
                <Grid item xs={12} md={4} lg={3} key={`rental-${index + 1}`}>
                  <CustomCardForCustomer rental={rental} count={index + 1} />
                </Grid>
              </>
            ))}
          </>
        )}
        {rentals.processed.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="h5">Processed rentals</Typography>
            </Grid>
            {rentals.processed.map((rental, index) => (
              <Grid item xs={12} md={4} lg={3} key={`rental-${index + 1}`}>
                <CustomCardForCustomer
                  rental={rental}
                  count={index + 1}
                  disabled={true}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  );
}
