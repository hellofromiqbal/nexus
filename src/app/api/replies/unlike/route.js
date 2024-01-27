import connectMongoDB from "@/libs/mongodb";
import Reply from "@/models/replyModel";
import User from "@/models/userModel";
import { NextResponse } from 'next/server';

export const PUT = async (request, response) => {
  try {
    await connectMongoDB();
    const { replyId,  currentUserId } = await request.json();
    const isReplyExist = await Reply.findById(replyId);
    if(!isReplyExist) {
      return NextResponse.json({
        success: false,
        message: 'Reply not found.'
      }, { status: 404 });
    };
    
    const isUserExist = await User.findById(currentUserId);
    if(!isUserExist) {
      return NextResponse.json({
        success: false,
        message: 'User not found.'
      }, { status: 404 });
    };
    
    isReplyExist.likes.pull({ author: currentUserId });
    isReplyExist.save();
    
    return NextResponse.json({
      success: true,
      message: 'Reply unliked.'
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
};