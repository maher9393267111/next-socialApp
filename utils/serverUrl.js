const dev = process.env.NODE_ENV !== "production";
// next-social-app-tau.vercel.app
export const server = dev
  ? "http://localhost:3000"
  : "https://next-servercustom.herokuapp.com";


export default server;
