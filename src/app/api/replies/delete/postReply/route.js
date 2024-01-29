import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/postModel";
import Reply from "@/models/replyModel";
import { NextResponse } from 'next/server';

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

export const PUT = async (request, response) => {
  try {
    await connectMongoDB();
    const { contentRefId, contentId } = await request.json();

    const isContentRefExist = await Post.findById(contentRefId);
    if (!isContentRefExist) {
      return NextResponse.json({
        success: false,
        message: 'Content Ref not found.'
      }, { status: 404 });
    }

    const isContentExist = await Reply.findById(contentId);
    if (!isContentExist) {
      return NextResponse.json({
        success: false,
        message: 'Content not found.'
      }, { status: 404 });
    }

    // Remove the reference to the reply from the post
    isContentRefExist.replies.pull(contentId);
    await isContentRefExist.save(); // Await the save operation

    // Start the recursive deletion
    await deleteReplyAndChildren(contentId);

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