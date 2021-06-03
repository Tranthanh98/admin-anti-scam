import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";
import TextFormField from "components/TextFormField";
import { connectToContext } from "components/ContextWrapper";
import userRoles from "general/Dummy/userRole";
import SelectOption from "components/SelectOption";
import debounce from "lodash.debounce";

function UserFilter({
  searchText,
  onChangeSearchText,
  roleId,
  onChangeRole,
  adminRoles,
  adminStatus,
  statusId,
  onChangeStatus,
}) {
  const [search, setSearch] = useState("");

  const _debounceSetSearchText = useCallback(
    debounce((nextValue) => onChangeSearchText(nextValue), 800),
    []
  );

  const _onChangeSearchText = (e) => {
    const { value } = e.target;
    setSearch(value);
    _debounceSetSearchText(value);
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextFormField
            value={search}
            onChange={_onChangeSearchText}
            margin="8 0px"
            variant="outlined"
            label="Tìm kiếm theo tên"
            placeholder="Nhập tên..."
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <SelectOption
            value={adminRoles.find((i) => i.value == roleId)}
            onChange={onChangeRole}
            options={adminRoles}
            label="Loại"
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <SelectOption
            value={adminStatus.find((i) => i.value == statusId)}
            onChange={onChangeStatus}
            options={adminStatus}
            label="Trạng thái"
            size="small"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

UserFilter.propTypes = {};

const mapContextToProps = ({
  searchText,
  onChangeSearchText,
  roleId,
  onChangeRole,
  adminRoles,
  statusId,
  adminStatus,
  onChangeStatus,
}) => ({
  searchText,
  onChangeSearchText,
  roleId,
  onChangeRole,
  adminRoles,
  statusId,
  adminStatus,
  onChangeStatus,
});

export default connectToContext(mapContextToProps)(UserFilter);
