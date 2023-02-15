import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendRequests: [],
  friendList: [],
  sendFriendRequests: [],
  currentContact: {},
  groupChat: [],
  lastMessageByGroupChat: [],
  currentGroupID: "",
  currentMessage:[],
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialState,
  reducers: {
    setfriendRequests: (state, action) => {
      state.friendRequests = action.payload;
    },
    setfriendList: (state, action) => {
      state.friendList = action.payload;
    },
    setSendFriendRequest: (state, action) => {
      state.sendFriendRequests = action.payload;
    },
    setCurrentContact: (state, action) => {
      state.currentContact = action.payload;
    },
    setGroupChat: (state, action) => {
      state.groupChat = action.payload;
    },
    setLastMessageByGroupChat: (state, action) => {
      state.lastMessageByGroupChat = action.payload;
    },
    setCurrentGroupID: (state, action) => {
      state.currentGroupID = action.payload;
    },
    setCurrentMessage:(state,action)=>{
      state.currentMessage=action.payload;
    }
  },
});

const { reducer, actions } = messageSlice;

export const {
  setfriendRequests,
  setfriendList,
  setSendFriendRequest,
  setCurrentContact,
  setGroupChat,
  setLastMessageByGroupChat,
  setCurrentGroupID,
  setCurrentMessage,
} = actions;
export default reducer;
