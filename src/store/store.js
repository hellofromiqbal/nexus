import { configureStore } from '@reduxjs/toolkit';
import currentUser from './currentUserSlice';
import currentPosts from './currentPostsSlice';
import visitedUser from './visitedUserSlice';

const store = configureStore({
  reducer: {
    currentUser: currentUser,
    currentPosts: currentPosts,
    visitedUser: visitedUser,
  }
});

export default store;