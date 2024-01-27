import connectMongoDB from "@/libs/mongodb";
import User from "@/models/userModel";
import { NextResponse } from 'next/server';

export const PUT = async (request, { params }) => {
  try {
    console.log(params.username);
    await connectMongoDB();
    const document = await User.findOne({ username: params.username });
    if(!document) {
      return NextResponse.json({
        success: false,
        message: 'User not found.'
      }, { status: 404 });
    };

    const { username, fullname, bio, location } = await request.json();

    document.username = '@' + username;
    
    const isUsernameExist = await User.findOne({ username: document.username });
    if(isUsernameExist) {
      return NextResponse.json({
        success: true,
        message: 'Username already taken.'
      }, { status: 400 });
    };

    document.fullname = fullname;
    document.bio = bio;
    document.location = location;
    document.save();

    return NextResponse.json({
      success: true,
      message: 'Changes saved.',
      data: document
    });
  } catch (error) {
    return NextResponse.json({
      success: true,
      message: error.message
    }, { status: 500 });
  }
};