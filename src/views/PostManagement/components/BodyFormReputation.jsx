import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { addAlert } from "actions/alertify.action";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { loadingAct } from "actions/loading.action";
import SelectOption from "components/SelectOption";
import UploadComponent from "components/UploadComponent";
import { useInputText } from "general/CustomHook";
import * as httpClient from "general/HttpClient";

function BodyFormReport(props) {
  const [type, setType] = useState(
    props.typeOptions ? props.typeOptions[0] : null
  );

  const [listTypeInput, setListType] = useState([]);
  const [fileImages, setFileImage] = useState([]);

  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  const dispatch = useDispatch();

  const titleReport = useInputText(
    "",
    yup.string().required("Bắt buộc").max(150)
  );

  const description = useInputText("");

  const _onChangeType = (value) => {
    setType(value);
  };

  const _onClickAddType = () => {
    let cloneList = [...listTypeInput];
    let dataType = {
      type: type,
      data: null,
    };
    cloneList.push(dataType);
    setListType(cloneList);
  };

  const _onDeleteForm = (item) => {
    let cloneList = [...listTypeInput];
    let indexItem = listTypeInput.findIndex((i) => i == item);
    cloneList.splice(indexItem, 1);
    setListType(cloneList);
  };

  const _onChangeValueType = (e, item) => {
    let cloneList = [...listTypeInput];
    let findItem = cloneList.find((i) => i == item);
    findItem.data = e.target.value;
    setListType(cloneList);
  };

  const _onUploadFile = async (imgList) => {
    let cloneImgList = [...fileImages, ...imgList];
    setFileImage(cloneImgList);
  };
  const _onDeleteImage = async (imageId) => {
    try {
      let response = await httpClient.sendGet("/file/DeleteFile?id=" + imageId);
      if (response.data.isSuccess) {
        let cloneListImage = [...fileImages];
        const index = fileImages.findIndex((i) => i.fileId == imageId);
        if (index != -1) {
          cloneListImage.splice(index, 1);
          setFileImage(cloneListImage);
        }
        dispatch(addAlert("Xóa ảnh thành công", "success"));
      } else {
        throw new Error(response.data.messages);
      }
    } catch (e) {
      console.error(String(e));
      dispatch(addAlert("Có lỗi xảy ra khi xóa ảnh", "error"));
    }
  };

  const _validateData = () => {
    if (!titleReport.value || titleReport.value.length === 0) {
      dispatch(addAlert("Trường 'Tiêu đề' là bắt buộc", "error"));
      return false;
    }
    if (listTypeInput.length === 0) {
      dispatch(addAlert("Chọn ít nhất 1 thể loại", "error"));
      return false;
    }
    for (let item of listTypeInput) {
      if (!item.data || item.data.length === 0) {
        dispatch(addAlert("Điền đầy đủ các trường", "error"));
        return false;
      }
    }
    return true;
  };

  const _onConfirm = async () => {
    if (!_validateData()) {
      return;
    }
    dispatch(loadingAct(true));
    try {
      let dataModel = {
        title: titleReport.value,
        description: description.value.replaceAll("\n", "<br/>"),
        kindOf: props.kindOf,
        typePostList: listTypeInput.map((i) => ({
          typeId: i.type.value,
          object: i.data,
        })),
        imageIds: fileImages.map((i) => i.fileId),
      };
      let response = await httpClient.sendPost(
        "/PostManager/Create",
        dataModel
      );
      if (!response.data.isSuccess) {
        throw new Error(response.data.messages);
      }
      props.onConfirm();
      props.getData && props.getData();
    } catch (e) {
      console.error(String(e));
      dispatch(addAlert(String(e), "error"));
    } finally {
      dispatch(loadingAct(false));
    }
  };

  const _deleteAllFileClosing = async () => {
    try {
      const listId = fileImages.map((i) => i.fileId);
      let resonpse = await httpClient.sendPost(
        "/file/DeleteMultipleFile",
        listId
      );
      if (!resonpse.data.isSuccess) {
        throw new Error(resonpse.data.messages);
      }
      dispatch(addAlert("Xóa ảnh thành công", "success"));
    } catch (e) {
      console.error(String(e));
      dispatch(addAlert("Có lỗi xảy ra khi xóa ảnh", "error"));
    }
  };

  const _onCancel = () => {
    props.onConfirm(_deleteAllFileClosing);
  };

  const _closeDialogConfirm = () => {
    setOpenDialogConfirm(false);
  };

  const _openDialogConfirm = () => {
    setOpenDialogConfirm(true);
  };
  let typeOptions = [];
  const findUndefinedType = props.typeOptions.findIndex((i) => i.value == 0);
  if (findUndefinedType != -1) {
    let clone = [...props.typeOptions];
    clone.splice(findUndefinedType, 1);
    typeOptions = clone;
  } else {
    typeOptions = props.typeOptions;
  }
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Tiêu đề"
            placeholder={
              props.placeholder
                ? props.placeholder
                : "Ví dụ: Tố cáo lừa đảo mua bán tiền điện tử"
            }
            size="small"
            fullWidth
            {...titleReport}
            required
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={1}>
                <Grid item xs={8} md={9}>
                  <SelectOption
                    value={type}
                    onChange={_onChangeType}
                    options={typeOptions}
                    label="Thể loại"
                    size="small"
                    error={listTypeInput.length === 0}
                    helperText={
                      listTypeInput.length === 0
                        ? "Chọn ít nhất 1 thể loại để báo cáo"
                        : undefined
                    }
                  />
                </Grid>
                <Grid item xs={4} md={3}>
                  <Button onClick={_onClickAddType} variant="contained">
                    Thêm
                  </Button>
                </Grid>
                {listTypeInput.map((item, index) => {
                  return (
                    <Grid key={index} item xs={12}>
                      <Box display="flex" marginBottom="12px">
                        <TextField
                          variant="outlined"
                          label={item.type.label}
                          placeholder={`Nhập ${item.type.label}`}
                          size="small"
                          fullWidth
                          value={item.data || ""}
                          onChange={(e) => _onChangeValueType(e, item)}
                          error={!Boolean(item.data)}
                          helperText={!Boolean(item.data) ? "*Bắt buộc" : null}
                        />
                        <IconButton
                          style={{ width: 40, height: 40 }}
                          onClick={() => _onDeleteForm(item)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box marginBottom="12px">
                <TextField
                  variant="outlined"
                  label="Mô tả"
                  placeholder="Mô tả thêm về câu chuyện của bạn..."
                  size="small"
                  fullWidth
                  rows={6}
                  multiline
                  {...description}
                />
              </Box>
              <Box marginBottom="12px">
                <UploadComponent onChange={_onUploadFile} />
              </Box>
              <Grid container spacing={1}>
                {fileImages.map((ima, index) => {
                  return (
                    <Grid
                      key={index}
                      item
                      xs={6}
                      sm={4}
                      style={{ maxHeight: 150 }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        width="100%"
                        height="100%"
                        position="relative"
                      >
                        <IconButton
                          style={{ position: "absolute", top: 0, right: -15 }}
                          onClick={() => _onDeleteImage(ima.fileId)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <img
                          src={ima.url}
                          style={{ maxWidth: "100%", maxHeight: "100%" }}
                        />
                      </Box>
                    </Grid>
                  );
                })}
                {/* <Grid item xs={1} sm={4}>
                    
                </Grid> */}
              </Grid>
              {/* <Box display="block"></Box> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
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
      <Dialog open={openDialogConfirm} onClose={_closeDialogConfirm}>
        <DialogContent>
          Xác nhận những điều bạn vừa báo cáo là chính xác
        </DialogContent>
        <DialogActions>
          <Button
            onClick={_closeDialogConfirm}
            variant="contained"
            color="inherit"
          >
            Hủy
          </Button>
          <Button onClick={_onConfirm} variant="contained" color="primary">
            Xác nhận và gửi
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

BodyFormReport.propTypes = {};

export default BodyFormReport;
