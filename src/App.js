import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Admin from "layouts/Admin.js";
import { connect, useSelector } from "react-redux";
import LoginPage from "views/Login/LoginPage";
import { Box } from "@material-ui/core";
import LoadingComponent from "components/LoadingComponent";
import Alertify from "components/Alertify";
import BaseModal from "components/BaseModal";
import eventBus from "general/EventBus";
import { addAlert } from "actions/alertify.action";
import { LOGOUT } from "actions/login.action";

function PrivateRoute(props) {
  const user = useSelector((state) => state.loginReducer);
  if (user?.data?.isAuth) {
    if (props.path == "/") {
      return <Redirect to="/admin" />;
    }
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
}

class App extends Component {
  state = {
    needLogout: false,
  };

  componentDidMount() {
    eventBus.subscribe(this, "error/authorized", () => {
      this._setNeedLogout();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.needLogout && this.state.needLogout) {
      this.props.logout();
      this.props.addAlert(
        "Tài khoản đã hết hạn, vui lòng đăng nhập lại",
        "error"
      );
      this._handleLogout();
    }
  }

  componentWillUnmount() {
    eventBus.unsubscribe(this);
  }
  render() {
    return (
      <Box>
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/admin" component={Admin} />
            <PrivateRoute path="/" component={Admin} />
          </Switch>
        </BrowserRouter>
        <LoadingComponent />
        <Alertify />
        <BaseModal />
      </Box>
    );
  }

  _setNeedLogout = () => {
    this.setState({ needLogout: true });
  };

  _handleLogout = () => {
    let confirmLogout = window.confirm(
      "Tài khoản đã hết hạn, vui lòng đăng nhập lại"
    );
    if (confirmLogout) {
      window.open("/login", "_self");
    } else {
      return;
    }
  };
}

const mapStateToProps = (context) => ({});
const mapDispatchToProps = {
  addAlert: addAlert,
  logout: () => ({ type: LOGOUT }),
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
