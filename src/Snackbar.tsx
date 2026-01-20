import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar, { type SnackbarCloseReason } from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function AutohideSnackbar({
  open,
  message,
}: {
  open: boolean;
  message: string;
}) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        message="This Snackbar will be dismissed in 5 seconds."
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
