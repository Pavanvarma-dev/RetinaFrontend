// ...existing code...
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Register.css";
import APi from "./Api"
import {useAuth} from "./AuthContext"
import GoogleSignup from './GoogleSignup';

function Register() {
  const navigate = useNavigate();
  const [username, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [errors,setErrors] = useState({});
  const {token}  = useAuth();

  const toRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) return;

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePicture) formData.append('profilePicture', profilePicture); // name must match server

    try {
      const response = await axios.post(`${APi}/auth/register`, formData);
      console.log('User Registered Successfully', response.data);
      navigate('/login');
    } catch (error) {
       
        const resp = error?.response?.data;
        if (resp?.errors && Array.isArray(resp.errors)) {
          const formattedErrors = {};
          resp.errors.forEach((err) => {
            
            const key = err.path ?? err.param ?? err.field ?? 'general';
            formattedErrors[key] = err.msg ?? err.message ?? String(err);
          });
          setErrors(formattedErrors);
          console.error('Validation errors:', formattedErrors); // log the formatted object
        } else if (resp?.message) {
          // single message error
          setErrors({ general: resp.message });
          console.error('Server error:', resp.message);
        } else {
          console.error('Error in registering the user', error);
          setErrors({ general: 'Unexpected error' });
        }
    }
    
  }

  return (
    <div className='container'>
      <div className='login-card'>
        Register Page
        <form onSubmit={toRegister}>
          
          <input type="text" placeholder="Username" value={username} onChange={(e) => setuserName(e.target.value)} />
          {errors.username && <div className="error">{errors.username}</div>}
        
          <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <div className="error">{errors.email}</div>}
          
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <div className="error">{errors.password}</div>}

          {errors.general && <div className="error">{errors.general}</div>}

          Profile Picture:
          <input type="file" name="profilePicture" id="profilePicture" accept="image/*" onChange={(e) => setProfilePicture(e.target.files[0])} />
          <button type="submit">Register</button>
        </form>
        <GoogleSignup />
      </div>
    </div>
  )
}

export default Register;
// ...existing code...