import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectMongoDB from '@/libs/mongodb';
import User from '@/models/userModel';

export const POST = async (request, response) => {
  try {
    await connectMongoDB();
    const { email, password } = await request.json();

    const document = await User.findOne({ email });
    if(!document) {
      return NextResponse.json({
        success: false,
        message: 'User does not exist.'
      }, { status: 404 });
    };

    const isPasswordCorrect = await bcrypt.compare(password, document.password);
    if(!isPasswordCorrect) {
      return NextResponse.json({
        success: false,
        message: 'Invalid password.'
      }, { status: 400 });
    };

    const response = NextResponse.json({
      success: true,
      message: 'Account created successfully!'
    }, { status: 200 });

    const tokenPayload = {...document};
    const userToken = jwt.sign(tokenPayload, process.env.JWT_SECRET_TOKEN, { expiresIn: '1d' });
    response.cookies.set('nexus', userToken);

    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });    
  }
};