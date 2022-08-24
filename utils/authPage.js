
import jwt from 'jsonwebtoken';
import  cookies from 'next-cookies'
import { useRouter } from 'next/router'

export function authPage(ctx) {
    return new Promise(resolve => {
        const allCookies = cookies(ctx);
     //   console.log('ALLCOOKIES',allCookies);

        if(allCookies.token) {

          return resolve({
       
            token: allCookies.token
        });

        }
        else if (!allCookies.token) {

          // remove token from cookies
         // res.clearCookie('auth');

          return  ctx.res.writeHead(302, {
             Location: '/login'
         }).end();
    

        }

      
        

       
    });
}