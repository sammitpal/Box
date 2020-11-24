import React from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import {auth} from './firebase';
import firebase from 'firebase';
import { Button } from '@material-ui/core';
function Login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    const history = useHistory();
    const login = () =>{
        auth.signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            history.push("/");
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
    return (
        <div className="login">
            <img src="https://miro.medium.com/max/1200/1*dYj6dVggYVHh7905JA3ABQ.png" alt="" className="login_logo"/>
            <div className="login_content">
                <h1>FREE UNLIMITED CLOUD STORAGE</h1>
            <p>Get Access to your content from any devices</p>
            </div>
            <Button color="primary" variant="contained" onClick={login}>Get Started</Button>
            <p className="footer">&copy; Sammit Pal</p>
        </div>
    )
}

export default Login
