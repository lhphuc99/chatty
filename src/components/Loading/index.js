import { CircularProgress } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import './style.scss';

Loading.propType = {
  size: PropTypes.string,
  color: PropTypes.string,
};

Loading.defaultProps = {
  size: "40px",
  color: "primary",
};

function Loading(props) {
  const { size, color, ...other } = props;
  return(
        <div className="Loading">
             <CircularProgress size={size} color={color} {...other} style={{color:"#1C9DEA"}}/>
        </div>
  )
}

export default Loading;
