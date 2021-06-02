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

class UserProfile extends Component {
  state = {
    searchText: "",
    roleId: 0,
    statusId: 0,
    adminRoles: [],
    adminStatus: [],
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

  _setStatus = (statusId) => {
    this.setState({ statusId });
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

  _onChangeSearchText = (e) => {
    this.setState({ searchText: e.target.value });
  };

  _onChangeRole = (role) => {
    this.setState({ roleId: role.value });
  };

  _createNewAdmin = () => {
    let modalData = {
      title: "Tạo admin",
      body: <FormCreateNewAdmin />,
      style: {
        fullWidth: true,
        maxWidth: "sm",
      },
    };
    this.props.openModal(modalData);
  };

  _onClickRow = (row) => {
    alert("ahihi");
  };
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  openModal: openModalAct,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
