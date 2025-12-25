import React from 'react'
import axios from 'axios'
import './profile.css'
import { useAuth } from './AuthContext.jsx'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Posts from './Posts.jsx';
import API from './Api.jsx';

function Profile() {
  const [profile, setProfile] = useState([]);
  const {userID,logout,token} = useAuth();
  const navigate = useNavigate();

  console.log("from profile", userID);

   const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API}/auth/profile/${userID}`);
        console.log(response.data);  
       setProfile(response.data);       
        
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    fetchProfile();
  }, [userID]);

  // console.log("profile-picture",profile.profilePicture);
  
  const toedit = () =>{
    navigate('/editprofile');
  }
  return (
    <div>
      {  <h1>Profile Page</h1>}
        <div className='containers'>
          {
              <div key={profile.userID}  className='profile-card'>

               <div className='pr'>

                   {profile.profilePicture && (
                  <img 
                    src={`data:image/jpeg;base64,${profile.profilePicture}`}
                    alt="Profile Picture"
                    style={{ width: '200px', height: '200px', borderRadius: '50%' }}
                  />
                  
                )}

               </div>
               <div className='na'>
                   <h2>{profile.username}</h2>
                   <h4>{profile.bio}</h4>
                   <button onClick={toedit}>Edit Profile</button>
               </div>
                  <div className='follo'>
                    <div>Followers
                     <div className='d'>{profile.following}</div>
                    </div>
                  <div>Following
                     <div className='d'>{profile.followers}</div>
                  </div>
                  </div>
                
                {/* <h3>Email: {profile.email}</h3> */}
                
              </div>
          }
        </div>
        <h1>Posts</h1>
         <Posts />
    </div>
  )
}

export default Profile