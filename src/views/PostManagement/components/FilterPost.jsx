import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Popover,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { openModalAct } from "actions/modal.action";
import ButtonCommon from "components/ButtonCommon";
import { connectToContext } from "components/ContextWrapper";
import SelectOption from "components/SelectOption";
import TextFormField from "components/TextFormField";
import kindOf from "general/Dummy/kindOf";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import BodyFormReputation from "./BodyFormReputation";

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
  setReloadData,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const _handleDeleteSearch = () => {
    onChangeSearchText("");
    setReloadData(true);
    setShowSearch(false);
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
    setShowSearch(true);
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
                  onChange={(e) => onChangeSearchText(e.target.value)}
                  margin="8 0px"
                  variant="outlined"
                  label="Tìm kiếm"
                  placeholder="Tìm kiếm..."
                  fullWidth
                  autoFocus
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
          {showSearch ? (
            <Chip
              label={`Tìm kiếm theo: ${searchText}`}
              onDelete={_handleDeleteSearch}
              color="primary"
              variant="outlined"
            />
          ) : null}
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
  onClickSearch,
  kindOfId,
  onChangeKindOf,
  typeOptions,
  statusOptions,
  setReloadData,
}) => ({
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
  setReloadData,
});
export default connectToContext(mapContextToProps)(FilterPost);
