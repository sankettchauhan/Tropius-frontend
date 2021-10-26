import { Grid, makeStyles, Typography } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getMovies } from "../axios/movies";
import CustomCard from "../components/movie/CustomCard";
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

export default function MovieView() {
  const classes = useStyles();

  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await getMovies(getAuthorisedToken());
      if (res.status === 200) {
        setMovies(res.data);
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
        List of movies
      </Typography>
      <Grid container className={classes.container} spacing={3}>
        {movies.map((movie, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={`${movie.name}-${index + 1}`}
          >
            <CustomCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
