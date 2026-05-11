// middleware.js

export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/main_page/:path*",
  ],
}