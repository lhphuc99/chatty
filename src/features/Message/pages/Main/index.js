import { Grid, useMediaQuery } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import userAPI from "api/userAPI";
import messageAPI from "api/messageAPI";
import { removeCurrentUser } from "app/userSlice";
import {
  setfriendRequests,
  setfriendList,
  setSendFriendRequest,
  setGroupChat,
  setLastMessageByGroupChat,
} from "app/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import MainNav from "features/Message/components/MainNav";
import MessageBox from "features/Message/components/MessageBox";
import "./style.scss";
import LeftSideBar from "features/Message/components/LeftSideBar";
import * as constants from 'constants/index';

const MainPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openNav, setOpenNav] = useState(false);
  const uid = useSelector((state) => state.user.currentUser.uid);
  const [numberOfFriendRequests, setNumberOfFriendRequests] = useState(0);
  const [navOption, setnavOption] = useState(0);
  const checksize = useMediaQuery('(max-width:600px)');
  const displayConversation = useSelector((state)=>state.user.displayConversation);

  useEffect(() => {

    userAPI.receiveFriendRequestListener(uid, (snapshot) => {
      if (!snapshot.val()) {
        setNumberOfFriendRequests(0);
        dispatch(setfriendRequests([]));
        return;
      }
      dispatch(setfriendRequests(Object.keys(snapshot.val())));
      setNumberOfFriendRequests(Object.keys(snapshot.val()).length);
    });

    userAPI.friendListListener(uid, (snapshot) => {
      if (!snapshot.val()) {
        dispatch(setfriendList([]));
        return;
      }
      dispatch(setfriendList(Object.keys(snapshot.val())));
    });

    userAPI.sendFriendRequestListener(uid, (snapshot) => {
      if (!snapshot.val()) {
        dispatch(setSendFriendRequest([]));
        return;
      }
      dispatch(setSendFriendRequest(Object.keys(snapshot.val())));
    });

    messageAPI.groupChatListener(uid, (snapshot) => {
      if (!snapshot.val()) {
        dispatch(setGroupChat([]));
        return;
      }
      dispatch(setGroupChat(Object.keys(snapshot.val())));
    });

    messageAPI.receiveLastMessageListener(uid,(snapShot)=>{
      if(!snapShot.val()||uid===''){
        setLastMessageByGroupChat([]);
        return;
      }
      const data = snapShot.val();
      const dataKey = Object.keys(snapShot.val());
      const list = [];
      dataKey.forEach(async(groupID, index) => {
          const senderID = data[groupID].sender;
          const dataChild = data[groupID];
          // console.log(dataKey);
          // console.log(dataChild);
          if (senderID !== uid) {
            const info = await userAPI.getUserInfor(senderID);
            const text1 = info.firstName + " " + info.lastName + ' ' + 'send a photo';
            const text2 = info.firstName + " " + info.lastName + ' ' + 'send a file';
            const text3 = info.firstName + " " + info.lastName + ' ' + 'send a sticker';
            const lastMessage = dataChild.type === constants.TEXT ? dataChild.lastMessage:
            dataChild.type===constants.PHOTO?text1:dataChild.type===constants.STICKER?text3:text2;
            list.push(Object.assign({},{
              groupID: groupID,
              lastMessage: lastMessage,
              contactName: info.firstName + " " + info.lastName,
              senderID: senderID,
              picture: info.picture,
              timestamp: dataChild.timestamp,
            }));
          } else {
            const idArr = groupID.split("-", 2);
            const contactID = idArr[0] !== uid ? idArr[0] : idArr[1];
            const info = await userAPI.getUserInfor(contactID);
            const text1 ='Send a photo';
            const text2 ='Send a file';
            const text3 = 'Send a sticker';
            const lastMessage = dataChild.type === constants.TEXT ? dataChild.lastMessage:
            dataChild.type===constants.PHOTO?text1:dataChild.type===constants.STICKER?text3:text2;
            list.push(Object.assign({},{
              groupID: groupID,
              lastMessage: lastMessage,
              contactName: info.firstName + " " + info.lastName,
              senderID: senderID,
              picture: info.picture,
              timestamp: dataChild.timestamp,
            }));
          }
          if (index === dataKey.length - 1) {
            list.sort((a,b)=>{
              return b.timestamp-a.timestamp;
            });
            dispatch(setLastMessageByGroupChat(list));
          }
      });
    });

  }, []);


  const handleOpenNav = (openNav) => {
    setOpenNav(openNav);
  };

  const handlechooseNavOption = (value) => {
    setnavOption(value);
  };

  const handleClickSignOut = () => {
    userAPI
      .signOut()
      .then(() => {
        dispatch(removeCurrentUser());
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Grid container wrap="nowrap" direction="row" className="Main">
        <Grid item className="MainNav">
          <MainNav
            isOpen={openNav}
            isClose={handleOpenNav}
            clickSignOut={handleClickSignOut}
            numberOfFriendRequests={numberOfFriendRequests}
            chooseOption={handlechooseNavOption}
          />
        </Grid>
        <Grid item className="Main__LeftSideBar">
          {checksize===false?<div className="Main__Container">
            <LeftSideBar
              clickOpenNavBtn={handleOpenNav}
              numberOfFriendRequests={numberOfFriendRequests}
              navOption={navOption}
            />
          </div>:displayConversation===false?<div className="Main__Container">
          <LeftSideBar
              clickOpenNavBtn={handleOpenNav}
              numberOfFriendRequests={numberOfFriendRequests}
              navOption={navOption}
          /></div>:null}
        </Grid>
        {checksize===false?<Grid item className="Main__MessageBox" zeroMinWidth={true}>
          <MessageBox />
        </Grid>:displayConversation===true?<Grid item className="Main__MessageBox" zeroMinWidth={true}>
          <MessageBox />
        </Grid>:null}
      </Grid>
    </>
  );
};

export default MainPage;
