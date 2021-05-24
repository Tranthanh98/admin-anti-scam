import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import CustomTable from "components/Table/Table";
import createColumn from "general/createColumn";
import { formateDateTime } from "general/helper";
import { connectToContext } from "components/ContextWrapper";

let i = 1;
function TableUserData({ tableData, onClickRow }) {
  const _columnConfig = [
    createColumn(i++, "userId", "User ID"),
    createColumn(i++, "userName", "User Name"),
    createColumn(i++, "email", "Email"),
    createColumn(i++, "createdDate", "Ngày tạo", null, (rowData) => {
      return formateDateTime(rowData.createdDate);
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
  return (
    <Box>
      <CustomTable
        header={_columnConfig}
        dataTable={tableData ?? []}
        hasPagination={true}
        onChangePage={null}
        onClickRow={onClickRow}
        page={1}
        totalPage={5}
      />
    </Box>
  );
}

TableUserData.propTypes = {};

const mapContextToProps = ({ tableData, onClickRow }) => ({
  tableData,
  onClickRow,
});

export default connectToContext(mapContextToProps)(TableUserData);
