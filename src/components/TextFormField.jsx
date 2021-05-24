import { Box, TextField } from "@material-ui/core";
import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";

class TextFormField extends PureComponent {
  render() {
    const { margin, ...propsTextField } = this.props;
    return (
      <Box margin={margin}>
        <TextField {...propsTextField} />
      </Box>
    );
  }
}

TextFormField.propTypes = {
  variant: PropTypes.string,
};

TextFormField.defaultProps = {
  variant: "outlined",
  fullWidth: true,
  multiline: false,
  value: "",
  placeholder: "",
  size: "small",
};

export default TextFormField;
