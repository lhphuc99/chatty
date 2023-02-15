import React from "react";
import PropsType from "prop-types";
import "./style.scss";
import { Avatar, Button } from "@material-ui/core";
import userAPI from 'api/userAPI';
import {useDispatch, useSelector } from "react-redux";
import CancelIcon from '@material-ui/icons/Cancel';
import { setCurrentContact, setCurrentGroupID, setCurrentMessage } from "app/messageSlice";
import {setDisplayConversation} from 'app/userSlice';

SearchItem.propsType = {
  picture: PropsType.string,
  isFriend: PropsType.bool,
  isRequestFriend:PropsType.bool,
};

SearchItem.defaultProps = {
  picture: "",
  isFriend: false,
  isRequestFriend:false,
};

function SearchItem(props) {

  const {uid, name, picture, isFriend, isRequestFriend } = props;
  const currentUid = useSelector((state)=>state.user.currentUser.uid);
  const currentGroupID = useSelector((state)=>state.message.currentGroupID);
  const dispatch = useDispatch();

  const handleClickAddFriend=()=>{
    userAPI.sendFriendRequest(currentUid,uid).catch((error)=>{
      console.log(error);
    })
  }

  const handleClickUnFriend=()=>{
    userAPI.removeFriend(currentUid,uid).then().catch((error)=>{
      console.log(error);
    })
  }

  const handleClickCancel=()=>{
    userAPI.removeRequest(currentUid,uid).then().catch((error)=>{
      console.log(error);
    })
  }

  const handleClick=()=>{
    dispatch(setCurrentContact({
      uid:uid,
      name:name,
      picture:picture,
    }));
    const groupID = uid > currentUid ? uid + '-' + currentUid: currentUid+ '-' + uid;
    dispatch(setDisplayConversation(true));
    if(currentGroupID!==groupID){
      dispatch(setCurrentMessage([]));
      dispatch(setCurrentGroupID(groupID));
    }
  }

  return (
    <li className="SearchItem">
      <div className="SearchItem__Info">
        <div className="SearchItem__Avatar" onClick={handleClick}>
          <Avatar alt={name} src={picture} />
        </div>
        <div className="SearchItem__Name">
          <h4 onClick={handleClick}>{name}</h4>
        </div>
      </div>
      <div className="SearchItem__Btn">
        {isFriend===false&&isRequestFriend===false? (
          <Button
            variant="contained"
            onClick={handleClickAddFriend}
            className="SearchItem__Btn--add"
            color="primary"
            size="small"
            startIcon={<span className="fas fa-user-plus" />}
          >
            Add Friend
          </Button>
        ) : isFriend===true?(
          <Button
            variant="contained"
            onClick={handleClickUnFriend}
            color="primary"
            className="SearchItem__Btn--unfr"
            size="small"
            startIcon={<span className="fas fa-users-slash" />}
          >
            UnFriend
          </Button>
        ):<Button
          variant="contained"
          onClick={handleClickCancel}
          color="primary"
          className="SearchItem__Btn--unfr"
          size="small"
          startIcon={<CancelIcon/>}
      >
        Cancel
      </Button>}
      </div>
    </li>
  );
}

export default SearchItem;
