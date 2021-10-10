import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  gold: {
    backgroundColor: "#FFD700",
    width: "100%",
    display: "inline-block",
    textAlign: "center",
    transform: "rotate(45deg)",
    position: "absolute",
    top: "18%",
    right: "-40%",
  },
});

export default function CustomCard({ customer }) {
  const classes = useStyles();
  const { name, phone, isGold } = customer;
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
          <Typography variant="h5">{name}</Typography>
          <Typography>{phone}</Typography>
        </CardContent>
        {isGold && <span className={classes.gold}>Gold</span>}
      </Card>
    </Box>
  );
}
