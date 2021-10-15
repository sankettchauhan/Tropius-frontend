import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function CustomCard({ movie }) {
  const {
    title,
    numberInStock,
    dailyRentalRate,
    genre: { name: genreName },
  } = movie;
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
        <CardContent>
          <Typography variant="h5">{title}</Typography>
          <Typography>Genre : {genreName}</Typography>
          <Typography>Daily rental rate : {dailyRentalRate}</Typography>
          <Typography>Number in stock : {numberInStock}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
