import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import AvatarComponents from 'features/Message/components/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentContact,setCurrentGroupID,setCurrentMessage } from 'app/messageSlice';
import {setDisplayConversation} from 'app/userSlice';

ContactItem.propTypes={
    name:PropTypes.string,
    picture:PropTypes.string,
    senderID:PropTypes.string,
    groupID:PropTypes.string,
    message:PropTypes.string,
    date:PropTypes.string,
    isOnline:PropTypes.bool,
};

ContactItem.defaultProps={
    name:'name',
    picture:'',
    senderID:"sender",
    groupID:'',
    message:"message",
    date:"06/11/2020",
    isOnline:false,
}

function ContactItem(props) {

    const {name,picture,senderID, groupID ,message,date,isOnline}=props;

    const uid = useSelector((state)=>state.user.currentUser.uid);
    const currentGroupID = useSelector((state)=>state.message.currentGroupID);
    const dispatch = useDispatch();
    const arrayID = groupID.split('-',2);
    const currentContactID = arrayID[0]===uid?arrayID[1]:arrayID[0];

    const handleClickContact=()=>{
        dispatch(setCurrentContact({
            uid:currentContactID,
            name:name,
            picture:picture,
        }));
        dispatch(setDisplayConversation(true));
        if(currentGroupID!==groupID){
            dispatch(setCurrentMessage([]));
            dispatch(setCurrentGroupID(groupID));
        }
    }

    return (
        <li className="ContactItem" onClick={handleClickContact}>
            <div className="ContactItem__Avatar">
                <AvatarComponents picture={picture} isOnline={isOnline}/>
            </div>
            <div className="ContactItem__Detail">
                <h4>{name}</h4>
                {uid===senderID?<h6>{'You:'}{" "}{message}</h6>:<h6>{message}</h6>}
            </div>
            <div className="ContactItem__DateStatus">
                <h6>{date}</h6>
            </div>
        </li>
    );
}

export default ContactItem;