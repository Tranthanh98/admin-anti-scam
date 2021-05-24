import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Checkbox, Grid } from "@material-ui/core";
import { Field, useFormik } from "formik";
import * as yup from "yup";
import TextFormField from "components/TextFormField";
import { removeVietnameseTones } from "general/helper";
import userRoles from "general/Dummy/userRole";
import { CheckBox } from "@material-ui/icons";
import ButtonCommon from "components/ButtonCommon";
import { sleep } from "general/helper";
import { loadingAct } from "actions/loading.action";
import { addAlert } from "actions/alertify.action";
import { useDispatch } from "react-redux";

const validate = `^[a-zA-Z0-9]*$`;

const validateSchema = yup.object({
  userName: yup
    .string()
    .matches(
      `^[a-zA-Z0-9*.]*$`,
      "Viết liền, chỉ chứa ký tự không dấu và dấu chấm(.)"
    )
    .required("Bắt buộc"),
  password: yup.string().min(6, "Ít nhất 6 ký tự").required("Bắt buộc"),
  email: yup.string().email("email không hợp lệ"),
  roleList: yup.array().min(1, "Chọn ít nhất 1 phân quyền"),
});
function FormCreateNewAdmin(props) {
  const dispatch = useDispatch();
  const _submitCreateAdmin = async () => {
    dispatch(loadingAct(true));
    try {
      await sleep(400);
      dispatch(addAlert("Tạo admin thành công.", "success"));
      props.onClose();
    } catch (e) {
      dispatch(addAlert("Có lỗi xảy ra.", "error"));
    } finally {
      dispatch(loadingAct(false));
    }
  };
  let formik = useFormik({
    initialValues: {
      roleList: [],
    },
    validationSchema: validateSchema,
    onSubmit: _submitCreateAdmin,
  });
  const _onCheckRole = (roleId) => {
    let cloneRoleChecked = [...formik.values.roleList];
    let index = cloneRoleChecked.findIndex((i) => i == roleId);
    if (index === -1) {
      cloneRoleChecked.push(roleId);
    } else {
      cloneRoleChecked.splice(index, 1);
    }
    formik.setFieldValue("roleList", cloneRoleChecked);
  };
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box>Tài khoản:</Box>
            <Box margin="8px 0">
              <TextFormField
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.userName)}
                helperText={formik.errors.userName}
                placeholder="Nhập user name"
              />
            </Box>
          </Grid>
          <Grid item item xs={6}>
            <Box>Mật khẩu:</Box>
            <Box margin="8px 0">
              <TextFormField
                value={formik.values.password}
                onChange={formik.handleChange}
                name="password"
                error={Boolean(formik.errors.password)}
                helperText={formik.errors.password}
                placeholder="Nhập mật khẩu"
              />
            </Box>
          </Grid>
        </Grid>
        <Box>Email(Không bắt buộc):</Box>
        <Box margin="8px 0">
          <TextFormField
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
            placeholder="Nhập email"
          />
        </Box>
        <Box>Quyền:</Box>
        <Box>
          {userRoles.map((role, index) => {
            if (role.value == 0) {
              return undefined;
            }
            return (
              <Box key={index} display="flex" alignItems="flex-start">
                <Checkbox
                  checked={formik.values.roleList.includes(role.value)}
                  onChange={() => _onCheckRole(role.value)}
                  color="primary"
                  style={{ paddingTop: 0 }}
                />
                <Box marginLeft={"8px 0"}>
                  <Box>{role.label}</Box>
                  <Box fontStyle="italic" fontSize="14px">
                    ({role.data?.description})
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box fontSize="0.75rem" color="error.main">
          {Boolean(formik.errors.roleList) ? formik.errors.roleList : null}
        </Box>
        <Box margin="16px" display="flex" justifyContent="space-around">
          <ButtonCommon onClick={props.onClose} size="medium" color="inherit">
            Hủy
          </ButtonCommon>
          <ButtonCommon type="submit" size="medium" color="primary">
            Tạo Admin
          </ButtonCommon>
        </Box>
      </form>
    </Box>
  );
}

FormCreateNewAdmin.propTypes = {};

export default FormCreateNewAdmin;
