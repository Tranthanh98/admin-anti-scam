import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Card, CardContent } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { loadingAct } from "actions/loading.action";
import * as httpClient from "general/HttpClient";
import { addAlert } from "actions/alertify.action";
import SelectOption from "components/SelectOption";

function PopupConfirmDelete(props) {
  const [typeReplace, setTypeReplace] = useState(props.typeOptions[0].value);

  const _onCancel = () => {
    props.onConfirm && props.onConfirm();
  };

  const _onChangeType = (value) => {
    setTypeReplace(value.value);
  };

  const dispatch = useDispatch();

  const _openDialogConfirm = async () => {
    dispatch(loadingAct(true));
    try {
      const res = await httpClient.sendPost("/SystemManager/Delete", {
        id: props.idDelete,
        idReplace: typeReplace,
      });
      if (res.data.isSuccess) {
        _onCancel();
        props.getData && props.getData();
      } else {
        throw new Error(res.data.messages);
      }
    } catch (e) {
      dispatch(addAlert(String(e), "error"));
    } finally {
      dispatch(loadingAct(false));
    }
  };
  console.log("props.typeOptions:", props.typeOptions);
  return (
    <Box>
      <Box margin="8px 0">
        Các bài viết của thể loại này sẽ được chuyển sang một thể loại khác
      </Box>
      <Box margin="8px 0">Vui lòng chọn 1 thể loại:</Box>
      <Box>
        <SelectOption
          value={props.typeOptions.find((i) => i.value == typeReplace)}
          onChange={_onChangeType}
          options={props.typeOptions}
          label="Thể loại"
          size="small"
        />
      </Box>
      <Box marginTop="20px" display="flex" justifyContent="center">
        <Button onClick={_onCancel} variant="contained" color="inherit">
          Hủy bỏ
        </Button>
        <Box margin="16px 0" width="16px"></Box>
        <Button
          onClick={_openDialogConfirm}
          variant="contained"
          color="primary"
        >
          Xác nhận
        </Button>
      </Box>
    </Box>
  );
}

PopupConfirmDelete.propTypes = {};

export default PopupConfirmDelete;
