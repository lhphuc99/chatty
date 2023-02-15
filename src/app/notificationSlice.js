import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    type:'',
    message:null,
};

const notificationSlice = createSlice({
    name:'notification',
    initialState:initialState,
    reducers:{
        setNotification:(state,action)=>{
            state.type=action.payload.type;
            state.message=action.payload.message;
        },
        clearNotification:(state,action)=>{
            return state = initialState;
        },
    }
});

const {reducer,actions}=notificationSlice;
export const {setNotification,clearNotification} = actions;
export default reducer;
