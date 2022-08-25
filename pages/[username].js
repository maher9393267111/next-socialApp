import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { parseCookies } from "nookies";
import { Grid } from "semantic-ui-react";
import { NoProfilePosts, NoProfile } from "../components/Layout/NoData";


import React from 'react';

const ProfilePage = ({
    errorLoading,
    profile,
    followersLength,
    followingLength,
    user,
    userFollowStats 
}) => {

console.log('profile' , profile)

    return (
        <div>
            
        </div>
    );
}

export default ProfilePage;








export const getServerSideProps = async ctx => {
    try {
      const { username } = ctx.query;
      const { token } = parseCookies(ctx);
  
      const res = await axios.get(`${baseUrl}/api/profile/${username}`, {
        headers: { Authorization: `Berer ${token}` }
      });
  
      const { profile, followersLength, followingLength } = res.data;
  
      return { props: { profile, followersLength, followingLength } };
    } catch (error) {
      return { props: { errorLoading: true } };
    }
  };