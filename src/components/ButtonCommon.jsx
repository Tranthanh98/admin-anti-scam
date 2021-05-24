import React from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";

function ButtonCommon({ children, ...buttonProps }) {
  return <Button {...buttonProps}>{children}</Button>;
}

ButtonCommon.propTypes = {
  size: PropTypes.string,
};

ButtonCommon.defaultProps = {
  variant: "contained",
  color: "primary",
  size: "small",
};

export default ButtonCommon;
