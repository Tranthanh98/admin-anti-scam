import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: 9999,
    color: "#fff",
  },
}));

export default function LoadingComponent() {
  const classes = useStyles();
  const loading = useSelector((state) => state.loadingReducer);
  return (
    <div>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
