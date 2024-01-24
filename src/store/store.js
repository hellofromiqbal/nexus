import { configureStore } from '@reduxjs/toolkit';
import currentUser from './currentUserSlice';
import currentPosts from './currentPostsSlice';
import visitedUser from './visitedUserSlice';
import visitedPost from './visitedPostSlice';

const store = configureStore({
  reducer: {
    currentUser: currentUser,
    currentPosts: currentPosts,
    visitedUser: visitedUser,
    visitedPost: visitedPost
  }
});

export default store;