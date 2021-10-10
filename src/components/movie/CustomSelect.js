import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
    minWidth: 120,
  },
}));

export default function CustomSelect({
  title,
  genres,
  selectedGenre,
  setSelectedGenre,
}) {
  const classes = useStyles();

  const handleChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <Box className={classes.container}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedGenre}
          label="Selected Genre"
          onChange={handleChange}
        >
          {genres.map((genre, index) => (
            <MenuItem key={`${genre}-${index}`} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
