import { IconButton, Tooltip } from "@material-ui/core";
import CallIcon from "@material-ui/icons/Call";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import InfoIcon from "@material-ui/icons/Info";
import {setDisplayConversation} from 'app/userSlice';
import React from "react";
import "./style.scss";
import AvatarComponents from "features/Message/components/Avatar";
import PropsType from "prop-types";
import { useDispatch } from "react-redux";

ContactBar.propsType = {
  isOnline: PropsType.bool,
  contactInfo:PropsType.object,
};

ContactBar.defaultProp = {
  isOnline: false,
  contactInfo:{
    uid:'',
    name:'name',
    picture:'',
  }
};

function ContactBar(props) {
  const { isOnline, contactInfo } = props;
  const dispatch = useDispatch();

  const handleClickArrow=()=>{
    dispatch(setDisplayConversation(false));
  }


  return (
    <div className="ContactBar">
      <div className="ListBar">
        <div className="ContactBar__Info">
          <span className="fas fa-arrow-left backArrow" onClick={handleClickArrow}/>
          <div className="ContactBar__Avatar">
            <AvatarComponents isOnline={isOnline} picture={contactInfo.picture} />
          </div>
          <h2>{contactInfo.name}</h2>
        </div>
        <ul className="ContactBar__Menu">
          <li className="ContactBar__Call">
            <IconButton>
              <Tooltip title="Call">
                <CallIcon className="iconContactbar"/>
              </Tooltip>
            </IconButton>
          </li>
          <li className="ContactBar__VideoCall">
            <IconButton>
              <Tooltip title="Chat video">
                <VideoCallIcon className="iconContactbar"/>
              </Tooltip>
            </IconButton>
          </li>
          <li className="ContactBar__Info">
            <IconButton>
              <Tooltip title="More infor">
                <InfoIcon className="iconContactbar"/>
              </Tooltip>
            </IconButton>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ContactBar;
