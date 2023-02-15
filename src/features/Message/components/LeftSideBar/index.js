import { Avatar, Badge, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ContactList from "./components/ContactList";
import FriendList from "./components/FriendList";
import NotificationList from "./components/NotificationList";
import SearchList from "./components/SearchList";
import "./style.scss";

function LeftSideBar(props) {
  const {navOption}=props;
  const { numberOfFriendRequests } = props;
  const [valueSearch, setValueSearch] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const refSearch = useRef();
  const refSearchInput = useRef();
  const currentUser = useSelector((state) => state.user.currentUser);
  const invisible = numberOfFriendRequests > 0 ? false : true;

  const handleChangeSearch = (event) => {
    let value = event.target.value;
    if (value !== undefined) {
      value = value.trim();
      value = value.replace(/\s\s+/g, " ");
      value = value.toLowerCase();
    }
    setValueSearch(value);
  };
  
  const handleClickOutSide = (event) => {
    if (refSearchInput.current && refSearchInput.current.contains(event.target)) {
      setIsSearch(true);
      document.addEventListener("click", handleClickOutSide, false);
      return;
    }
    if (refSearch.current && !refSearch.current.contains(event.target)) {
      if (!refSearchInput.current.contains(event.target)) {
        setIsSearch(false);
        setValueSearch("");
        document.removeEventListener("click", handleClickOutSide, false);
      }
    }
  };

  const handleClickShowNavButton = () => {
    props.clickOpenNavBtn(true);
  };

  return (
    <div className="LeftSideBar">
      <div className="LeftSideBar__Content">
        <div className="LeftSideBar__Header">
          <div className="LeftSideBar__Avatar">
            <Avatar src={currentUser.picture}>
              {currentUser.picture === "Anonymous"
                ? currentUser.lastName[0]
                : null}
            </Avatar>
          </div>
          <h2>Chatty</h2>
          <div style={{ flex: "1 1 auto" }}></div>
          <div className="LeftSideBar__ShowNav_btn">
            <IconButton onClick={handleClickShowNavButton} className="Btn">
              <Badge color="error" variant="dot" invisible={invisible}>
                <span className="fas fa-grip-vertical icon-button" />
              </Badge>
            </IconButton>
          </div>
        </div>
        {navOption===0?<div>
          <div className="LeftSideBar__SeachContent">
            <div ref={refSearchInput} onClick={handleClickOutSide}>
              <InputBase
                autoComplete="off"
                onChange={handleChangeSearch}
                placeholder="Search in Chatty"
                inputProps={{ "aria-label": "Search in Chatty" }}
                className="LeftSideBar__Input"
                startAdornment={<SearchIcon className="SearchIcon"/>}
              />
            </div>
          </div>
          <div className="LeftSideBar__Body" id="scrollbar">
            {isSearch ? (
              <div ref={refSearch} onClick={handleClickOutSide}>
                <SearchList searchValue={valueSearch} />
              </div>
            ) : (
              <ContactList />
            )}
          </div>
        </div>:null}
        {navOption===2?<div>
          <div className="LeftSideBar__Header--Notify">
            <h2>Notification</h2>
            <h4>List of notifications</h4>
          </div>
          <div className="LeftSideBar__Body--Notify" id="scrollbar">
            <NotificationList />
          </div>
        </div>:null}
        {navOption===1?<div>
          <div className="LeftSideBar__Header--Friend">
            <h2>Contact</h2>
            <h4>Start talking now</h4>
          </div>
          <div className="LeftSideBar__Body--Friend" id="scrollbar">
            <FriendList/>
          </div>
        </div>:null}
      </div>
    </div>
  );
}

export default LeftSideBar;
