import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { clearNotification } from "app/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = () => {
  const notify = useSelector((state) => state.notify);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearNotification());
  };

  return (
    <>
      {notify.message ? (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={3000}
          open={true}
          onClose={handleClose}
          key="topright"
        >
          <Alert severity={notify.type} onClose={handleClose}>
            {notify.message}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
};

export default Notification;
