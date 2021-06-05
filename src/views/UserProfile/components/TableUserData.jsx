import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import CustomTable from "components/Table/Table";
import createColumn from "general/createColumn";
import { formateDateTime } from "general/helper";
import { connectToContext } from "components/ContextWrapper";
import { PureComponent } from "react";
import * as httpClient from "general/HttpClient";
import { addAlert } from "actions/alertify.action";
import { connect } from "react-redux";

let i = 1;
class TableUserData extends PureComponent {
  constructor(props) {
    super(props);
    this.columnConfig = this._columnConfig();
  }
  state = {
    tableData: [],
    currentPage: 1,
    totalPage: 1,
  };

  async componentDidMount() {
    await this._getData();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchText, statusId, roleId, refreshData } = this.props;
    if (
      prevProps.searchText != searchText ||
      prevProps.statusId != statusId ||
      prevProps.roleId != roleId
    ) {
      await this._getData();
    } else if (prevProps.refreshData === false && refreshData === true) {
      await this._getData();
    }
  }

  render() {
    const { tableData, currentPage, totalPage } = this.state;
    const { onClickRow } = this.props;
    return (
      <Box>
        <CustomTable
          header={this.columnConfig}
          dataTable={tableData ?? []}
          hasPagination={true}
          onChangePage={this._onChangPage}
          onClickRow={onClickRow}
          page={currentPage}
          totalPage={totalPage}
        />
      </Box>
    );
  }

  _onChangPage = (_, value) => {
    this.setState({ currentPage: value }, this._getData);
  };

  _getData = async () => {
    const { currentPage } = this.state;
    const { searchText, statusId, roleId, setRefreshData } = this.props;
    setRefreshData(false);
    const postData = {
      searchText,
      statusId,
      roleId,
      currentPage,
      isAdmin: true,
    };
    try {
      let res = await httpClient.sendPost("/UserManager/Get", postData);
      if (res?.data?.isSuccess) {
        const { currentPage, totalPage, data } = res.data.data;
        this.setState({
          currentPage,
          totalPage,
          tableData: data,
        });
      } else {
        throw new Error(res.data.messages);
      }
    } catch (e) {
      this.props.addAlert(String(e));
    }
  };

  _columnConfig = () => {
    return [
      createColumn(i++, "id", "User ID"),
      createColumn(i++, "userName", "User Name"),
      createColumn(i++, "email", "Email"),
      createColumn(i++, "joinedDate", "Ngày tạo", null, (rowData) => {
        return formateDateTime(rowData.joinedDate);
      }),
      createColumn(i++, "isActive", "Trang thái", null, (rowData) => {
        return rowData.isActive ? (
          <Box color="success.main" fontWeight="bold">
            Hoạt động
          </Box>
        ) : (
          <Box color="error.main" fontWeight="bold">
            Ngừng hoạt động
          </Box>
        );
      }),
    ];
  };
}

TableUserData.propTypes = {};

const mapContextToProps = ({
  searchText,
  statusId,
  roleId,
  onClickRow,
  refreshData,
  setRefreshData,
}) => ({
  searchText,
  statusId,
  roleId,
  onClickRow,
  refreshData,
  setRefreshData,
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  addAlert: addAlert,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(connectToContext(mapContextToProps)(TableUserData));
