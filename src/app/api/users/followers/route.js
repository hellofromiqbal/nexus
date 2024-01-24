import connectMongoDB from "@/libs/mongodb";
import User from "@/models/userModel";
import { NextResponse } from 'next/server';

// FOLLOW A USER
export const POST = async (request, response) => {
  try {
    await connectMongoDB();
    const { currentUserId, visitedUserId } = await request.json();
    console.log(currentUserId, visitedUserId);

    const document = await User.findById(visitedUserId);
    if(!document) {
      return NextResponse.json({
        sucess: false,
        message: 'User not found.'
      }, { status: 404 });
    };

    const currentUser = await User.findById(currentUserId);
    if(!currentUser) {
      return NextResponse.json({
        sucess: false,
        message: 'User not found.'
      }, { status: 404 });
    };

    document.followers.push({ user: currentUserId });
    document.save();

    currentUser.following.push({ user: visitedUserId });
    currentUser.save();

    return NextResponse.json({
      success: true,
      message: 'Followed.',
      data: currentUser
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
};

// UNFOLLOW A USER
export const PUT = async (request, response) => {
  try {
    await connectMongoDB();
    const { currentUserId, visitedUserId } = await request.json();
    console.log(currentUserId, visitedUserId);

    const document = await User.findById(visitedUserId);
    if(!document) {
      return NextResponse.json({
        sucess: false,
        message: 'User not found.'
      }, { status: 404 });
    };

    const currentUser = await User.findById(currentUserId);
    if(!currentUser) {
      return NextResponse.json({
        sucess: false,
        message: 'User not found.'
      }, { status: 404 });
    };

    document.followers.pull({ user: currentUserId });
    document.save();

    currentUser.following.pull({ user: visitedUserId });
    currentUser.save();

    return NextResponse.json({
      success: true,
      message: 'Unfollowed.',
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
};