import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import Reply from "@/models/replyModel";
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();
    const document = await Post.findById(params.id)
    .populate('author')
    .populate({
      path: 'likes',
      populate: {
        path: 'author',
        model: 'User'
      }
    })
    .populate({
      path: 'replies',
      populate: [
        {
          path: 'author',
          model: 'User'
        },
        {
          path: 'likes',
          populate: {
            path: 'author',
            model: 'User'
          }
        }
      ]
    });
    
    if(!document) {
      return NextResponse.json({
        success: false,
        message: 'Post not found.'
      }, { status: 404 });
    };
    
    return NextResponse.json({
      success: true,
      data: document
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  };
};

async function deleteReplyAndChildren(replyId) {
  const reply = await Reply.findById(replyId);

  if (!reply) {
    return; // Reply not found, nothing to delete
  }

  // Recursively delete children
  await Promise.all(reply.replies.map(async (childId) => {
    await deleteReplyAndChildren(childId);
  }));

  // Delete the current reply
  await Reply.findByIdAndDelete(replyId);
}

export const POST = async (request, { params }) => {
  try {
    await connectMongoDB();
    const document = await Post.findById(params.id);
    if (!document) {
      return NextResponse.json({
        success: false,
        message: 'Post not found.'
      }, { status: 404 });
    }

    const { currentUserId } = await request.json();
    const currentUser = await User.findById(currentUserId);
    if (!currentUser) {
      return NextResponse.json({
        success: false,
        message: 'User not found.'
      }, { status: 404 });
    }

    // Remove the post reference from the user
    currentUser.posts.pull(params.id);
    currentUser.likedPosts.pull({ post: params.id });
    await currentUser.save();

    // Remove post references from users who liked the post
    const postLikes = document.likes;
    await Promise.all(postLikes.map(async (like) => {
      const user = await User.findById(like.author);
      if (user) {
        await user.likedPosts.pull({ post: params.id });
        await user.save();
      }
    }));

    // Start the recursive deletion of replies
    const postReplies = document.replies;
    await Promise.all(postReplies.map(async (replyId) => {
      await deleteReplyAndChildren(replyId);
    }));

    // Delete the post
    await Post.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: 'Post deleted.'
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
};