import User from '@/models/userModel';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const GET = async (request, response) => {
  try {
    const currentUserToken = await request.cookies.get('nexus');
    const currentUserInfo = jwt.verify(currentUserToken.value, process.env.JWT_SECRET_TOKEN)._doc;
    const currentUser = await User.findById(currentUserInfo._id).populate({
      path: 'posts',
      populate: ({
        path: 'author',
        method: 'User'
      })
    }).populate({
      path: 'likes',
      populate: ({
        path: 'author',
        method: 'User'
      })
    }).populate({
      path: 'followers',
      populate: ({
        path: 'user',
        method: 'User'
      })
    }).populate({
      path: 'following',
      populate: ({
        path: 'user',
        method: 'User'
      })
    });

    return NextResponse.json({
      success: true,
      data: currentUser
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  };
};