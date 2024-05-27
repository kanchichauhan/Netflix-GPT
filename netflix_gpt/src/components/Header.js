import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { onAuthStateChanged } from "firebase/auth";
import {useDispatch} from 'react-redux';
import { addUser, removeUser } from "../utils/userSlice";

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

        // unsubscribe when component unmounts
        return () => unsubscribe();
    }, [])

    return (
        <><div>
            <div className="netflix-logo"><img src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt=""/></div>
        </div>
        {user && (<div className='signedin-header'><span>{user.displayName}</span>
                <img src="https://occ-0-3752-3646.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABb7kuX9mKPrFGfvZ0oJ9eMBbFCB7ZhumT7uHIoILp1FtGpeIhybv8zoGgNK76rr7N8bMdhn-kkbRnD6ut8mFLwqYXmdpwCw.png?r=eea" alt=""/>
                <button onClick={handleSignout} className="signout-btn">Sign out</button>
            </div>)}</>
    )
};
export default Header;
