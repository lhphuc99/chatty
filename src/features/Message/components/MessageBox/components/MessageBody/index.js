import messageAPI from 'api/messageAPI';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageItem from '../MessageItem';
import {setCurrentMessage} from 'app/messageSlice';
import { formatTimeFull } from "utils/formatTime";
import './style.scss';

function MessageBody(props) {
    const ref=useRef();
    const groupID = useSelector((state)=>state.message.currentGroupID);
    const message = useSelector((state)=>state.message.currentMessage);
    const currentUID = useSelector((state)=>state.user.currentUser.uid);
    const currentContact = useSelector((state)=>state.message.currentContact);
    const dispatch = useDispatch();

    const handleScroll=()=>{
        ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          });
    }
    useEffect(()=>{
        handleScroll();
    },[message]);

    useEffect(()=>{
        messageAPI.receiveMessageListener(groupID,(snapShot)=>{
            if(!snapShot.val()){
                dispatch(setCurrentMessage([]));
                return;
            }
            const result = snapShot.val();
            const messageKey = Object.keys(snapShot.val());
            const messageResult = [];
            messageKey.sort((a,b)=>{
               return a-b;
            });
            messageKey.forEach((key,index)=>{
                messageResult.push(result[key]);
                if(index===messageKey.length-1){
                    dispatch(setCurrentMessage(messageResult));
                }
            });
        });
    },[groupID]);

    return (
        <ul className="MessageBody">
            {message.map((value)=>{
                const time = formatTimeFull(value.timestamp);
                if(value.uid!==currentUID){
                    return <MessageItem 
                            key={value.timestamp} 
                            name={currentContact.name}
                            picture={currentContact.picture} 
                            pos='left'
                            type={value.type} 
                            message={value.message} 
                            date={time}
                            />
                }
                return <MessageItem 
                        key={value.timestamp} 
                        name={currentContact.name} 
                        picture={currentContact.picture} 
                        pos='right'
                        type={value.type}
                        message={value.message} 
                        date={time}
                        />
            })}
            <div ref={ref}></div>
        </ul>
    );
}

export default MessageBody;