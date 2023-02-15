import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FriendItem from '../FriendItem';
import './style.scss';
import { useSelector } from 'react-redux';
import userAPI from 'api/userAPI';

FriendList.propTypes = {
    
};

function FriendList(props) {

    const [infoFriend,setInfoFriend]=useState([]);
    const listFriend=useSelector((state)=>state.message.friendList);

    useEffect(()=>{
        const listInfo = [];
        if(listFriend.length===0){
            setInfoFriend([]);
        }
        listFriend.map((uid,index)=>{
            userAPI.getUserInfor(uid).then((value)=>{
                listInfo.push({
                    uid:uid,
                    name:value.firstName+" "+value.lastName,
                    picture:value.picture,
                });
                if(index===listFriend.length-1){
                    setInfoFriend(listInfo);
                }
            }).catch((error)=>console.log(error));
        })
    },[listFriend]);

    return (
        <ul className="FriendList"> 
            {infoFriend.map((user)=>{
                return <FriendItem 
                key={user.uid} 
                name={user.name} 
                uid={user.uid}
                picture={user.picture} 
                />
            })}
        </ul>
    );
}

export default FriendList;