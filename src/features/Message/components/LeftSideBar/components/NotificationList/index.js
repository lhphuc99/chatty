import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import NotificationItem from '../NotificationItem';
import './style.scss';
import { useSelector } from 'react-redux';
import userAPI from 'api/userAPI';
import emptybackground from 'assets/images/emptyNotification.svg';
// import Loading from 'components/Loading';

NotificationList.propTypes = {
    
};

function NotificationList(props) {

    const listFriendRequest = useSelector((state)=>state.message.friendRequests);
    const [listInfo,setListInfo]=useState([]);

    useEffect(()=>{
        let listUser=[];
        if(listFriendRequest.length===0){
            setListInfo([]);
        }
        listFriendRequest.map((uid,index)=>{
            userAPI.getUserInfor(uid).then((value)=>{
                listUser.push({
                    uid:uid,
                    name:value.firstName+" "+value.lastName,
                    picture:value.picture,
                });
                if(index===listFriendRequest.length-1){
                    setListInfo(listUser);
                }
            }).catch((error)=>console.log(error));
        });
    },[listFriendRequest])

    return (
        <ul className="NotificationList">
            {listFriendRequest.length > 0 ? listInfo.map((user)=>{
                return <NotificationItem key={user.uid} uid={user.uid} name={user.name} picture={user.picture}/>
            }):
            <div className="EmptyBackground">
                <h2>No recent notifications</h2>
                <img src={emptybackground} alt="background"/>    
            </div>}
        </ul>
    );
}

export default NotificationList;