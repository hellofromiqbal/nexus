import { createSlice } from '@reduxjs/toolkit';

const visitedUserSlice = createSlice({
  name: 'visitedUser',
  initialState: {
    visitedUserInfo: {
      username: '',
      email: '',
      password: '',
      fullname: '',
      bio: 'Hello there! I am using Sphere.',
      profileImage: null,
      posts: [],
      likes: [],
      followers: [],
      following: [],
      isVerified: false,
      verifyEmailToken: '',
      verifyEmailTokenExpiryDate: null,
      resetPasswordToken: '',
      resetPasswordTokenExpiryDate: null,
    }
  },
  reducers: {
    setVisitedUser: (state, action) => {
      state.visitedUserInfo = action.payload;
    },
  }
});

export const {
  setVisitedUser
} = visitedUserSlice.actions;
export const selectVisitedUser = (state) => state.visitedUser.visitedUserInfo;
export default visitedUserSlice.reducer;