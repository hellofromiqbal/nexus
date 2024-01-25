import connectMongoDB from "@/libs/mongodb";
import User from "@/models/userModel";
import { NextResponse } from 'next/server';

export const GET = async (request, { params }) => {
  try {
    await connectMongoDB();
    const document = await User.findOne({ username: params.username })
    .populate({
      path: 'posts',
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
        },
        {
          path: 'replies',
          model: 'Reply'
        }
      ]
    })
    .populate({
      path: 'likedPosts',
      populate: {
        path: 'post',
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
      }
    })
    .populate({
      path: 'followers',
      populate: {
        path: 'user',
        model: 'User'
      }
    })
    .populate({
      path: 'following',
      populate: {
        path: 'user',
        model: 'User'
      }
    });
    
    if(!document) {
      return NextResponse.json({
        success: false,
        message: 'User not found.'
      }, { status: 404 });
    };
    
    return NextResponse.json({
      success: true,
      data: document
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to get user info.'
    }, { status: 500 });
  };
};