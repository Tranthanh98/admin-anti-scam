import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

function UploadComponent({ title, onChange }) {
  const classes = useStyles();
  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={onChange}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          {title ?? "Tải ảnh lên"}
        </Button>
      </label>
    </div>
  );
}

UploadComponent.propTypes = {};

export default UploadComponent;
