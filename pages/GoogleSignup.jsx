import React from 'react'
import {GoogleLogin} from '@react-oauth/google'
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import APi from './Api';

function GoogleSignup() {

    const handleSuccess = async(credentialResponse) => {
        console.log('Login Success:', credentialResponse);

        await axios.post(`${APi}/auth/googlelogin`, {
            tokenId: credentialResponse.credential,
        })
    }
    const handleError = () => {
        console.log('Login Failed');
    };
  return (
    <GoogleLogin
      onSuccess= {handleSuccess}
      onError={() =>console.log(handleError)
      }/>
  )
}

export default GoogleSignup