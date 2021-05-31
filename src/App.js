import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Admin from "layouts/Admin.js";
import { connect, useSelector } from "react-redux";
import LoginPage from "views/Login/LoginPage";
import { Box } from "@material-ui/core";
import LoadingComponent from "components/LoadingComponent";
import Alertify from "components/Alertify";
import BaseModal from "components/BaseModal";

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
}

const mapStateToProps = (context) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(App);
