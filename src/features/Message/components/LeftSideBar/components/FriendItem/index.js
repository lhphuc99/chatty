import React from "react";
import PropsType from "prop-types";
import "./style.scss";
import { Avatar, Button } from "@material-ui/core";
import userAPI from "api/userAPI";
import { useDispatch, useSelector } from "react-redux";
import {setCurrentContact,setCurrentMessage,setCurrentGroupID} from 'app/messageSlice';
import {setDisplayConversation} from 'app/userSlice';

FriendItem.propsType = {
  urlImage: PropsType.string,
  isFriend: PropsType.bool,
};

FriendItem.defaultProps = {
  urlImage: "",
  isFriend: false,
};

function FriendItem(props) {
  const currentUid = useSelector((state)=>state.user.currentUser.uid);
  const currentGroupID = useSelector((state)=>state.message.currentGroupID);
  const {uid, name, picture } = props;
  const dispatch = useDispatch();


  const handleClickUnFriend=()=>{
    userAPI.removeFriend(currentUid,uid).then().catch((error)=>{
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
  };
  
  return (
    <li className="FriendItem">
      <div className="FriendItem__Info">
        <div className="FriendItem__Avatar" onClick={handleClick}>
          <Avatar alt={name} src={picture}/>
        </div>
        <div className="FriendItem__Name">
          <h4 onClick={handleClick}>{name}</h4>
        </div>
      </div>

        <div className="FriendItem__Btn">
          <Button
            variant="contained"
            onClick={handleClickUnFriend}
            color="primary"
            className="FriendItem__Btn--remove"
            size="small"
            startIcon={<span className="fas fa-user-slash" />}
          >
            UnFriend
          </Button>
      </div>
    </li>
  );
}

export default FriendItem;
