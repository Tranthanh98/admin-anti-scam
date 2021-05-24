import { Box } from "@material-ui/core";
import ContextWrapper from "components/ContextWrapper";
import moment from "moment";
import React, { Component } from "react";
import { withRouter } from "react-router";
import FilterPost from "./components/FilterPost";
import TablePostManage from "./components/TablePostManage";

class PostManagement extends Component {
  state = {
    typeId: 0,
    searchText: "",
    statusId: 0,
    dateRange: {
      fromDate: moment(new Date(), "dd/MM/yyyy"),
      toDate: moment(new Date(), "dd/MM/yyyy"),
    },
    kindOfId: 0,
  };
  render() {
    let provider = {
      ...this.state,
      onChangeType: this._onChangeType,
      onChangeSearchText: this._onChangeSearchText,
      onChangeStatus: this._onChangeStatus,
      onChangeDateRange: this._onChangeDateRange,
      onClickRow: this._onClickRow,
      onCloseDialog: this._onCloseDialog,
      onClickSearch: this._onClickSearch,
      onChangeKindOf: this._onChangeKindOf,
    };
    return (
      <ContextWrapper.Provider value={provider}>
        <Box>
          <FilterPost />
        </Box>
        <TablePostManage />
      </ContextWrapper.Provider>
    );
  }

  _onChangeSearchText = (e) => {
    this.setState({ searchText: e.target.value });
  };

  _onChangeType = (type) => {
    this.setState({ typeId: type.value });
  };

  _onChangeStatus = (status) => {
    this.setState({ statusId: status.value });
  };

  _onChangeDateRange = (dateRange) => {
    console.log("selection:", dateRange);
    this.setState({ dateRange });
  };

  _onClickRow = (item) => {
    this.props.history.push("/admin/detail-post/" + item.id);
  };

  _onCloseDialog = () => {
    this.setState({ openDetail: false });
  };

  _onClickSearch = () => {};

  _onChangeKindOf = (kindOf) => {
    this.setState({ kindOfId: kindOf.value });
  };
}

export default withRouter(PostManagement);
