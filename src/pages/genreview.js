import { List, ListItem, makeStyles, Typography } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { getGenres } from "../axios/genres";
import { getAuthorisedToken } from "../helper/auth";

const useStyles = makeStyles((theme) => ({
  loading: {
    display: "inline-block",
    position: "relative",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

export default function GenreView() {
  const classes = useStyles();

  const [genres, setGenres] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await getGenres(getAuthorisedToken());
      if (res.status === 200) {
        setGenres(res.data);
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
        List of genres
      </Typography>
      <List dense>
        {genres.map((genre, index) => (
          <ListItem key={`${genre.name}-${index + 1}`}>
            <Typography variant="h5">{genre.name}</Typography>
          </ListItem>
        ))}
      </List>
    </>
  );
}
