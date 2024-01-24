import { createSlice, nanoid } from '@reduxjs/toolkit';

const visitedPostSlice = createSlice({
  name: 'visitedPost',
  initialState: {
    visitedPostInfo: {
      author: '',
      textContent: '',
      likes: [],
      replies: [],
    }
  },
  reducers: {
    setVisitedPost: (state, action) => {
      state.visitedPostInfo = action.payload;
    },
    addNewPostOnVisitedPost: (state, action) => {
      state.visitedPostInfo.replies.unshift(action.payload);
    }
  }
});

export const {
  setVisitedPost,
  addNewPostOnVisitedPost
} = visitedPostSlice.actions;
export const selectVisitedPost = (state) => state.visitedPost.visitedPostInfo;
export default visitedPostSlice.reducer;