import { Box, Checkbox, Grid } from "@material-ui/core";
import { addAlert } from "actions/alertify.action";
import { loadingAct } from "actions/loading.action";
import ButtonCommon from "components/ButtonCommon";
import TextFormField from "components/TextFormField";
import { useFormik } from "formik";
import { sleep } from "general/helper";
import React from "react";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import * as httpClient from "general/HttpClient";

const validate = `^[a-zA-Z0-9]*$`;

const validateSchema = yup.object({
  userName: yup
    .string()
    .matches(
      `^[a-zA-Z0-9*.]*$`,
      "Viết liền, chỉ chứa ký tự không dấu và dấu chấm(.)"
    ),
  password: yup.string().min(6, "Ít nhất 6 ký tự").required("Bắt buộc"),
  email: yup.string().email("email không hợp lệ").required("Bắt buộc"),
  adminRoles: yup.array().min(1, "Chọn ít nhất 1 phân quyền"),
});
function FormCreateNewAdmin(props) {
  const dispatch = useDispatch();

  const _submitCreateAdmin = async () => {
    dispatch(loadingAct(true));
    try {
      let postData = {
        ...formik.values,
      };
      let res = await httpClient.sendPost("/UserManager/Create", postData);
      if (res.data.isSuccess) {
        dispatch(addAlert("Tạo admin thành công.", "success"));
        props.getData && props.getData();
        props.onClose && props.onClose();
      } else {
        throw new Error("Xảy ra lỗi trong quá trình tạo admin");
      }
    } catch (e) {
      dispatch(addAlert(String(e), "error"));
    } finally {
      dispatch(loadingAct(false));
    }
  };
  let formik = useFormik({
    initialValues: {
      adminRoles: [],
    },
    validationSchema: validateSchema,
    onSubmit: _submitCreateAdmin,
  });
  const _onCheckRole = (roleId) => {
    let cloneRoleChecked = [...formik.values.adminRoles];
    let index = cloneRoleChecked.findIndex((i) => i == roleId);
    if (index === -1) {
      cloneRoleChecked.push(roleId);
    } else {
      cloneRoleChecked.splice(index, 1);
    }
    formik.setFieldValue("adminRoles", cloneRoleChecked);
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
        <Box>Email:</Box>
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
          {props.adminRoles.map((role, index) => {
            if (role.value == 0) {
              return undefined;
            }
            return (
              <Box key={index} display="flex" alignItems="flex-start">
                <Checkbox
                  checked={formik.values.adminRoles.includes(role.value)}
                  onChange={() => _onCheckRole(role.value)}
                  color="primary"
                  style={{ paddingTop: 0 }}
                />
                <Box marginLeft={"8px 0"}>
                  <Box>{role.label}</Box>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box fontSize="0.75rem" color="error.main">
          {Boolean(formik.errors.adminRoles) ? formik.errors.adminRoles : null}
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
