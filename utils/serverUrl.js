const dev = process.env.NODE_ENV !== "production";
// next-social-app-tau.vercel.app
export const server = dev
  ? "http://localhost:3000"
  : "next-social-app-tau.vercel.app";


export default server;
