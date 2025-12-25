import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from './AuthContext.jsx'
import Likes from './Likes.jsx'
import Comments from './Comments.jsx'
import { useNavigate } from 'react-router-dom'
import API from './Api.jsx'
import FollowButton from './FollowButton.jsx'
import './Home.css'

function Home() {
  const [posts, setPosts] = useState([]);
  const {userID,token} = useAuth();
const naviagte = useNavigate();


const togoprofile = () => {
  naviagte('/profile');
}

  const fetchPosts = async () => {  
    try {

      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get(`${API}/auth/randomposts`,{ headers });  
      console.log("random posts",response.data);
      
      setPosts(response.data);  
      // console.log("posts",posts);
    }
      catch (error) { 
      console.error("error from getposts",error);
    }   
  }

    useEffect(() => {
    fetchPosts();
  }, [userID,]);
  

  return (
    <div className='cont'>
        <div className='randomposts-card'>
            <div className='postsdata'>
{posts.postwithImages && posts.postwithImages.map((post,key) => (
  <div key={post.postID} className="post-card">
    <div className='profile'>
      <img
        src ={`data:image/jpeg;base64,${post.user.profilePicture}`}
        alt="Profile"
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        onClick={togoprofile}
      />
      <h3>{post.user.username}</h3>
      <div className='follow'>
        <FollowButton currentUserID={userID} profileUserID={post.userID}/>
      </div>
    </div>

    {post.postImage && (
      <img className="post-image" src={`data:image/jpeg;base64,${post.postImage}`} alt="Post" />
    )}

    <p className="caption">{post.caption}</p>

    <div className='desc'>
      <Likes post={post} />
      {/* <Comments post={post} /> */}
    </div>
  </div>
))}
            </div>
        </div>

    </div>
  )
}

export default Home