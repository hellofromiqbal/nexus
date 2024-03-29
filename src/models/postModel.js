import mongoose, { Schema } from 'mongoose';

const postSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  textContent: {
    type: String,
    required: true
  },
  likes: [{
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  }],
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply'
  }]
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

export default Post;