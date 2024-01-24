import connectMongoDB from '@/libs/mongodb';
import Post from '@/models/postModel';
import Reply from '@/models/replyModel';
import User from '@/models/userModel';
import { NextResponse } from 'next/server';

export const POST = async (request, { params }) => {
  try {
    await connectMongoDB();
    const document = await Post.findById(params.id);
    if(!document) {
      return NextResponse.json({
        success: false,
        message: 'Post not found.'
      }, { status: 404 });
    };
    
    const { authorId, textContent } = await request.json();
    const currentUser = await User.findById(authorId);
    if(!currentUser) {
      return NextResponse.json({
        success: false,
        message: 'User not found.'
      }, { status: 404 });
    };

    const newReply = await Reply.create({
      author: authorId,
      textContent
    });
    
    document.replies.unshift(newReply._id);
    document.save();
    
    return NextResponse.json({
      success: true,
      message: 'Post replied.',
      data: newReply
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  };
};