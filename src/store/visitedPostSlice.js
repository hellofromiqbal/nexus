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
    addNewReplyOnVisitedPost: (state, action) => {
      state.visitedPostInfo.replies.unshift(action.payload);
    },
    deleteReplyOnVisitedPost: (state, action) => {
      const updatedReplies = state.visitedPostInfo.replies.filter((reply) => reply._id !== action.payload.contentId );
      state.visitedPostInfo.replies = updatedReplies;
    },
    addNewLikeOnPostInVisitedPost: (state, action) => {
      state.visitedPostInfo.likes.unshift({ _id: nanoid(), author: action.payload, createdAt: new Date().toISOString() });
    },
    deleteLikeOnPostInVisitedPost: (state, action) => {
      const updatedLikes = state.visitedPostInfo.likes.filter((likes) => likes.author._id !== action.payload.currentUserId);
      state.visitedPostInfo.likes = updatedLikes;
    },
    addNewLikeOnReplyInVisitedPost: (state, action) => {
      console.log(state.visitedPostInfo.replies);
      console.log(action.payload);
      state.visitedPostInfo.replies.map((reply) => {
        if(reply._id === action.payload.replyId) {
          reply.likes.unshift({ _id: nanoid(), author: action.payload.currentUser, createdAt: new Date().toISOString() });
        };
      });
    },
    deleteLikeOnReplyInVisitedPost: (state, action) => {
      state.visitedPostInfo.replies.map((reply) => {
        if(reply._id === action.payload.replyId) {
          const updatedReplyLikes = reply.likes.filter((like) => like.author._id !== action.payload.currentUserId);
          reply.likes = updatedReplyLikes;
        };
      });
    }
  }
});

export const {
  setVisitedPost,
  addNewReplyOnVisitedPost,
  deleteReplyOnVisitedPost,
  addNewLikeOnPostInVisitedPost,
  deleteLikeOnPostInVisitedPost,
  addNewLikeOnReplyInVisitedPost,
  deleteLikeOnReplyInVisitedPost
} = visitedPostSlice.actions;
export const selectVisitedPost = (state) => state.visitedPost.visitedPostInfo;
export default visitedPostSlice.reducer;