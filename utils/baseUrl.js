//const baseUrl ="http://localhost:3000";


const dev = process.env.NODE_ENV !== "production";
// next-social-app-tau.vercel.app
// https://next-servercustom.herokuapp.com

export const baseUrl = dev
  ? "http://localhost:3000"
  : "next-social-app-tau.vercel.app";


export default baseUrl;
