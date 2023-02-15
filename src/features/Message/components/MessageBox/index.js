import React from "react";
import { useSelector } from "react-redux";
import ContactBar from "./components/ContactBar";
import FooterBox from "./components/FooterMessageBox";
import MessageBody from "./components/MessageBody";
import './style.scss';
import background from 'assets/images/noSelectContact.svg';
import logo from 'assets/images/logo.png';

function MessageBox(props) {

  const currentContact = useSelector((state)=>state.message.currentContact);
  const check = Object.keys(currentContact).length;
  

  return (
    <>
      {check!==0?<div className="MessageBox">
        <div className="MessageBox__Header">
          <div className="MessageBox__ContacBar">
            <ContactBar isOnline={false} contactInfo = {currentContact}/>
          </div>
        </div>
        <div className="MessageBox__Body" id="scrollbar">
          <MessageBody/>
        </div>
        <div className="MessageBox__Footer">
          <FooterBox/>
        </div>
      </div>:
      <div className="noSelectContact">
        <div className="noSelectContact__Header">
          <div className="noSelectContact__logo">
            <img src={logo} alt="logo"/>
            <h2>Welcome to </h2>
            <span>chatty</span>
          </div>
          <h4>The application provides the best chat, video call feature for you.</h4>
        </div>
        <img src={background} alt="background"/>
      </div>}
    </>
  );
}

export default MessageBox;
