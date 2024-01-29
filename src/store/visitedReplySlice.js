import { createSlice, nanoid } from '@reduxjs/toolkit';

const visitedReplySlice = createSlice({
  name: 'visitedPost',
  initialState: {
    visitedReplyInfo: {
      author: '',
      textContent: '',
      likes: [],
      replies: [],
    }
  },
  reducers: {
    setVisitedReply: (state, action) => {
      state.visitedReplyInfo = action.payload;
    },
    addNewReplyOnVisitedReply: (state, action) => {
      state.visitedReplyInfo.replies.unshift(action.payload);
    },
    deleteReplyOnVisitedReply: (state, action) => {
      const updatedReplies = state.visitedReplyInfo.replies.filter((reply) => reply._id !== action.payload.contentId );
      state.visitedReplyInfo.replies = updatedReplies;
    },
    addNewLikeOnPostInVisitedReply: (state, action) => {
      state.visitedReplyInfo.likes.unshift({ _id: nanoid(), author: action.payload, createdAt: new Date().toISOString() });
    },
    deleteLikeOnPostInVisitedReply: (state, action) => {
      const updatedLikes = state.visitedReplyInfo.likes.filter((likes) => likes.author._id !== action.payload.currentUserId);
      state.visitedReplyInfo.likes = updatedLikes;
    },
    addNewLikeOnVisitedReply: (state, action) => {
      state.visitedReplyInfo.likes.unshift({ _id: nanoid(), author: action.payload, createdAt: new Date().toISOString() });
    },
    deleteLikeOnVisitedReply: (state, action) => {
      const updatedLikes = state.visitedReplyInfo.likes.filter((like) => like.author._id !== action.payload.currentUserId );
      state.visitedReplyInfo.likes = updatedLikes;
    }
    // addNewLikeOnReplyInVisitedReply: (state, action) => {
    //   console.log(state.visitedReplyInfo.replies);
    //   console.log(action.payload);
    //   state.visitedReplyInfo.replies.map((reply) => {
    //     if(reply._id === action.payload.replyId) {
    //       reply.likes.unshift({ _id: nanoid(), author: action.payload.currentUser, createdAt: new Date().toISOString() });
    //     };
    //   });
    // },
    // deleteLikeOnReplyInVisitedReply: (state, action) => {
    //   state.visitedReplyInfo.replies.map((reply) => {
    //     if(reply._id === action.payload.replyId) {
    //       const updatedReplyLikes = reply.likes.filter((like) => like.author._id !== action.payload.currentUserId);
    //       reply.likes = updatedReplyLikes;
    //     };
    //   });
    // }
  }
});

export const {
  setVisitedReply,
  addNewReplyOnVisitedReply,
  deleteReplyOnVisitedReply,
  addNewLikeOnPostInVisitedReply,
  deleteLikeOnPostInVisitedReply,
  addNewLikeOnVisitedReply,
  deleteLikeOnVisitedReply
  // addNewLikeOnReplyInVisitedReply,
  // deleteLikeOnReplyInVisitedReply
} = visitedReplySlice.actions;
export const selectVisitedReply = (state) => state.visitedReply.visitedReplyInfo;
export default visitedReplySlice.reducer;