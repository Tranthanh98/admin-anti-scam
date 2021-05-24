import { Box, Grid } from "@material-ui/core";
import ButtonCommon from "components/ButtonCommon";
import { connectToContext } from "components/ContextWrapper";
import SelectOption from "components/SelectOption";
import TextFormField from "components/TextFormField";
import types from "general/Dummy/types";
import React, { useState } from "react";
import status from "../../../general/Dummy/statusPost";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function FilterPost({
  typeId,
  onChangeType,
  searchText,
  onChangeSearchText,
  statusId,
  onChangeStatus,
  // dateRange,
  // onChangeDateRange,
}) {
  // console.log(`dateRange:`, dateRange);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const _onChangeDateRange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TextFormField
            value={searchText}
            onChange={onChangeSearchText}
            margin="8 0px"
            variant="outlined"
            label="Tìm kiếm"
            placeholder="Tìm kiếm..."
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <ButtonCommon size="medium">Tìm kiếm</ButtonCommon>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <SelectOption
            value={types.find((i) => i.value == typeId)}
            onChange={onChangeType}
            options={types}
            label="Thể loại"
            size="small"
          />
        </Grid>
        <Grid item xs={4}>
          <SelectOption
            value={status.find((i) => i.value == statusId)}
            onChange={onChangeStatus}
            options={status}
            label="Trạng thái"
            size="small"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <DatePicker
            selected={startDate}
            onChange={_onChangeDateRange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
          />
        </Grid> */}
      </Grid>
    </Box>
  );
}

FilterPost.propTypes = {};

const mapContextToProps = ({
  typeId,
  onChangeType,
  searchText,
  onChangeSearchText,
  statusId,
  onChangeStatus,
  dateRange,
  onChangeDateRange,
}) => ({
  typeId,
  onChangeType,
  searchText,
  onChangeSearchText,
  statusId,
  onChangeStatus,
  dateRange,
  onChangeDateRange,
});
export default connectToContext(mapContextToProps)(FilterPost);
