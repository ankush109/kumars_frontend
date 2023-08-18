
/*import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";


const loginn = () => {
  return (
    <div
    style={{
        display: 'flex',
        flex:1,
        justifyContent: 'center',
         alignItems: 'center',
       height: '100vh',
       
        backgroundColor: 'blue',
     } }
    >
      

        
<GoogleOAuthProvider clientId="381683308790-2df2pegumahvgjuiudcav6l3mevderdv.apps.googleusercontent.com"><GoogleLogin
  onSuccess={credentialResponse => {
    var decoded = jwt_decode(credentialResponse.credential);
    console.log(decoded);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>

</GoogleOAuthProvider>
    </div>
  )
}

export default loginn
*/
import React, { useState } from 'react'
import Login1 from './Login1'
import Logout from './Logout'

const GLogin = () => {
  const [stateAuth, setStateAuth] = useState()
  const response = (res) => {
    setStateAuth(res)
  }
  return (
    <div className='d-flex justify-content-center align-items-center flex-column'
      style={{ height: "100vh" }}
    >
      {!stateAuth ?
        <Login1 response={response} />
        :
        <div className='d-flex justify-content-center align-items-center flex-column'>
          <img src={stateAuth.data.picture} />
          <h5>{stateAuth.data.name}</h5>
          <p>{stateAuth.data.email}</p>
        <Logout response={response} />
        </div>
      }
    </div>
  )
}

export default GLogin
