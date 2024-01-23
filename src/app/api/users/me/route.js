import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const GET = async (request, response) => {
  try {
    const currentUserToken = await request.cookies.get('nexus');
    const currentUserInfo = jwt.verify(currentUserToken.value, process.env.JWT_SECRET_TOKEN)._doc;
    return NextResponse.json({
      success: true,
      data: currentUserInfo
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  };
};