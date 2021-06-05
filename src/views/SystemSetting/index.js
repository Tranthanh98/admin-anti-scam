import React, { Component } from "react";
import PropTypes from "prop-types";
import { Box, Button, Grid } from "@material-ui/core";
import RoleManager from "./components/RoleManager";
import * as httpClient from "general/HttpClient";
import { addAlert } from "actions/alertify.action";
import { connect } from "react-redux";

class SystemSetting extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  _deleteFile = async () => {
    try {
      let resonpse = await httpClient.sendGet("/file/DeleteFileUnUsage");
      if (!resonpse.data.isSuccess) {
        throw new Error(resonpse.data.messages);
      }
      this.props.addAlert("Xóa ảnh thành công", "success");
    } catch (e) {
      console.error(String(e));
      this.props.addAlert("Có lỗi xảy ra khi xóa ảnh", "error");
    }
  };

  render() {
    return (
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <RoleManager />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box padding="8px">
              Trong hệ thống có thể tồn tại những ảnh mà người dùng tải lên khi
              thực hiện viết báo cáo, nhưng sau đó người dùng không báo cáo nữa.
              Những ảnh này sẽ trở thành ảnh rác và gây tốn database của bạn.
              Hãy xóa nó.
            </Box>
            <Button
              onClick={this._deleteFile}
              color="secondary"
              variant="contained"
            >
              Xóa ảnh không dùng
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  addAlert: addAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemSetting);
