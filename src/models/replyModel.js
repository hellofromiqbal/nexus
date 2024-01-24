import mongoose, { Schema } from 'mongoose';

const replySchema = new Schema({
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

const Reply = mongoose.models.Reply || mongoose.model('Reply', replySchema);

export default Reply;