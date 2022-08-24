import App from "next/app";
import Layout from "../components/Layout/Layout";
import "semantic-ui-css/semantic.min.css";
import { parseCookies, destroyCookie } from "nookies";
import baseUrl from "../utils/baseUrl";
import { redirectUser } from "../utils/Auth";
import Head from "next/head";
import {toast} from 'react-toastify'
import axios from 'axios'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="UTF-8" />
        <title>Mini Social Media</title>
      </Head>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}



MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = parseCookies(ctx);
//const {token} = ctx.req.cookies
  let pageProps = {};

  const protectedRoutes =
    ctx.pathname === "/" ||
    ctx.pathname === "/[username]" ||
    ctx.pathname === "/notifications" ||
    ctx.pathname === "/post/[postId]" ||
    ctx.pathname === "/messages" ||
    ctx.pathname === "/search";

//console.log('cookies token 🧑‍💻🧑‍💻' , token )

  if (!token ) {
    protectedRoutes && redirectUser(ctx, "/login");
    toast.error('no Token here' , token)
  }
  //
  else {
    try {
      const getFollowingData =
        ctx.pathname === "/notifications" || ctx.pathname === "/[username]";

      // get auth current suer daata 
      const res = await axios.get(`${baseUrl}/api/auth`, {
        headers: { Authorization: token },
       params: { getFollowingData }
      });
   //   console.log('res user data 🌟🌟🌟🌟' , res)

      const { user, userFollowStats } = res.data;
//console.log('userData--->' , user)
      if (user) !protectedRoutes && redirectUser(ctx, "/");

      pageProps.user = user;
      pageProps.userFollowStats = userFollowStats;
    } catch (error) {
      console.log('error---< ❌❌❌', error)
      destroyCookie(ctx, "token");
      redirectUser(ctx, "/login");
    }
  }
  return { pageProps };
};





export default MyApp;
