import Header from "./Header";
import { useState, useRef } from 'react';
import { formValidation } from "../utils/formValidation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";


const Login = () => {
    const [isSignIn, setSignInState] = useState(true);
    const [error, setError] = useState(false);

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
        <div><Header /></div>
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