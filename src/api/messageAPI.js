import {db} from 'services/firebaseConfig';
import timeAPI from 'api/timeAPI';

const messageAPI = {
    sendMessage:(message,type,fromID, toID)=>{
        return new Promise((resolve,reject)=>{
            const time = timeAPI.getCurrentUnixTime();
            const groupiD = fromID > toID ? fromID +'-'+ toID : toID +'-'+ fromID;

            db.ref('chats/'+ fromID + '/' + groupiD).set({
                lastMessage:message,
                type:type,
                timestamp: time,
                sender:fromID,
            });

            db.ref('chats/'+ toID + '/' + groupiD).set({
              lastMessage:message,
              type:type,
              timestamp: time,
              sender:fromID,
            });

            db.ref('users/'+ fromID +'/groups/'+ groupiD).once('value').then((snapShot)=>{
              if (!snapShot.val()){
                db.ref('users/'+ fromID +'/groups/'+ groupiD).set(true);
                db.ref('users/'+ toID +'/groups/'+ groupiD).set(true);
              }
            }).catch((error)=>console.log(error));

            db.ref("members/" + groupiD)
              .once('value')
              .then((snapShot) => {
                if (!snapShot.val()) {
                  db.ref("members/" + groupiD).set({
                    [fromID]: true,
                    [toID]: true,
                  });
                }
              });

            db.ref('messages/'+ groupiD + '/' + time).set({
                message:message,
                type:type,
                uid:fromID,
                timestamp:time,
            });

        });
    },

    getGroupMembers:(groupID)=>{
      return new Promise((resolve,reject)=>{
        db.ref('members/'+ groupID ).once('value').then((snapShot)=>{
          resolve(snapShot.val());
        }).catch((error)=>{
          reject(error);
          console.log(error);
        })
      });
    },

    receiveLastMessageListener:(uid,handleFunc)=>{
      if(uid==='')
        return;
      return db.ref('chats/'+ uid).on('value',handleFunc);
    },

    groupChatListener:(uid,handleFunc)=>{
      return db.ref('users/'+ uid+ '/groups/').on('value',handleFunc);
    },

    receiveMessageListener:(groupID,handleFunc)=>{
      if(groupID==='')
        return '';
      return db.ref('messages/'+groupID).on('value',handleFunc);
    },
}

export default messageAPI;