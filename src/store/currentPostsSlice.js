import { createSlice, nanoid } from '@reduxjs/toolkit';

const currentPostsSlice = createSlice({
  name: 'currentPosts',
  initialState: {
    posts: []
  },
  reducers: {
    setCurrentPosts: (state, action) => {
      state.posts = action.payload;
    },
    addNewPostToCurrentPosts: (state, action) => {
      state.posts.unshift(action.payload);
    },
    deletePostFromCurrentPosts: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    addNewLikeOnPostInCurrentPosts: (state, action) => {
      state.posts.map((post) => {
        if(post._id === action.payload.id) {
          post.likes.unshift({ _id: nanoid(), author: action.payload.currentUser, createdAt: new Date().toISOString() });
        }
      });
    },
    deleteLikeOnPostInCurrentPosts: (state, action) => {
      state.posts.map((post) => {
        if(post._id === action.payload.id) {
          post.likes = post.likes.filter((like) => like.author._id !== action.payload.currentUserId);
        };
      });
    },
    addNewReplyOnPostInCurrentPosts: (state, action) => {
      state.posts.map((post) => {
        if(post._id === action.payload.id) {
          post.replies.unshift(action.payload.replyId);
        };
      });
    }
  }
});

export const {
  setCurrentPosts,
  addNewPostToCurrentPosts,
  deletePostFromCurrentPosts,
  addNewLikeOnPostInCurrentPosts,
  deleteLikeOnPostInCurrentPosts,
  addNewReplyOnPostInCurrentPosts
} = currentPostsSlice.actions;
export const selectCurrentPosts = (state) => state.currentPosts.posts;
export default currentPostsSlice.reducer;