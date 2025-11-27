import { NextResponse, type NextRequest } from 'next/server';
import { userService } from '@/services/UserService';
import { signJwt } from '@/utils/jwt';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const hourInSec = 3600;
  try {
    const body = await request.json();
    const { email, password } = body ?? {};

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Input email & password' },
        { status: 400 },
      );
    }

    const user = await userService.verifyCredentials(email, password);

    if (!user || !user.isActive) {
      return NextResponse.json(
        { message: 'Invalid login or password' },
        { status: 401 },
      );
    }

    const token = signJwt({
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
    });

    const response = NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
      },
    });

    response.cookies.set({
      name: 'accessToken',
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: hourInSec,
    });

    return response;
  }
  catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Authorization error' },
      { status: 500 },
    );
  }
}