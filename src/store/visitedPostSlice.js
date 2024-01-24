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
      console.log(state.visitedPostInfo);
      state.visitedPostInfo = action.payload;
      console.log(state.visitedPostInfo);
    }
  }
});

export const {
  setVisitedPost
} = visitedPostSlice.actions;
export const selectVisitedUser = (state) => state.visitedPost.visitedPostInfo;
export default visitedPostSlice.reducer;