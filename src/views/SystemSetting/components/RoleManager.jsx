import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  makeStyles,
  Popover,
  Tooltip,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addAlert } from "actions/alertify.action";
import DeleteIcon from "@material-ui/icons/Delete";
import * as httpClient from "general/HttpClient";
import TextFormField from "components/TextFormField";
import ButtonCommon from "components/ButtonCommon";
import { loadingAct } from "actions/loading.action";
import PopupConfirmDelete from "./PopupConfirmDelete";
import { openModalAct } from "actions/modal.action";

const useStyles = makeStyles((theme) => ({
  roleItem: {
    "&:hover": {
      color: theme.palette.secondary.main,
    },
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function RoleManager(props) {
  const [roleList, setRoleList] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [roleName, setRoleName] = useState("");

  const dispatch = useDispatch();
  const classes = useStyles();

  const _getRoleDate = async () => {
    const res = await httpClient.sendGet("/SystemManager/GetRoles");
    if (res.data.isSuccess) {
      setRoleList(res.data.data);
    } else {
      dispatch(addAlert(res.data.messages, "error"));
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const _handleDeleteSearch = () => {
    setRoleName("");
    _getRoleDate(true);
    handleClose();
  };

  useEffect(() => {
    _getRoleDate();
  }, []);

  const _onDelete = (id) => {
    let modalData = {
      title: "Xác nhận xóa thể loại",
      body: (
        <PopupConfirmDelete
          idDelete={id}
          typeOptions={roleList}
          getData={_getRoleDate}
        />
      ),
      style: {
        fullWidth: true,
        maxWidth: "sm",
      },
    };
    dispatch(openModalAct(modalData));
  };

  const _handleAdd = async () => {
    dispatch(loadingAct(true));
    try {
      const res = await httpClient.sendPost("/SystemManager/Add", {
        name: roleName,
      });
      if (res.data.isSuccess) {
        _handleDeleteSearch();
      } else {
        throw new Error();
      }
    } catch (e) {
      dispatch(addAlert("Lỗi server", "error"));
    } finally {
      dispatch(loadingAct(false));
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <Card>
        <CardHeader title="Danh sách thể loại báo cáo" />
        <CardContent>
          <Box alignContent="start">
            <Button variant="contained" color="primary" onClick={handleClick}>
              Thêm thể loại
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <Card>
                <CardContent>
                  <TextFormField
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    margin="8 0px"
                    variant="outlined"
                    label="Tên thể loại"
                    placeholder="Nhập tên thể loại..."
                    fullWidth
                    autoFocus
                  />
                  <Box marginTop="8px">
                    <ButtonCommon onClick={_handleAdd}>Thêm</ButtonCommon>
                  </Box>
                </CardContent>
              </Card>
            </Popover>
          </Box>
          <Box>
            {roleList &&
              roleList.map((role, index) => {
                return (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    key={index}
                    className={classes.roleItem}
                  >
                    <Tooltip title={`Số lượng bài viết: ${role.data}`} arrow>
                      <Box
                        display="flex"
                        alignItems="center"
                        style={{ cursor: "pointer" }}
                      >
                        {index + 1}.
                        <Box marginLeft="8px" fontWeight="bold">
                          {role.label}
                        </Box>
                      </Box>
                    </Tooltip>
                    <Box>
                      <Tooltip title="Xóa">
                        <DeleteIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => _onDelete(role.value)}
                        />
                      </Tooltip>
                    </Box>
                  </Box>
                );
              })}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

RoleManager.propTypes = {};

export default RoleManager;
