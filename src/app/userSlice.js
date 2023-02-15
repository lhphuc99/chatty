import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';


const initialState={
    currentUser:{
        uid:'',
        firstName:'',
        lastName:'',
        picture:'',
        token:'',
        email:'',
    },
    displayConversation:false,
    darkMode:false,
}

const cookies = new Cookies();

const userSlice = createSlice({
    name:'user',
    initialState:initialState,
    reducers:{
        setCurrentUser:(state,action)=>{
            state.currentUser=action.payload;
            localStorage.setItem('uid',state.currentUser.uid);
            cookies.set('token',state.currentUser.token);
        },
        removeCurrentUser:(state,action)=>{
            state.currentUser=initialState.currentUser;
            localStorage.removeItem('uid');
            cookies.remove('token');
        },
        setDisplayConversation:(state,action)=>{
            state.displayConversation=action.payload;
        },
        setDarkMode:(state,action)=>{
            state.darkMode=action.payload;
            if(action.payload===true)
                localStorage.setItem('theme','dark');
            else
                localStorage.setItem('theme','light');
        }
    }
});

const {reducer,actions} = userSlice;
export const {setCurrentUser,removeCurrentUser,setDisplayConversation,setDarkMode} = actions;
export default reducer;
