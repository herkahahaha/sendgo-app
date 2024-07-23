import { cookies } from "next/headers";
import { NextRequest,NextResponse } from "next/server";
import { decrypt } from "./app/auth/session";

// 1. specifict public and private route

const publicRoute = ["/login"];
const privateRoute = ["/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoute.includes(path);
  const isPrivateRoute = privateRoute.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  // 4. Redirect
  if (isPrivateRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }

  // if (
  //   isPublicRoute &&
  //   session?.userId &&
  //   !req.nextUrl.pathname.startsWith('/')
  // ) {
  //   return NextResponse.redirect(new URL('/', req.nextUrl));
  // }

  return NextResponse.next();
}
