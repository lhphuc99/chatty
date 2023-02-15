import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

InputField.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  labelwidth: PropTypes.number,
  value: PropTypes.string,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.string,
  variant: PropTypes.string,
  margin: PropTypes.string,
  fullWidth: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  value: "",
  label: "label",
  name: "",
  placeholder: "",
  margin: "normal",
  defaultValue: "",
  variant: "outlined",
  fullWidth: true,
  labelwidth: 75,
};

function InputField(props) {
  const {
    type,
    name,
    value,
    label,
    placeholder,
    disabled,
    autoFocus,
    variant,
    margin,
    color,
    error,
    autoComplete,
    className,
    defaultValue,
    fullWidth,
    labelwidth,
    ...other
  } = props;
  const methods = useFormContext();

  const [showPassword, setShowPassword] = useState(false);

  if (type === "password") {
    return (
      <Controller
        as={
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              {label}
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword === true ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={labelwidth}
            />
            <FormHelperText error={Boolean(methods.errors[name])}>
              {methods.errors[name] ? methods.errors[name].message : ""}
            </FormHelperText>
          </FormControl>
        }
        className={className}
        control={methods.control}
        name={name}
        error={Boolean(methods.errors[name])}
        {...props}
        {...other}
      />
    );
  } else {
    return (
      <Controller
        as={<TextField />}
        name={name}
        className={className}
        type={type}
        label={label}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        variant={variant}
        margin={margin}
        autoFocus={autoFocus}
        color={color}
        placeholder={placeholder}
        autoComplete={autoComplete}
        fullWidth={fullWidth}
        error={Boolean(methods.errors[name])}
        control={methods.control}
        helperText={methods.errors[name] ? methods.errors[name].message : ""}
        {...props}
        {...other}
      ></Controller>
    );
  }
}

export default InputField;
