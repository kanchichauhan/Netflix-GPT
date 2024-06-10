import React, { useRef } from 'react';
import { lang } from '../utils/languageConstant';
import { useDispatch, useSelector } from 'react-redux';
import openai from '../utils/openai';
import { options } from './constants';
import { addGptMovieResult } from '../utils/gptSlice';


const GptSearchBar = () => {
  const dispatch = useDispatch();
  const inputText = useRef(null);
  const langKey = useSelector((store) => store.config.lang)

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
      movie +
      "&include_adult=false&language=en-US&page=1",
      options
    );
    const json = await data.json();

    return json.results;
  };

  const handleSearchClick = async () => {
    const searchText = inputText.current.value;
    // make an API call to openAI and get movie results

    const gptQuery = 'Act as movie recommmendation system and suggest some movie for the query: ' + searchText + "only give me names of 5 movies, comma separated like the example result given ahead. Example result: gadar, sholay, Don, Housefull, kal ho na ho";

    const gptResults = await openai.chat.completions.create({
      messages: [{role: 'user', content: gptQuery}],
      model: 'gpt-3.5-turbo',
    });

    if (!gptResults.choices) {
      // error
    } else {

      const gptMovies = gptResults.choices?.[0]?.message?.content.split(',');
      const data = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(data);
      console.log(gptMovies, tmdbResults);

      dispatch(addGptMovieResult({movieNames: gptMovies, movieResults: tmdbResults}))
    }
  };
  return (
    <div className='seachFormWrapper'>
      <form className='search-form' onSubmit={(e) => e.preventDefault()}>
        <input ref={inputText} type="text" className='search-input' placeholder={lang[langKey].gptSearchPlaceholder}/>
        <button className='searchSubmitButton' onClick={handleSearchClick}>{lang[langKey].search}</button>
      </form>
    </div>
  )
}
export default GptSearchBar;
