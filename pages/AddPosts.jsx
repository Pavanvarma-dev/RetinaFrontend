import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import API from './Api';

function AddPosts() {

  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('');
  const [postImage, setPostImage] = useState(null);
  const {userID,token} = useAuth();
  const navigate = useNavigate();

  // very importtant

  const toPost = async (e) => {
    e.preventDefault();
    if (!caption || !category) return;

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('category', category);
    if (postImage) formData.append('postImage', postImage); // name must match server
    if(userID)formData.append('userID', userID);

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(`${API}/auth/posts`, formData,{ headers });
      console.log('User added POst  Successfully', response.data);
      navigate('/');
    } catch (err) {
      console.log('Error in Creating post', err);
    }
  }


  return (
    <div className='container'>
      <div className='login-card'>
        Add Page
        <form onSubmit={toPost}>
          
          <input type="text" placeholder="Caption" value={caption} onChange={(e) => setCaption(e.target.value)} />
        
          <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          Picture:
          <input type="file" name="postImage" id="postImage" accept="image/*" onChange={(e) => setPostImage(e.target.files[0])} />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  )
}

export default AddPosts