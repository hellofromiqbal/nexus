import { createSlice, nanoid } from '@reduxjs/toolkit';

const currentPostsSlice = createSlice({
  name: 'currentPosts',
  initialState: {
    posts: []
  },
  reducers: {
    setCurrentPosts: (state, action) => {
      state.posts = action.payload;
      console.log(state.posts);
    },
    addNewPost: (state, action) => {
      state.posts.unshift(action.payload);
      console.log(state.posts);
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
      console.log(state.posts);
    },
    likePost: (state, action) => {
      state.posts.map((post) => {
        if(post._id === action.payload.id) {
          post.likes.unshift({ _id: nanoid(), author: action.payload.currentUser, createdAt: new Date().toISOString() });
        }
      });
    },
    unlikePost: (state, action) => {
      state.posts.map((post) => {
        if(post._id === action.payload.id) {
          post.likes = post.likes.filter((like) => like.author._id !== action.payload.currentUserId);
        };
      });
    }
  }
});

export const {
  setCurrentPosts,
  addNewPost,
  deletePost,
  likePost,
  unlikePost
} = currentPostsSlice.actions;
export const selectCurrentPosts = (state) => state.currentPosts.posts;
export default currentPostsSlice.reducer;