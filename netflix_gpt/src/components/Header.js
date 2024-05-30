import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { onAuthStateChanged } from "firebase/auth";
import {useDispatch} from 'react-redux';
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, userAvatar } from "./constants";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((store) => store.user);
    const handleSignout = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
            navigate("/error");
        });
    };

    // since header is always present on the website
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName} = user;
                dispatch(addUser({uid: uid, email: email, displayName: displayName}))
                navigate('/browse');
            } else {
                dispatch(removeUser())
                navigate('/');
            }
        });

        // unsubscribe when component unmounts - so that it won't add multiple listeners
        return () => unsubscribe();
    }, [])

    return (
        <><div>
            <div className="netflix-logo"><img src={LOGO} alt=""/></div>
        </div>
        {user && (<div className='signedin-header'><span>{user.displayName}</span>
                <img src={userAvatar} alt=""/>
                <button onClick={handleSignout} className="signout-btn">Sign out</button>
            </div>)}</>
    )
};
export default Header;
