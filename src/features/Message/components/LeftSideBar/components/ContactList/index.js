import React from "react";
import { useSelector } from "react-redux";
import { formatTime } from "utils/formatTime";
import ContactItem from "../ContactItem";
import './style.scss';

function ContactList(props) {

  const lastMessageByGroupChat = useSelector((state)=>state.message.lastMessageByGroupChat);

  return(
  <>
    <ul className="ContactList">
        {lastMessageByGroupChat.map((value)=>{
          return <ContactItem 
                  key={value.groupID}
                  groupID={value.groupID}
                  name={value.contactName} 
                  senderID={value.senderID} 
                  picture={value.picture} 
                  message={value.lastMessage} 
                  date={formatTime(value.timestamp)}
                  isOnline={false}
                  />
        })}
    </ul>
  </>

);
}
export default ContactList;
