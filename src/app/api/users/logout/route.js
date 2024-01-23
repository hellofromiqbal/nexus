import { NextResponse } from 'next/server';

export const GET = async (request, response) => {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out.'
    }, { status: 200 });

    response.cookies.delete('nexus');
    return response;
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Failed to logout.'
    });
  };
};