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
    }
  }
});

export const {
  setCurrentPosts,
  addNewPost,
  deletePost
} = currentPostsSlice.actions;
export const selectCurrentPosts = (state) => state.currentPosts.posts;
export default currentPostsSlice.reducer;