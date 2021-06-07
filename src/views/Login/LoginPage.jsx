import {
  FormControl,
  Hidden,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import * as yup from "yup";
import { addAlert } from "../../actions/alertify.action";
import { loginAct } from "../../actions/login.action";
import { useInputText } from "../../general/CustomHook";
import logoAntiscam from "../../assets/img/logo-primary-1.png";
import { Visibility, VisibilityOff } from "@material-ui/icons";

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
  const [showPassword, setShowPassword] = useState(false);

  const userName = useInputText("", yup.string().required("Bắt buộc"));
  const password = useInputText("", yup.string().required("Bắt buộc"));

  const history = useHistory();
  const dispatch = useDispatch();

  const _gotoBack = () => {
    history.push("/");
  };

  const _login = () => {
    if (userName.value.length == 0 || !!password.value.length == 0) {
      dispatch(addAlert("Nhập đầy đủ email và password", "error"));
    } else {
      dispatch(loginAct(userName.value, password.value, _gotoBack));
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} style={{ maxHeight: "100vh" }}>
        <Hidden smDown>
          <Box
            width="100%"
            height="100vh"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <img
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                src={logoAntiscam}
                alt="antiscam vietnam"
              />
            </Box>
          </Box>
        </Hidden>
      </Grid>
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
            <FormControl
              style={{ marginTop: "12px" }}
              variant="outlined"
              fullWidth
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Mật khẩu
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                {...password}
                required
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={_login}
            >
              Đăng nhập
            </Button>
            {/* <Grid container spacing={2}>
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
            </Grid> */}
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
