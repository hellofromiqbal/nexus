import { createSlice, nanoid } from '@reduxjs/toolkit';

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
    addNewFollower: (state, action) => {
      state.visitedUserInfo.followers.unshift({ ...action.payload, createdAt: new Date().toISOString(), _id: nanoid(24) });
    },
    deleteFollower: (state, action) => {
      const updatedFollowers = state.visitedUserInfo.followers.filter((user) => user.user._id !== action.payload);
      state.visitedUserInfo.followers = updatedFollowers;
    }
  }
});

export const {
  setVisitedUser,
  addNewFollower,
  deleteFollower
} = visitedUserSlice.actions;
export const selectVisitedUser = (state) => state.visitedUser.visitedUserInfo;
export default visitedUserSlice.reducer;