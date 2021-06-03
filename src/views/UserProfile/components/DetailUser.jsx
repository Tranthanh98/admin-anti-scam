import React from "react";
import PropTypes from "prop-types";
import { Box, Checkbox, Grid } from "@material-ui/core";
import TextFormField from "components/TextFormField";
import ButtonCommon from "components/ButtonCommon";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { formateDateTime } from "general/helper";
import * as httpClient from "general/HttpClient";
import { addAlert } from "actions/alertify.action";
import { loadingAct } from "actions/loading.action";

const validateSchema = yup.object({
  userName: yup
    .string()
    .matches(
      `^[a-zA-Z0-9*.]*$`,
      "Viết liền, chỉ chứa ký tự không dấu và dấu chấm(.)"
    ),
  password: yup.string().min(6, "Ít nhất 6 ký tự"),
  email: yup.string().email("email không hợp lệ").required("Bắt buộc"),
  adminRoles: yup.array().min(1, "Chọn ít nhất 1 phân quyền"),
  joinedDate: yup.string(),
  isActive: yup.bool(),
  oldPassword: yup.string(),
});

function DetailUser(props) {
  const dispatch = useDispatch();

  const _submitCreateAdmin = async () => {
    dispatch(loadingAct(true));
    try {
      let res = await httpClient.sendPost(
        "/userManager/ChangeInforAdmin",
        formik.values
      );
      if (res.data.isSuccess) {
        dispatch(addAlert("Cập nhật thông tin thành công", "success"));
        props.onClose();
        props.getData();
      } else {
        throw new Error(res.data.messages);
      }
    } catch (e) {
      dispatch(addAlert(String(e), "error"));
    } finally {
      dispatch(loadingAct(false));
    }
  };

  let formik = useFormik({
    initialValues: { ...props.detail },
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
        <Grid container spacing={2}>
          <Grid item xs={6}>
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
            <Box marginTop="12px">
              <Box>Quyền:</Box>
              <Box>
                {props.adminRoles.map((role, index) => {
                  if (role.value == 0) {
                    return undefined;
                  }
                  return (
                    <Box key={index} display="flex" alignItems="flex-start">
                      <Checkbox
                        checked={formik.values.adminRoles
                          .map((i) => String(i))
                          .includes(role.value)}
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
                {Boolean(formik.errors.adminRoles)
                  ? formik.errors.adminRoles
                  : null}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box margin="8px 0">
              Ngày tham gia: {formateDateTime(formik.values.joinedDate)}
            </Box>
            <Box margin="8px 0">
              Số bài đăng uy tín: {formik.values.totalPostsReputation}
            </Box>
            <Box>Số bài báo cáo: {formik.values.totalPostsReport}</Box>
            <Box display="flex" alignItems="center">
              Trạng thái tài khoản:
              <Checkbox
                checked={formik.values.isActive}
                onChange={formik.handleChange}
                name="isActive"
              />
              <Box
                color={formik.values.isActive ? "success.main" : "error.main"}
              >
                {formik.values.isActive ? "Hoạt đông" : "Ngừng hoạt động"}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs></Grid>
          <Grid item xs></Grid>
        </Grid>
        <Box margin="16px" display="flex" justifyContent="space-around">
          <ButtonCommon onClick={props.onClose} size="medium" color="inherit">
            Hủy
          </ButtonCommon>
          <ButtonCommon type="submit" size="medium" color="primary">
            Lưu
          </ButtonCommon>
        </Box>
      </form>
    </Box>
  );
}

DetailUser.propTypes = {};

export default DetailUser;
