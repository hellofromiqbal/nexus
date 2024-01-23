import { configureStore } from '@reduxjs/toolkit';
import currentUser from './currentUserSlice';

const store = configureStore({
  reducer: {
    currentUser: currentUser
  }
});

export default store;