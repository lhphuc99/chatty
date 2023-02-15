import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'app/userSlice';
import notificationReducer from 'app/notificationSlice';
import messageReducer from 'app/messageSlice';

const rootReducer={
    user:userReducer,
    notify:notificationReducer,
    message:messageReducer,
}

const store = configureStore({
    reducer:rootReducer,
});

export default store;
