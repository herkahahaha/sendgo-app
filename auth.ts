import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
// import { sql } from '@vercel/postgres';
import { z } from 'zod';
// import bcrypt from 'bcrypt';

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    // const user = await sql<User>`SELECT * from USERS where email=${email}`;
    // return user.rows[0];
    return
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
        //   const passwordsMatch = await bcrypt.compare(password, user.password);
 
        //   if (passwordsMatch) return user;
          return user
        }
 
        console.log('Invalid credentials');
        return null;
        }
    }),
  ],
});