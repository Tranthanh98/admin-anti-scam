import { InputBase, MenuItem, TextField, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Component, PureComponent } from "react";

class SelectOption extends PureComponent {
  _onChangeSelect = (e) => {
    const { onChange } = this.props;
    let { value } = e.target;
    onChange(value);
  };
  render() {
    const {
      value,
      defaultValue,
      options,
      multiple,
      label,
      width,
      variant,
      helperText,
      error,
    } = this.props;
    return (
      <TextField
        id="outlined-select-currency"
        select
        label={label}
        value={value}
        onChange={this._onChangeSelect}
        helperText={helperText ?? `Chọn ${label}`}
        variant={variant}
        fullWidth
        size="small"
        error={error}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}
const styles = {
  sizeSelect: {
    height: 40,
    // minWidth:200
  },
};
SelectOption.propTypes = {
  variant: PropTypes.string,
  width: PropTypes.number,
};
SelectOption.defaultProps = {
  variant: "outlined",
  width: 200,
};

export default withStyles(styles)(SelectOption);
