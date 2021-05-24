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

class UserProfile extends Component {
  state = {
    searchText: "",
    roleId: 0,
    tableData: [],
  };
  async componentDidMount() {
    await this._getData();
  }
  render() {
    let provider = {
      ...this.state,
      onChangeSearchText: this._onChangeSearchText,
      onChangeRole: this._onChangeRole,
      getDataTable: this._getData,
      onClickRow: this._onClickRow,
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

  _getData = async () => {
    await sleep(500);
    this.setState({ tableData: dummyUserData });
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
