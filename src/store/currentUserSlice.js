import { createSlice } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    currentUserInfo: {
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
    setCurrentUser: (state, action) => {
      state.currentUserInfo = action.payload;
    },
  }
});

export const {
  setCurrentUser
} = currentUserSlice.actions;
export const selectCurrentUser = (state) => state.currentUser.currentUserInfo;
export default currentUserSlice.reducer;