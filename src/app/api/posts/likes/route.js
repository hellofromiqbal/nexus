import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import { NextResponse } from 'next/server';

// LIKE A POST
export const POST = async (request, response) => {
  try {
    await connectMongoDB();
    const { currentUserId, postId } = await request.json();

    const document = await Post.findById(postId);
    if(!document) {
      return NextResponse.json({
        sucess: false,
        message: 'Post not found.'
      }, { status: 404 });
    };

    const currentUser = await User.findById(currentUserId);
    if(!currentUser) {
      return NextResponse.json({
        sucess: false,
        message: 'User not found.'
      }, { status: 404 });
    };

    document.likes.push(currentUserId);
    document.save();

    currentUser.likes.push(postId);
    currentUser.save();

    return NextResponse.json({
      success: true,
      message: 'Post liked.',
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
};

// UNLIKE A POST
export const PUT = async (request, response) => {
  try {
    await connectMongoDB();
    const { currentUserId, postId } = await request.json();

    const document = await Post.findById(postId);
    if(!document) {
      return NextResponse.json({
        sucess: false,
        message: 'Post not found.'
      }, { status: 404 });
    };

    const currentUser = await User.findById(currentUserId);
    if(!currentUser) {
      return NextResponse.json({
        sucess: false,
        message: 'User not found.'
      }, { status: 404 });
    };

    document.likes.pull(currentUserId);
    document.save();

    currentUser.likes.pull(postId);
    currentUser.save();

    return NextResponse.json({
      success: true,
      message: 'Post unliked.',
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
};