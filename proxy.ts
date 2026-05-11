import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_PREFIX = "/s-7k2x9z";
const PROTECTED_API_PREFIX = "/api/s-7k2x9z";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needsAuth =
    pathname === PROTECTED_PREFIX ||
    pathname.startsWith(`${PROTECTED_PREFIX}/`) ||
    pathname.startsWith(PROTECTED_API_PREFIX);

  if (!needsAuth) return NextResponse.next();

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    return new NextResponse("ADMIN_PASSWORD env var is not set", { status: 500 });
  }

  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      const idx = decoded.indexOf(":");
      const pass = idx >= 0 ? decoded.slice(idx + 1) : "";
      if (timingSafeEqual(pass, expected)) {
        return NextResponse.next();
      }
    } catch {
      // fall through to 401
    }
  }

  return new NextResponse("Auth required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="LQS"' },
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const config = {
  matcher: ["/s-7k2x9z/:path*", "/s-7k2x9z", "/api/s-7k2x9z/:path*"],
};
