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
    addNewPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    likePost: (state, action) => {
      state.posts.map((post) => {
        if(post._id === action.payload.id) {
          post.likes.unshift(action.payload.currentUserId);
        }
      });
    }
  }
});

export const {
  setCurrentPosts,
  addNewPost,
  deletePost,
  likePost
} = currentPostsSlice.actions;
export const selectCurrentPosts = (state) => state.currentPosts.posts;
export default currentPostsSlice.reducer;