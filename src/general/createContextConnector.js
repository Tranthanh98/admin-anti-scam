// import ContextApi from "../components/ContextApi";
import React from "react";

const createContextConnector =
  (Context) => (mapContextToProps) => (Component) => (props) =>
    (
      <Context.Consumer>
        {(contextValue) => {
          let connectedProps = null;

          if (mapContextToProps) {
            connectedProps = mapContextToProps(contextValue, props);
          }

          return <Component {...props} {...connectedProps} />;
        }}
      </Context.Consumer>
    );

export default createContextConnector;
