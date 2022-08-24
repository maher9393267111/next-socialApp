import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import CreatePost from "../components/Post/CreatePost";
import CardPost from "../components/Post/CardPost";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import { NoPosts } from "../components/Layout/NoData";
import { PostDeleteToastr } from "../components/Layout/Toastr";
import InfiniteScroll from "react-infinite-scroll-component";
import { PlaceHolderPosts, EndMessage } from "../components/Layout/PlaceHolderGroup";
import cookie from "js-cookie";
import {server} from '../utils/serverUrl'

function Index({ user, postsData, errorLoading , token }) {
  const [posts, setPosts] = useState(postsData||[]);
  const [showToastr, setShowToastr] = useState(false);
  const [hasMore, setHasMore] = useState(true);

console.log('ALLPOsts---->' , postsData)


  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    document.title = `Welcome, ${user.name.split(" ")[0]}`;
  }, []);

  useEffect(() => {
    showToastr && setTimeout(() => setShowToastr(false), 3000);
  }, [showToastr]);

//   useEffect(() => {
    
//     fetchposts()

//   }, [posts]);


// const  fetchposts = async() =>{

//   const res = await axios.get(`${baseUrl}/api/posts`, {
//     //   headers: { Authorization: token },
//     headers: {
//      Authorization: `Bearer ${token}`,
//    },
//    params: { pageNumber: 1 }
//   })

//   setPosts((prev) => [...prev, res?.data])

// }




  const fetchDataOnScroll = async () => {
    try {

      const token = cookie.get('token')
      const res = await axios.get(`${baseUrl}/api/posts`, {
     //   headers: { Authorization: cookie.get("token") },
    //  headers: {
    //   Authorization: `Bearer ${cookie.get("token")}`,
    // },
        params: { pageNumber }
      });

      if (res.data.length === 0) setHasMore(false);

      setPosts(prev => [...prev, ...res.data]);
      setPageNumber(prev => prev + 1);
    } catch (error) {
      alert("Error fetching Posts");
    }
  };

  //if (posts.length === 0 || errorLoading) return <NoPosts />;

  return (
    <>
      {showToastr && <PostDeleteToastr />}
      <Segment>
        <CreatePost user={user} setPosts={setPosts} />

        <InfiniteScroll
          hasMore={hasMore}
          next={fetchDataOnScroll}
          loader={<PlaceHolderPosts />}
          endMessage={<EndMessage />}
          dataLength={posts.length}>
          {posts.map(post => (
            <CardPost
              key={post._id}
              post={post}
              user={user}
              setPosts={setPosts}
              setShowToastr={setShowToastr}
            />
          ))}
        </InfiniteScroll>
      </Segment>
    </>
  );
}

Index.getInitialProps = async ctx => {
  try {
    const { token } = parseCookies(ctx);
    console.log('Token in Home Page 🧪🧪🧪' , token)

    const res = await axios.get(`${baseUrl}/api/posts`, {
   //   headers: { Authorization: token },
  //  headers: {
  //   Authorization: `Bearer ${token}`,
  // },


      params: { pageNumber: 1 }
    });

    return { postsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Index;
