import { Grid, makeStyles, Typography } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getRentals } from "../axios/rentals";
import CustomCard from "../components/rental/CustomCard";
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

export default function RentalView() {
  const classes = useStyles();

  const [rentals, setRentals] = useState({});
  const [loading, setLoading] = useState(true);
  console.log("rentals view: ", rentals);

  const load = async () => {
    try {
      const res = await getRentals(getAuthorisedToken());
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
      <Typography sx={{ marginLeft: "1em" }} variant="h4" gutterBottom>
        List of rentals
      </Typography>
      <Grid container className={classes.container} spacing={3}>
        {rentals.unprocessed.map((rental, index) => (
          <Grid item xs={12} md={6} lg={4} key={`rental-${index + 1}`}>
            <CustomCard rental={rental} count={index + 1} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="h5">Processed rentals</Typography>
        </Grid>
        {rentals.processed.map((rental, index) => (
          <Grid item xs={12} md={6} lg={4} key={`rental-${index + 1}`}>
            <CustomCard rental={rental} count={index + 1} disabled={true} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
