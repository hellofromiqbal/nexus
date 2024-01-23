import connectMongoDB from "@/libs/mongodb";
import Post from "@/models/postModel";
import User from "@/models/userModel";
import { NextResponse } from 'next/server';


export const POST = async (request, response) => {
  try {
    await connectMongoDB();
    const { authorId, textContent } = await request.json();

    const document = await User.findById(authorId);
    if(!document) {
      return NextResponse.json({
        success: false,
        message: 'User not found.'
      }, { status: 404 });
    };

    const newPost = await Post.create({
      author: authorId,
      textContent
    });

    return NextResponse.json({
      success: true,
      message: 'Posted.',
      data: newPost
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  };
};