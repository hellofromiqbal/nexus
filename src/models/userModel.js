import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    require: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    default: 'Hello there! I am using Nexus.'
  },
  location: {
    type: String,
    default: 'Somewhere'
  },
  profileImage: {
    type: String,
    default: null
  },
  bgProfileImage: {
    type: String,
    default: null
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  likedPosts: [{
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  }],
  followers: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  }],
  following: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  verifyEmailToken: String,
  verifyEmailTokenExpiryDate: Date,
  resetPasswordToken: String,
  resetPasswordTokenExpiryDate: Date,
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;