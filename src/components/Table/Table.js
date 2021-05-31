import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const {
    header,
    dataTable,
    tableHeaderColor,
    page,
    totalPage,
    onClickRow,
    hasPagination,
    onChangePage,
  } = props;
  const _onChangePage = (_, page) => {
    onChangePage && onChangePage(page);
  };
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {header !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {header.map((head, index) => {
                return (
                  <TableCell style={{ ...head.custom }} key={head.id}>
                    {head.title}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {dataTable &&
            dataTable.map((row, index) => {
              return (
                <TableRow className={classes.tableRow} key={index}>
                  {header.map((h) => {
                    return (
                      <TableCell
                        key={h.id + row[h.nameMapColumn]}
                        onClick={() => onClickRow(row)}
                        align="left"
                      >
                        {h.renderOptionFunc
                          ? h.renderOptionFunc(row, index)
                          : row[h.nameMapColumn]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {hasPagination ? (
        <Box
          display="flex"
          justifyContent="flex-end"
          className={classes.pagination}
        >
          <Pagination
            count={totalPage}
            page={page}
            onChange={_onChangePage}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      ) : null}
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
  totalPage: 0,
  page: 1,
  dataTable: [],
  hasPagination: false,
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
