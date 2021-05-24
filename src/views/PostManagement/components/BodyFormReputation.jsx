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
import { loadingAct } from "actions/loading.action";
import SelectOption from "components/SelectOption";
import UploadComponent from "components/UploadComponent";
import { useInputText } from "general/CustomHook";
import types from "general/Dummy/types";
import { sleep } from "general/helper";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";

const typeOptions = [...types].splice(1);

function BodyFormReputation(props) {
  const [type, setType] = useState(typeOptions[0]);

  const [listTypeInput, setListType] = useState([]);
  const [fileImages, setFileImage] = useState([]);

  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);

  const dispatch = useDispatch();

  const titleReport = useInputText(
    "",
    yup.string().required("trường này là bắt buộc").max(150)
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

  const _onUploadFile = async (e) => {
    const { files } = e.target;
    const fileList = [];
    for (let i of files) {
      let reader = new FileReader();
      let url = await reader.readAsDataURL(i);
      reader.onloadend = async function (m) {
        fileList.push(reader.result);
        const cloneImageList = [...fileImages, ...fileList];
        await setFileImage(cloneImageList);
      };
    }
  };
  const _onDeleteImage = (image) => {
    let cloneListImage = [...fileImages];
    const index = fileImages.findIndex((i) => i == image);
    if (index != -1) {
      cloneListImage.splice(index, 1);
      setFileImage(cloneListImage);
    }
  };

  const _validateData = () => {
    if (!titleReport.value || titleReport.value.length === 0) {
      dispatch(addAlert("Trường title là bắt buộc", "error"));
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
    await sleep(1500);
    props.onConfirm();
    dispatch(loadingAct(false));
    dispatch(
      addAlert("gửi báo cáo lừa đảo thành công và đang chờ duyệt", "success")
    );
  };

  const _onCancel = () => {
    props.onConfirm();
  };

  const _closeDialogConfirm = () => {
    setOpenDialogConfirm(false);
  };

  const _openDialogConfirm = () => {
    setOpenDialogConfirm(true);
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Title"
            placeholder="Nhập title, phần này được xem như một trường tìm kiếm"
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
                          helperText={
                            !Boolean(item.data)
                              ? "*Trường này là bắt buộc"
                              : null
                          }
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
                  placeholder="Mô tả thêm..."
                  size="small"
                  fullWidth
                  rows={6}
                  multiline
                  {...description}
                />
              </Box>
              <Box marginBottom="12px">
                {/* <DropzoneArea onChange={_uploadFile} /> */}
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
                          onClick={() => _onDeleteImage(ima)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <img
                          src={ima}
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
          Cam đoan những điều bạn vừa điền là chính xác
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

BodyFormReputation.propTypes = {};

export default BodyFormReputation;
