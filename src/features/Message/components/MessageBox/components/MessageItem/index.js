import React from "react";
import PropTypes from "prop-types";
import "./style.scss";
import AvatarComponents from "features/Message/components/Avatar";
import * as constants from 'constants/index';
import DisplayPhoto from './components/DisplayPhoto';

MessageItem.propTypes = {
  pos: PropTypes.string,
  picture: PropTypes.string,
  message: PropTypes.any,
  date: PropTypes.string,
  name: PropTypes.string,
};

MessageItem.defaultProps = {
  pos: "left",
  picture: '',
  message: "Firebase.",
  date: "18/12/1999   20:15 PM",
  name: "name sender",
};

function MessageItem(props) {
  const { pos, type , picture, name, message, date } = props;

  const leftMessageItem = (
    <div className="MessageItem__Container">
      <div className="MessageItem__Avatar">
        <AvatarComponents isOnline={false} picture={picture}/>
      </div>
      <div className="MessageItem__Content">
        <div className="MessageItem__Detail">
          <div className="MessageItem__Name">
            <p>{name}</p>
          </div>
          <div className="MessageItem__Date">
            <p>{date}</p>
          </div>
        </div>
        <div className="MessageItem__Msg">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );

  const rightMessageItem = (
    <div className="MessageItem__Container--Right">
      <div className="MessageItem__Content--Right">
        <div className="MessageItem__Msg--Right">
          <p>{message}</p>
        </div>
        <div className="MessageItem__Detail--Right">
          <p>{date}</p>
        </div>
      </div>
    </div>
  );

  const leftMessageItemPhoto=(
    <div className="MessageItem__Container">
      <div className="MessageItem__Avatar">
        <AvatarComponents isOnline={false} picture={picture}/>
      </div>
      <div className="MessageItem__Content">
        <div className="MessageItem__Detail">
          <div className="MessageItem__Name">
            <p>{name}</p>
          </div>
          <div className="MessageItem__Date">
            <p>{date}</p>
          </div>
        </div>
        <div className="MessageItem__Photo">
          <DisplayPhoto url={message}/>
        </div>
      </div>
    </div>
  );


  const rightMessageItemPhoto=(
    <div className="MessageItem__Container--Right">
    <div className="MessageItem__Content--Right">
      <div className="MessageItem__Photo--Right">
        <DisplayPhoto url={message}/>
      </div>
      <div className="MessageItem__Detail--Right">
        <p>{date}</p>
      </div>
    </div>
  </div>
  );

  const leftMessageItemSticker=(
    <div className="MessageItem__Container">
      <div className="MessageItem__Avatar">
        <AvatarComponents isOnline={false} picture={picture}/>
      </div>
      <div className="MessageItem__Content">
        <div className="MessageItem__Detail">
          <div className="MessageItem__Name">
            <p>{name}</p>
          </div>
          <div className="MessageItem__Date">
            <p>{date}</p>
          </div>
        </div>
        <div className="MessageItem__Sticker">
          <img src={message} alt=""/>
        </div>
      </div>
    </div>
  );

  const rightMessageItemSticker=(
    <div className="MessageItem__Container--Right">
    <div className="MessageItem__Content--Right">
      <div className="MessageItem__Sticker--Right">
        <img src={message} alt=""/>
      </div>
      <div className="MessageItem__Detail--Right">
        <p>{date}</p>
      </div>
    </div>
  </div>
  );

  const rightMessageItemFile = (
    <div className="MessageItem__Container--Right">
      <div className="MessageItem__Content--Right">
        <div className="MessageItem__File--Right">
          <p>
            <span className="fas fa-arrow-circle-down"/>
            <a 
            href={message.url}
            target="_blank"
            rel="noopener noreferrer"
            download={message.fileName}
            >
              {message.fileName}
            </a>
          </p>
        </div>
        <div className="MessageItem__Detail--Right">
          <p>{date}</p>
        </div>
      </div>
    </div>
  );

  const leftMessageItemFile=(
    <div className="MessageItem__Container">
      <div className="MessageItem__Avatar">
        <AvatarComponents isOnline={false} picture={picture}/>
      </div>
      <div className="MessageItem__Content">
        <div className="MessageItem__Detail">
          <div className="MessageItem__Name">
            <p>{name}</p>
          </div>
          <div className="MessageItem__Date">
            <p>{date}</p>
          </div>
        </div>
        <div className="MessageItem__File">
          <p>
            <span className="fas fa-arrow-circle-down"/>
            <a 
            href={message.url}
            rel="noopener noreferrer"
            download={message.fileName}
            target="_blank"
            >
              {message.fileName}
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  const renderMessageItem = ()=>{
    if(type===constants.TEXT){
      return pos === "left"? leftMessageItem : rightMessageItem;
    }
    if(type===constants.PHOTO){
      return pos === "left" ? leftMessageItemPhoto : rightMessageItemPhoto;
    }
    if(type===constants.FILE){
      return pos === "left" ? leftMessageItemFile : rightMessageItemFile;
    }
    if(type===constants.STICKER){
      return pos ==="left" ? leftMessageItemSticker: rightMessageItemSticker;
    }
  }

  return (
    <li className="MessageItem">
      {renderMessageItem()}
    </li>
  );
}

export default MessageItem;
