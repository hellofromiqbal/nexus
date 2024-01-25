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
    },
    addLikeOnVisitedPost: (state, action) => {
      state.visitedPostInfo.likes.unshift({ _id: nanoid(), author: action.payload, createdAt: new Date().toISOString() });
    },
    deleteLikeOnVisitedPost: (state, action) => {
      const updatedLikes = state.visitedPostInfo.likes.filter((likes) => likes.author._id !== action.payload.currentUserId);
      state.visitedPostInfo.likes = updatedLikes;
    }
  }
});

export const {
  setVisitedPost,
  addNewPostOnVisitedPost,
  addLikeOnVisitedPost,
  deleteLikeOnVisitedPost
} = visitedPostSlice.actions;
export const selectVisitedPost = (state) => state.visitedPost.visitedPostInfo;
export default visitedPostSlice.reducer;