import React, { useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { Popover, Tooltip } from "@material-ui/core";
import './style.scss';

function Emoji(props) {

    const {emojiProps} = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClickOpenEmoji = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChooseEmoji=(emoji)=>{
    emojiProps(emoji);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="Emoji">
      <Tooltip title="Choose emoji">
        <span
          className="fas fa-smile btn-color icon"
          onClick={handleClickOpenEmoji}
        />
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Picker
            showPreview={true}
            onSelect={handleChooseEmoji}
            title="Pick your emoji"
            set='facebook'
        />
      </Popover>
    </div>
  );
}

export default Emoji;
