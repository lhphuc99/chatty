messageAPI.receiveLastMessageListener(uid,(snapShot)=>{
    if(!snapShot.val()){
      setLastMessageByGroupChat([]);
      return;
    }
    console.log(snapShot.val());
    Object.keys(snapShot.val()).forEach(async(groupID, index) => {
        const list = [];
        if (snapShot.val().sender !== uid) {
          const info = await userAPI.getUserInfor(snapShot.val().sender);
          list.push({
            groupID: groupID,
            lastMessage: snapShot.val().lastMessage,
            contactName: info.firstName + " " + info.lastName,
            senderID: snapShot.val().sender,
            picture: info.picture,
            timestamp: snapShot.val().timestamp,
          });
        } else {
          const idArr = groupID.split("-", 2);
          const contactID = idArr[0] !== uid ? idArr[0] : idArr[1];
          const info = await userAPI.getUserInfor(contactID);
          list.push({
            groupID: groupID,
            lastMessage: snapShot.val().lastMessage,
            contactName: info.firstName + " " + info.lastName,
            senderID: snapShot.val().sender,
            picture: info.picture,
            timestamp: snapShot.val().timestamp,
          });
        }
        if (index === Object.keys(snapshot.val()).length - 1) {
          dispatch(setLastMessageByGroupChat(list));
        }
    });
  });