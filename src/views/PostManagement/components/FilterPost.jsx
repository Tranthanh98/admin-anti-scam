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
import { openModalAct } from "actions/modal.action";
import BodyFormReputation from "./BodyFormReputation";
import { useDispatch } from "react-redux";

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
  // const [dateRange, setDateRange] = useState([null, null]);
  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(new Date());

  // const _onChangeDateRange = (dates) => {
  //   const [start, end] = dates;
  //   setStartDate(start);
  //   setEndDate(end);
  // };
  const dispatch = useDispatch();
  const _createNewReputation = () => {
    let modalData = {
      title: "Bài đăng uy tín",
      body: <BodyFormReputation />,
      style: {
        fullWidth: true,
        maxWidth: "md",
      },
    };
    dispatch(openModalAct(modalData));
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
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
        <Grid item xs={3}></Grid>
        <Grid item xs>
          <ButtonCommon onClick={_createNewReputation} size="medium">
            Tạo bài đăng uy tín
          </ButtonCommon>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={3}>
          <SelectOption
            value={types.find((i) => i.value == typeId)}
            onChange={onChangeType}
            options={types}
            label="Thể loại"
            size="small"
          />
        </Grid>
        <Grid item xs={4} sm={3}>
          <SelectOption
            value={status.find((i) => i.value == statusId)}
            onChange={onChangeStatus}
            options={status}
            label="Trạng thái"
            size="small"
          />
        </Grid>
        {/* <Grid item xs={12}>
          <ButtonCommon size="medium">Tìm kiếm</ButtonCommon>
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
