import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Button, makeStyles } from "@material-ui/core";
import { getAuthorisedToken } from "../../helper/auth";
import { postReturn } from "../../axios/returns";

const dateToString = (dateString) => {
  const date = new Date(dateString);
  const dString = date.toLocaleDateString();
  const tString = date.toTimeString().split(" ")[0];
  return dString + " " + tString;
};

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: theme.spacing(1),
  },
  cardcontent: {
    padding: `${theme.spacing(2)}px!important`,
  },
  date: {
    fontWeight: "700",
  },
}));

export default function CustomCard({ rental, count, disabled }) {
  const classes = useStyles();

  const { customer, movie, dateOut, dateReturned, rentalFee } = rental;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      customerId: customer._id,
      movieId: movie._id,
    };
    try {
      const res = await postReturn(data, getAuthorisedToken());
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.error(error.response);
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "100%", height: "100%" }}>
      <Card
        variant="outlined"
        sx={{
          boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.2)",
          height: "100%",
          position: "relative",
        }}
      >
        <CardContent className={classes.cardcontent}>
          <Typography variant="h5">Rental {count}</Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6">Customer details</Typography>
              <Typography>{customer.name}</Typography>
              <Typography>{customer.phone}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">Movie details</Typography>
              <Typography>{movie.title}</Typography>
              <Typography>
                Daily rental rate: {movie.dailyRentalRate}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Rental processed at{" "}
                <span className={classes.date}>{dateToString(dateOut)}</span>
              </Typography>
            </Grid>
            {dateReturned && (
              <Grid item xs={12}>
                <Typography>
                  Return processed at{" "}
                  <span className={classes.date}>
                    {dateToString(dateReturned)}
                  </span>
                </Typography>
              </Grid>
            )}
            {rentalFee !== undefined && (
              <Grid item xs={12}>
                <Typography>
                  Rental fee <span className={classes.date}>{rentalFee}</span>
                </Typography>
              </Grid>
            )}
          </Grid>
          {loading ? (
            <span>loading..</span>
          ) : (
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.button}
              onClick={handleSubmit}
              disabled={disabled}
            >
              return
            </Button>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
