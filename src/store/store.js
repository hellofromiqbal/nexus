import { configureStore } from '@reduxjs/toolkit';
import currentUser from './currentUserSlice';
import visitedUser from './visitedUserSlice';

const store = configureStore({
  reducer: {
    currentUser: currentUser,
    visitedUser: visitedUser
  }
});

export default store;