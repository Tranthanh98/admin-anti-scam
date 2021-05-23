import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useInputText } from "../../general/CustomHook";
import * as yup from "yup";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { loginAct } from "../../actions/login.action";
import { addAlert } from "../../actions/alertify.action";
import { useLastLocation } from "react-router-last-location";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Anti Scam VietNam
      </Link>{" "}
      {2021}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  const userName = useInputText(
    "",
    yup.string().required("Trường này là bắt buộc")
  );
  const password = useInputText(
    "",
    yup.string().required("Trường này là bắt buộc")
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const lastHistory = useLastLocation();
  const _gotoBack = () => {
    console.log("lastHistory:", lastHistory);
    if (lastHistory == null || lastHistory.pathname === "/sign-in") {
      history.push("/");
    } else {
      history.goBack();
    }
  };

  const _login = () => {
    if (userName.value.length == 0 || !!password.value.length == 0) {
      dispatch(addAlert("Nhập đầy đủ email và password", "error"));
    } else {
      dispatch(loginAct(userName.value, password.value, _gotoBack));
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Địa chỉ email"
              autoComplete="email"
              autoFocus
              {...userName}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Mật khẩu"
              type="password"
              autoComplete="current-password"
              {...password}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={_login}
            >
              Đăng nhập
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={12} sm>
                <Link href="/sign-up" variant="body2">
                  Quên mật khẩu?
                </Link>
              </Grid>
              <Grid item xs={12} sm>
                <Link href="/sign-up" variant="body2">
                  {"Bạn chưa có tài khoản? Đăng ký."}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
