import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

export default function CheckboxLabels({ genres, formik, name, className }) {
  const handleClick = (e) => {
    const genre = JSON.parse(e.target.value);
    if (e.target.checked) {
      formik.values.genres.push(genre);
    } else {
      formik.values.genres = formik.values.genres.filter(
        (g) => g._id !== genre._id
      );
    }
  };

  return (
    <Box className={className} name={name}>
      <FormGroup
        sx={{ "&": { flexDirection: "row" } }}
        error={formik.touched.genres && Boolean(formik.errors.genres)}
      >
        {genres.map((genre) => (
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                onChange={handleClick}
                value={JSON.stringify(genre)}
              />
            }
            label={genre.name}
            sx={{
              "& span": { padding: 0 },
              "&": { margin: 0, marginRight: "5px" },
            }}
            key={`movie-genre-${genre.name}`}
          />
        ))}
      </FormGroup>
      {formik.touched.genres && formik.errors.genres && (
        <FormHelperText error>{formik.errors.genres}</FormHelperText>
      )}
    </Box>
  );
}
