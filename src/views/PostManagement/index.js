import { Box } from "@material-ui/core";
import ContextWrapper from "components/ContextWrapper";
import React, { Component } from "react";
import { withRouter } from "react-router";
import FilterPost from "./components/FilterPost";
import TablePostManage from "./components/TablePostManage";
import * as httpClient from "../../general/HttpClient";

class PostManagement extends Component {
  state = {
    typeId: 0,
    searchText: "",
    statusId: 0,
    kindOfId: 0,
    reloadTable: false,
    typeOptions: [],
    statusOptions: [],
  };

  async componentDidMount() {
    let res = await httpClient.sendPost("/postmanager/GetDefaultData");
    if (res.data.isSuccess) {
      let { statusOptions, typeOptions } = res.data.data;
      this.setState({
        typeOptions,
        statusOptions,
      });
    }
  }
  render() {
    let provider = {
      ...this.state,
      onChangeType: this._onChangeType,
      onChangeSearchText: this._onChangeSearchText,
      onChangeStatus: this._onChangeStatus,
      onChangeDateRange: this._onChangeDateRange,
      onClickRow: this._onClickRow,
      onClickSearch: this._onClickSearch,
      onChangeKindOf: this._onChangeKindOf,
      setDateRange: this._setDateRange,
      setReloadData: this._setReloadData,
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

  _setReloadData = (status) => {
    this.setState({ reloadTable: status });
  };

  _setDateRange = (from, to) => {
    this.setState({ dateRange: [from, to] });
  };

  _onChangeSearchText = (value) => {
    this.setState({ searchText: value });
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

  _onClickSearch = () => {
    this.setState({ reloadTable: true });
  };

  _onChangeKindOf = (kindOf) => {
    this.setState({ kindOfId: kindOf.value });
  };
}

export default withRouter(PostManagement);
