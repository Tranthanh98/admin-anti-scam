import { Box } from "@material-ui/core";
import { openModalAct } from "actions/modal.action";
import ButtonCommon from "components/ButtonCommon";
import ContextWrapper from "components/ContextWrapper";
import { sleep } from "general/helper";
import React, { Component } from "react";
import { connect } from "react-redux";
import FormCreateNewAdmin from "./components/FormCreateNewAdmin";
import TableUserData from "./components/TableUserData";
import UserFilter from "./components/UserFilter";
import dummyUserData from "./configs/dummyUserData";
import * as httpClient from "general/HttpClient";
import { loadingAct } from "actions/loading.action";
import DetailUser from "./components/DetailUser";
import { addAlert } from "actions/alertify.action";

class UserProfile extends Component {
  state = {
    searchText: "",
    roleId: 0,
    statusId: 0,
    adminRoles: [],
    adminStatus: [],
    refreshData: false,
  };
  async componentDidMount() {
    await this._getDefaultData();
  }
  render() {
    let provider = {
      ...this.state,
      onChangeSearchText: this._onChangeSearchText,
      onChangeRole: this._onChangeRole,
      onClickRow: this._onClickRow,
      onChangeStatus: this._setStatus,
      setRefreshData: this._setRefreshData,
    };
    return (
      <ContextWrapper.Provider value={provider}>
        <Box>
          <UserFilter />
        </Box>
        <Box>
          <ButtonCommon onClick={this._createNewAdmin}>Thêm admin</ButtonCommon>
        </Box>
        <Box>
          <TableUserData />
        </Box>
      </ContextWrapper.Provider>
    );
  }

  _setRefreshData = (refreshData) => {
    this.setState({ refreshData });
  };

  _setStatus = (value) => {
    this.setState({ statusId: value.value });
  };

  _getDefaultData = async () => {
    try {
      let res = await httpClient.sendGet("/UserManager/GetDefault");
      if (res.data.isSuccess) {
        const { adminStatus, adminRoles } = res.data.data;
        this.setState({ adminStatus, adminRoles });
      }
    } catch (e) {
    } finally {
    }
  };

  _onChangeSearchText = (searchText) => {
    this.setState({ searchText });
  };

  _onChangeRole = (role) => {
    this.setState({ roleId: role.value });
  };

  _createNewAdmin = () => {
    let modalData = {
      title: "Tạo admin",
      body: (
        <FormCreateNewAdmin
          adminRoles={this.state.adminRoles}
          getData={() => this._setRefreshData(true)}
        />
      ),
      style: {
        fullWidth: true,
        maxWidth: "sm",
      },
    };
    this.props.openModal(modalData);
  };

  _onClickRow = async (row) => {
    this.props.loadingAct(true);
    try {
      let res = await httpClient.sendGet("UserManager/DetailAdmin/" + row.id);
      if (res.data.isSuccess) {
        const detail = res.data.data;
        let modalData = {
          title: "Thông tin admin",
          body: (
            <DetailUser
              detail={detail}
              adminRoles={this.state.adminRoles}
              getData={() => this._setRefreshData(true)}
            />
          ),
          style: {
            fullWidth: true,
            maxWidth: "md",
          },
        };
        this.props.openModal(modalData);
      }
    } catch (e) {
      this.props.addAlert(String(e), "error");
    } finally {
      this.props.loadingAct(false);
    }
  };
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  openModal: openModalAct,
  loadingAct: loadingAct,
  addAlert: addAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
