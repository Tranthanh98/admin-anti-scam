import React, { Component } from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import CustomTable from "components/Table/Table";
import createColumn from "general/createColumn";
import { connectToContext } from "components/ContextWrapper";
import { STATUS_POST } from "general/enum";
import * as httpClient from "general/HttpClient";
import { formateDateTime } from "general/helper";

class TablePostManage extends Component {
  constructor(props) {
    super(props);
    this._columnConfig = this._createColumn();
    this.state = {
      tableData: [],
      currentPage: 1,
      totalPage: 1,
    };
  }
  static propTypes = {
    prop: PropTypes,
  };

  async componentDidMount() {
    await this._getData();
  }

  _getData = async () => {
    const {
      typeId,
      statusId,
      kindOfId,
      searchText,
      setReloadData,
    } = this.props;
    const { currentPage } = this.state;
    setReloadData && setReloadData(false);
    const searchModel = {
      typeId,
      statusId,
      kindOfId,
      searchText,
      currentPage,
    };
    let res = await httpClient.sendPost("/PostManager/GetData", {
      searchModel,
    });
    if (res.data.isSuccess) {
      this.setState({
        tableData: res.data.data.data,
        totalPage: res.data.data.totalPage,
        currentPage: res.data.data.currentPage,
      });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    const { typeId, statusId, kindOfId, dateRange, reloadTable } = this.props;
    if (
      prevProps.typeId != typeId ||
      prevProps.statusId != statusId ||
      prevProps.kindOfId != kindOfId ||
      prevProps.dateRange != dateRange
    ) {
      await this._getData();
    } else if (prevProps.reloadTable === false && reloadTable === true) {
      await this._getData();
    }
  }
  _createColumn() {
    let i = 0;
    return [
      createColumn(i++, "title", "Tiêu đề"),
      createColumn(i++, "createdByName", "Tác giả"),
      createColumn(i++, "createdDate", "Ngày viết", null, (row) => {
        return formateDateTime(row.createdDate);
      }),
      createColumn(i++, "typeName", "Thể loại", null, (row) => {
        return row.typePosts.map((type, index) => {
          return (
            <Box marginBottom="4px" key={index}>
              {type.type.name}
            </Box>
          );
        });
      }),
      createColumn(i++, "statusName", "Trạng thái", null, (rowData) => {
        let color = "success.main";
        if (rowData.status == STATUS_POST.WaitApproved) {
          color = "warning.main";
        }
        if (rowData.status == STATUS_POST.Denied) {
          color = "error.main";
        }
        return (
          <Box color={color} fontWeight="bold">
            {rowData.statusName}
          </Box>
        );
      }),
      createColumn(i++, "kindOfName", "Uy tín/Lừa đảo"),
      createColumn(i++, "acceptedByName", "Duyệt bởi"),
    ];
  }
  render() {
    const { onClickRow } = this.props;
    const { currentPage, totalPage } = this.state;
    return (
      <Box>
        <CustomTable
          header={this._columnConfig}
          dataTable={this.state.tableData}
          hasPagination={true}
          onChangePage={this._onChangePage}
          onClickRow={onClickRow}
          page={currentPage}
          totalPage={totalPage}
        />
      </Box>
    );
  }

  _onChangePage = (currentPage) => {
    this.setState({ currentPage }, this._getData);
  };
}

const mapContextToProps = ({
  onClickRow,
  typeId,
  statusId,
  kindOfId,
  searchText,
  dateRange,
  reloadTable,
  setReloadData,
}) => ({
  onClickRow,
  typeId,
  statusId,
  kindOfId,
  searchText,
  dateRange,
  reloadTable,
  setReloadData,
});
export default connectToContext(mapContextToProps)(TablePostManage);
