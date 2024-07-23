"server-only"

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SessionPayload } from '../lib/zod';


const secretKey = process.env.AUTH_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1hr')
    .sign(key);
}

export async function decrypt(session: string | undefined = '') {
    try {
      const { payload } = await jwtVerify(session, key, {
        algorithms: ['HS256'],
      });
      return payload;
    } catch (error) {
      return null;
    }
  }

  export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    const session = await encrypt({ userId, expiresAt });
  
    cookies().set('session', session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: 'lax',
      path: '/',
    });
  
    redirect('/');
  }

  export function deleteSession() {
    cookies().delete('session');
    redirect('/login');
  }