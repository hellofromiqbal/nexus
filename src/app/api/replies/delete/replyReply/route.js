import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/postModel";
import Reply from "@/models/replyModel";
import { NextResponse } from 'next/server';

export const PUT = async (request, response) => {
  try {
    await connectMongoDB();
    const { contentRefId, contentId } = await request.json();

    const isContentRefExist = await Reply.findById(contentRefId);
    if(!isContentRefExist) {
      return NextResponse.json({
        success: false,
        message: 'Content Ref not found.'
      }, { status: 404 });
    };
    
    const isContentExist = await Reply.findById(contentId);
    if(!isContentExist) {
      return NextResponse.json({
        success: false,
        message: 'Content not found.'
      }, { status: 404 });
    };

    isContentRefExist.replies.pull(contentId);
    isContentRefExist.save();

    await Reply.findByIdAndDelete(contentId);

    return NextResponse.json({
      success: true,
      message: 'Reply deleted.'
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
};