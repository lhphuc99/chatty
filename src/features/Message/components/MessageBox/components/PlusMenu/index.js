import React, { useRef, useState } from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Tooltip } from "@material-ui/core";
import GifIcon from "@material-ui/icons/Gif";
import './style.scss';

export default function PlusMenu(props) {
  const { clickAttachFile } = props;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const refAttachFile = useRef();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleClickChooseFile = (event)=>{
    const fileUploaded = event.target.files[0];
    clickAttachFile(fileUploaded);
  }

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className="PlusMenu">
      <div>
        <div
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <Tooltip title="More option">
            <span className="fas fa-plus-circle btn-color icon" />
          </Tooltip>
        </div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem
                      style={{ paddingLeft: "5px", paddingRight: "5px" }}
                    >
                      <div
                        style={{ paddingTop: "1px", paddingBottom: "1px" }}
                        onClick={() => refAttachFile.current.click()}
                      >
                        <span
                          className="fas fa-paperclip"
                          style={{ color: "#1c9dea" }}
                        />
                        <span
                          style={{ marginLeft: "10px", textTransform: "none" }}
                        >
                          {" "}
                          Attach
                        </span>
                      </div>
                      <input
                        ref={refAttachFile}
                        type="file"
                        accept="*"
                        onChange={handleClickChooseFile}
                        style={{ display: "none" }}
                      />
                    </MenuItem>
                    <MenuItem
                      style={{ paddingLeft: "5px", paddingRight: "5px" }}
                    >
                      <div
                        style={{
                          paddingTop: "1px",
                          paddingBottom: "1px",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <GifIcon style={{ color: "#1c9dea" }} />
                        <span style={{ marginLeft: "10px",marginRight:"30px" }}> Gif</span>
                      </div>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}
