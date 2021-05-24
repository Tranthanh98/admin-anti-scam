import React from "react";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";
import TextFormField from "components/TextFormField";
import { connectToContext } from "components/ContextWrapper";
import userRoles from "general/Dummy/userRole";
import SelectOption from "components/SelectOption";

function UserFilter({ searchText, onChangeSearchText, roleId, onChangeRole }) {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextFormField
            value={searchText}
            onChange={onChangeSearchText}
            margin="8 0px"
            variant="outlined"
            label="Tìm kiếm theo tên"
            placeholder="Nhập tên..."
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <SelectOption
            value={userRoles.find((i) => i.value == roleId)}
            onChange={onChangeRole}
            options={userRoles}
            label="Loại"
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
}) => ({
  searchText,
  onChangeSearchText,
  roleId,
  onChangeRole,
});

export default connectToContext(mapContextToProps)(UserFilter);
