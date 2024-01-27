import { configureStore } from '@reduxjs/toolkit';
import currentUser from './currentUserSlice';
import currentPosts from './currentPostsSlice';
import visitedUser from './visitedUserSlice';
import visitedPost from './visitedPostSlice';
import visitedReply from './visitedReplySlice';

const store = configureStore({
  reducer: {
    currentUser: currentUser,
    currentPosts: currentPosts,
    visitedUser: visitedUser,
    visitedPost: visitedPost,
    visitedReply: visitedReply
  }
});

export default store;