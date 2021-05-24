import React, { Component } from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import CustomTable from "components/Table/Table";
import createColumn from "general/createColumn";
import { sleep } from "general/helper";
import dummyData from "../configs/dummyData";
import { connectToContext } from "components/ContextWrapper";

class TablePostManage extends Component {
  constructor(props) {
    super(props);
    this._columnConfig = this._createColumn();
    this.state = {
      tableData: [],
    };
  }
  static propTypes = {
    prop: PropTypes,
  };
  async componentDidMount() {
    await this._getData();
  }

  _getData = async () => {
    await sleep(350);
    this.setState({
      tableData: dummyData,
    });
  };
  _createColumn() {
    let i = 0;
    return [
      createColumn(i++, "title", "Tiêu đề"),
      createColumn(i++, "createdBy", "Tác giả"),
      createColumn(i++, "createdDate", "Ngày viết"),
      createColumn(i++, "typeName", "Thể loại"),
      createColumn(i++, "statusName", "Trạng thái"),
    ];
  }
  render() {
    const { onClickRow } = this.props;
    return (
      <Box>
        <CustomTable
          header={this._columnConfig}
          dataTable={this.state.tableData}
          hasPagination={true}
          onChangePage={null}
          onClickRow={onClickRow}
          page={1}
          totalPage={5}
        />
      </Box>
    );
  }
}

const mapContextToProps = (context) => ({
  onClickRow: context.onClickRow,
});
export default connectToContext(mapContextToProps)(TablePostManage);
