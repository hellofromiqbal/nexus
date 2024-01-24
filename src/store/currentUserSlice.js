import { createSlice, nanoid } from '@reduxjs/toolkit';

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    currentUserInfo: {
      username: '',
      email: '',
      password: '',
      fullname: '',
      bio: 'Hello there! I am using Sphere.',
      location: '',
      profileImage: null,
      bgProfileImage: null,
      posts: [],
      likedPosts: [],
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
    addNewFollowing: (state, action) => {
      state.currentUserInfo.following.unshift({ ...action.payload, createdAt: new Date().toISOString(), _id: nanoid(24) });
    },
    deleteFollowing: (state, action) => {
      const updatedFollowing = state.currentUserInfo.following.filter((user) => user.user._id !== action.payload);
      state.currentUserInfo.following = updatedFollowing;
    }
  }
});

export const {
  setCurrentUser,
  addNewFollowing,
  deleteFollowing
} = currentUserSlice.actions;
export const selectCurrentUser = (state) => state.currentUser.currentUserInfo;
export default currentUserSlice.reducer;