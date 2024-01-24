import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/postModel";
import { NextResponse } from 'next/server';

export const GET = async (request, response) => {
  try {
    await connectMongoDB();
    const documents = await Post.find().populate('author').populate({
      path: 'likes',
      populate: ({
        path: 'author',
        model: 'User'
      })
    });

    return NextResponse.json({
      success: true,
      data: documents
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  };
};