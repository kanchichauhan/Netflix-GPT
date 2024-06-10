import React from 'react';
import GptMovieSuggestions from './gptMovieSuggestions';
import GptSearchBar from './gptSearchBar';
import { netflixBack } from './constants';


const GptSearch = () => {
    return (
        <div>
            <div className="netflix-background">
                <img src={netflixBack} />
                <div className="netflix-overlay"></div>
            </div>
            <GptSearchBar />
            <GptMovieSuggestions />
        </div>
    )
}

export default GptSearch