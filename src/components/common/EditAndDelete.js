import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function EditAndDelete({ editLink, customerid, deleteLink }) {
  const history = useHistory();
  const handleEdit = (e) => {
    e.stopPropagation();
    history.push(editLink);
  };

  return (
    <Box sx={{ width: "100%", textAlign: "right" }}>
      <Box>
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={async () => await deleteLink()}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
