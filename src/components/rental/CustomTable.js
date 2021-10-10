import React from "react";
import {
  TableContainer,
  Table,
  Paper,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

export default function CustomTable({ movieDetails }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {movieDetails.map((i, index) => (
            <TableRow
              key={`${i.label}-${index + 1}`}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {i.label}
              </TableCell>
              <TableCell align="right">{i.value}</TableCell>
            </TableRow>
          ))}
          {/* <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Title
            </TableCell>
            <TableCell align="right">{selectedMovie.title}</TableCell>
          </TableRow> */}
          {/* <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Genre
            </TableCell>
            <TableCell align="right">{selectedMovie.genre.name}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Daily rental rate
            </TableCell>
            <TableCell align="right">{selectedMovie.dailyRentalRate}</TableCell>
          </TableRow>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              Number in stock
            </TableCell>
            <TableCell align="right">{selectedMovie.numberInStock}</TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
