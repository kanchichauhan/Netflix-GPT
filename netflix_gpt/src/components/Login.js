import Header from "./Header";
import { useState } from 'react';

const Login = () => {

    const [isSignIn, setSignInState] = useState(true);

    const handleSignInState = () => {
        setSignInState(!isSignIn);
    }
    return (
    <div>
        <div><Header /></div>
        <form className="signin-form">
            <h1>{!isSignIn ? 'Sign up' : 'Sign in'}</h1>
            {(!isSignIn) && <input type="text" placeholder="Fullname" class="fullname"/>}
            <input type="text" placeholder="Email Address" class="email"/>
            <input type="password" placeholder="Password" class="password"/>
            <button class="sign-in-button">
                {!isSignIn ? 'Sign up' : 'Sign in'}</button>
            <p onClick={handleSignInState}>
                {!isSignIn ? 'Already Registered? Sign In now' : 'New to Netflix? Sign up now!'}</p>
        </form>
    </div>
    )
};
export default Login;