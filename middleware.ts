import { authMiddleware } from "better-auth/next-js";

export default authMiddleware({
  redirectTo: "/", // redirect to this path if the user is not authenticated
});

export const config = {
  matcher: ["/:path*/dashboard/:path*"],
};
