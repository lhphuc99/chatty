import React from "react";
import PropsType from "prop-types";
import "./style.scss";
import { Avatar, Button } from "@material-ui/core";
import userAPI from 'api/userAPI';
import { useDispatch, useSelector } from "react-redux";
import {setCurrentContact, setCurrentGroupID, setCurrentMessage} from 'app/messageSlice';
import {setDisplayConversation} from 'app/userSlice';

NotificationItem.propsType = {
  urlImage: PropsType.string,
};

NotificationItem.defaultProps = {
  urlImage: "",
};

function NotificationItem(props) {

  const { uid, name, picture } = props;
  const currentUid = useSelector((state)=>state.user.currentUser.uid);
  const currentGroupID = useSelector((state)=>state.message.currentGroupID);
  const dispatch = useDispatch();

  const handleClickAccept = () => {
    userAPI.AcceptFriendRequest(currentUid,uid).then().catch((error)=>{console.log(error)});
  };

  const handleClickRemove = () => {
    userAPI.removeFriendRequest(currentUid,uid).then().catch((error)=>{console.log(error)});
  };

  const handleClick=()=>{
    dispatch(setCurrentContact(uid));
    const groupID = uid > currentUid ? uid + '-' + currentUid: currentUid+ '-' + uid;
    dispatch(setDisplayConversation(true));
    if(currentGroupID!==groupID){
      dispatch(setCurrentMessage([]));
      dispatch(setCurrentGroupID(groupID));
    }

  }

  return (
    <li className="NotificationItem">
      <div className="NotificationItem__Avatar" onClick={handleClick}>
        <Avatar alt={name} src={picture}/>
      </div>
      <div className="NotificationItem__Body">
        <div className="NotificationItem__Name">
          <h4 onClick={handleClick}>{name}</h4>
        </div>
        <div className="NotificationItem__Btn">
          <Button
            variant="contained"
            onClick={handleClickAccept}
            className="NotificationItem__Btn--add"
            color="primary"
            size="small"
            startIcon={<span className="fas fa-user-plus" />}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            onClick={handleClickRemove}
            color="primary"
            className="NotificationItem__Btn--remove"
            size="small"
            startIcon={<span className="fas fa-user-slash" />}
          >
            Remove
          </Button>
        </div>
      </div>
    </li>
  );
}

export default NotificationItem;
