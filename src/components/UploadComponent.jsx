import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { addAlert } from "actions/alertify.action";
import { loadingAct } from "actions/loading.action";
import * as httpClient from "general/HttpClient";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
  const [files, setFiles] = useState();
  const dispatch = useDispatch();

  const _onFileChange = async (e) => {
    dispatch(loadingAct(true));
    var { files } = e.target;

    var formData = new FormData();

    for (let file of files) {
      formData.append("files", file);
    }

    var reader = new FileReader();
    var url = reader.readAsDataURL(files[0]);
    reader.onloadend = async function (eve) {
      try {
        let response = await httpClient.upload("/file/UploadFile", formData);
        if (response.data.isSuccess) {
          setFiles(response.data.data);
        } else {
          throw new Error(response.data.messages);
        }
      } catch (e) {
        dispatch(addAlert(String(e), "error"));
      } finally {
        dispatch(loadingAct(false));
      }
    };
  };
  useEffect(() => {
    if (files) {
      onChange(files);
    }
  }, [files]);
  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={_onFileChange}
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
