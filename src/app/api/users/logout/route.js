import { NextResponse } from 'next/server';

export const GET = async (request, response) => {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out.'
    }, { status: 200 });

    response.cookies.set('nexus', '', { httpOnly: true });
    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  };
};