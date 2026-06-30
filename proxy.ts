import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"

const ACTIVE_BRAND = "eos"

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  // console.log("headers:", request.headers.get('user-agent'))
  // console.log("Session:", session)
  // console.log("Proxy Request:", request)
  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (!session) {
    return NextResponse.redirect(
      new URL(`/${ACTIVE_BRAND}/signin`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard",
    "/signin",
    "/signup",
    "/forgot-password",
    "/reset-password",
  ],
}
