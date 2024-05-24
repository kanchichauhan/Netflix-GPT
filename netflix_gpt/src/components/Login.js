import Header from "./Header";
import { useState, useRef } from 'react';
import { formValidation } from "../utils/formValidation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [isSignIn, setSignInState] = useState(true);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const email = useRef(null);
    const password = useRef(null);
    const fullname = useRef(null);

    const handleSignInState = () => {
        setSignInState(!isSignIn);
    }

    const handleFormSubmission = (e) => {
        e.preventDefault();
        const getFormResponse = formValidation(email, password, fullname);
        if (getFormResponse) {
            setError(getFormResponse);
            setTimeout(() => {
                setError(false);
            }, 3000);
        } else {
            //   singn in or sign up 
            if (!isSignIn) {
                createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                    navigate('/browse')
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(errorCode +'-'+errorMessage)
                });
            } else {
                signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                    navigate('/browse')
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setError(errorCode +'-'+errorMessage)
                });
            }
        }
    }

    return (
    <div>
        <div><Header />
        <div className="netflix-background">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/5e16108c-fd30-46de-9bb8-0b4e1bbbc509/29d8d7d7-83cc-4b5f-aa9b-6fd4f68bfaa6/IN-en-20240205-popsignuptwoweeks-perspective_alpha_website_small.jpg" />
                <div className="netflix-overlay"></div>
            </div></div>
        <form className="signin-form">
            <h1>{!isSignIn ? 'Sign up' : 'Sign in'}</h1>
            {(!isSignIn) && <input ref={fullname} type="text" placeholder="Fullname" className="fullname"/>}
            <input ref={email} type="text" placeholder="Email Address" className="email"/>
            <input ref={password} type="password" placeholder="Password" className="password"/>
            {(error) && <p className="form-error">{error}</p>}
            <button className="sign-in-button" onClick={handleFormSubmission}>
                {!isSignIn ? 'Sign up' : 'Sign in'}</button>
            <p onClick={handleSignInState}>
                {!isSignIn ? 'Already Registered? Sign In now' : 'New to Netflix? Sign up now!'}</p>
        </form>
    </div>
    )
};
export default Login;