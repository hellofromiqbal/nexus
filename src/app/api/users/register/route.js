import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectMongoDB from '@/libs/mongodb';
import User from '@/models/userModel';

export const POST = async (request, response) => {
  try {
    await connectMongoDB();
    const { fullname, email, password } = await request.json();

    const document = await User.findOne({ email });
    if(document) {
      return NextResponse.json({
        success: false,
        message: 'Email already linked to existing account.'
      }, { status: 400 });
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const usernameSalt = salt.slice(-10).replace(/[&\/\\#,+()$~%.'":*?<>{}]/g);
    const username = `@user${usernameSalt}`;
    
    await User.create({
      username,
      fullname,
      email,
      password: hashedPassword
    });

    return NextResponse.json({
      success: true,
      message: 'Account created successfully!'
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });    
  }
};