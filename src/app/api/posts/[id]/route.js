import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();
    const document = await Post.findById(params.id).populate('author').populate({
      path: 'likes',
      populate: ({
        path: 'author',
        method: 'User'
      })
    }).populate({
      path: 'replies',
      populate: ({
        path: 'author',
        method: 'User'
      })
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

    const { currentUserId } = await request.json();
    const currentUser = await User.findById(currentUserId);
    if(!currentUser) {
      return NextResponse.json({
        success: false,
        message: 'User not found.'
      }, { status: 404 });
    };

    currentUser.posts.pull(params.id);
    currentUser.save();

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