import User from '@/models/userModel';
import Post from '@/models/postModel';
import Reply from '@/models/replyModel';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const GET = async (request, response) => {
  try {
    const currentUserToken = await request.cookies.get('nexus');
    const currentUserInfo = jwt.verify(currentUserToken.value, process.env.JWT_SECRET_TOKEN)._doc;
    const currentUser = await User.findById(currentUserInfo._id)
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
    // .populate({
    //   path: 'posts',
    //   populate: ({
    //     path: 'author',
    //     model: 'User'
    //   })
    // }).populate({
    //   path: 'likedPosts',
    //   populate: ({
    //     path: 'post',
    //     model: 'Post'
    //   })
    // }).populate({
    //   path: 'followers',
    //   populate: ({
    //     path: 'user',
    //     model: 'User'
    //   })
    // }).populate({
    //   path: 'following',
    //   populate: ({
    //     path: 'user',
    //     model: 'User'
    //   })
    // });

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