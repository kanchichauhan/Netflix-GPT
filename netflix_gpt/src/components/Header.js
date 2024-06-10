import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { onAuthStateChanged } from "firebase/auth";
import {useDispatch} from 'react-redux';
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, supported_languages, userAvatar } from "./constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

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

    const handleGptSearchClick = () => {
        dispatch(toggleGptSearchView());
    };
    const handleLanguageChange = (e) => {
        console.log(e.target.value)
        dispatch(changeLanguage(e.target.value))
    };

    return (
        <><div>
            <div className="netflix-logo"><img src={LOGO} alt=""/></div>
        </div>
        {user && (<div>
            {showGptSearch && <select className="select-lang-wrapper" onChange={handleLanguageChange}>
                {supported_languages.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
            </select>}
            {!showGptSearch && <button className="searchBtn" onClick={handleGptSearchClick}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#FFFFFF" height="800px" width="800px" version="1.1" id="Capa_1" viewBox="0 0 490.4 490.4" xmlSpace="preserve">
                <g><path d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796   s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z    M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"/></g>
                </svg><span>Search Movies</span></button> }
            <div className='signedin-header'><span>{user.displayName}</span>
                <img src={userAvatar} alt=""/>
                <button onClick={handleSignout} className="signout-btn">Sign out</button>
            </div>
            </div>)}</>
    )
};
export default Header;
