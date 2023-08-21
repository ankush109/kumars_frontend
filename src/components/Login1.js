import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { login } from '../actions/useraction';
import { LOGIN_SUCCESS } from '../constants/userconstant';
import Cookies from 'js-cookie';
const Login = (props) => {
    const dispatch = useDispatch();
const clientId = "381683308790-2df2pegumahvgjuiudcav6l3mevderdv.apps.googleusercontent.com";
    
    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: clientId })
        })
    }, [])

    const responseGoogle = (response) => {
        // console.log(response)
        axios.post('https://kumars-backend-2.onrender.com/api/v1/googlelogin',
            { idToken: response.tokenId }
        ).then(response => {
            // console.log(response)
            props.response(response)
            Cookies.set('user', JSON.stringify(response)); // Expires in 7 days

            dispatch({type:LOGIN_SUCCESS,payload:response})
            
        })
            .catch(err => { console.log(err) })
    }
    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </div>
    )
}

export default Login