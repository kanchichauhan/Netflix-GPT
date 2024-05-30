import Header from "./Header";
import { useState, useRef } from 'react';
import { formValidation } from "../utils/formValidation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import {useDispatch} from 'react-redux'
import { addUser, user } from "../utils/userSlice";
import { netflixBack } from "./constants";

const Login = () => {
    const [isSignIn, setSignInState] = useState(true);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

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
                    updateProfile(user, {
                        displayName: fullname.current.value
                    }).then(() => {
                        const {uid, email, displayName} = auth.currentUser;
                        dispatch(addUser({uid: uid, email: email, displayName: displayName}))
                    }).catch(() => {
                        setError(error.message)
                    });
                    console.log(user);
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
                <img src={netflixBack} />
                <div className="netflix-overlay"></div>
            </div></div>
        <form className="signin-form">
            <h1>{!isSignIn ? 'Sign up' : 'Sign in'}</h1>
            {(!isSignIn) && <input ref={fullname} type="text" placeholder="Fullname" className="fullname"/>}
            <input ref={email} type="text" placeholder="Email Address" className="email"/>
            <input ref={password} type="password" placeholder="Password" className="password"/>
            {(error) && <p className="form-error"><svg xmlns="http://www.w3.org/2000/svg" fill="none" width="16" height="16" viewBox="0 0 16 16" role="img" data-icon="CircleXSmall" aria-hidden="true" class="default-ltr-cache-0 e1vkmu651"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z" fill="currentColor"></path></svg>{error}</p>}
            <button className="sign-in-button" onClick={handleFormSubmission}>
                {!isSignIn ? 'Sign up' : 'Sign in'}</button>
            <p onClick={handleSignInState}>
                {!isSignIn ? 'Already Registered? Sign In now' : 'New to Netflix? Sign up now!'}</p>
        </form>
    </div>
    )
};
export default Login;