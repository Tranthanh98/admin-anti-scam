import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Popover,
} from "@material-ui/core";
import ButtonCommon from "components/ButtonCommon";
import { connectToContext } from "components/ContextWrapper";
import SelectOption from "components/SelectOption";
import TextFormField from "components/TextFormField";
import types from "general/Dummy/types";
import React, { useState } from "react";
import status from "../../../general/Dummy/statusPost";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { openModalAct } from "actions/modal.action";
import BodyFormReputation from "./BodyFormReputation";
import { useDispatch } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import kindOf from "general/Dummy/kindOf";

function FilterPost({
  typeId,
  onChangeType,
  searchText,
  onChangeSearchText,
  statusId,
  onChangeStatus,
  onClickSearch,
  kindOfId,
  onChangeKindOf,
  typeOptions,
  statusOptions,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const _createNewReputation = () => {
    let modalData = {
      title: "Bài đăng uy tín",
      body: <BodyFormReputation />,
      style: {
        fullWidth: true,
        maxWidth: "md",
      },
    };
    dispatch(openModalAct(modalData));
  };

  const _onClickSearch = () => {
    onClickSearch();
    handleClose();
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SelectOption
            value={typeOptions.find((i) => i.value == typeId)}
            onChange={onChangeType}
            options={typeOptions}
            label="Thể loại"
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <SelectOption
            value={statusOptions.find((i) => i.value == statusId)}
            onChange={onChangeStatus}
            options={statusOptions}
            label="Trạng thái"
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <SelectOption
            value={kindOf.find((i) => i.value == kindOfId)}
            onChange={onChangeKindOf}
            options={kindOf}
            label="Loại"
            size="small"
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton onClick={handleClick} id={id} variant="contained">
            <SearchIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Card>
              <CardContent>
                <TextFormField
                  value={searchText}
                  onChange={onChangeSearchText}
                  margin="8 0px"
                  variant="outlined"
                  label="Tìm kiếm"
                  placeholder="Tìm kiếm..."
                  fullWidth
                />
                <Box marginTop="8px">
                  <ButtonCommon onClick={_onClickSearch}>Tìm kiếm</ButtonCommon>
                </Box>
              </CardContent>
            </Card>
          </Popover>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ButtonCommon onClick={_createNewReputation} size="medium">
            Tạo bài đăng uy tín
          </ButtonCommon>
        </Grid>
      </Grid>
    </Box>
  );
}

FilterPost.propTypes = {};

const mapContextToProps = ({
  typeId,
  onChangeType,
  searchText,
  onChangeSearchText,
  statusId,
  onChangeStatus,
  dateRange,
  onChangeDateRange,
  onClickSearch,
  kindOfId,
  onChangeKindOf,
  typeOptions,
  statusOptions,
}) => ({
  typeId,
  onChangeType,
  searchText,
  onChangeSearchText,
  statusId,
  onChangeStatus,
  dateRange,
  onChangeDateRange,
  onClickSearch,
  kindOfId,
  onChangeKindOf,
  typeOptions,
  statusOptions,
});
export default connectToContext(mapContextToProps)(FilterPost);
