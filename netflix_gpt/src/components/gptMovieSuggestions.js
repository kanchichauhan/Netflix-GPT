import React from 'react'
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const GptMovieSuggestions = () => {

  const {movieResults, movieNames} = useSelector((store) => store.gpt);
  if (!movieNames) return null;
  console.log(movieNames);  
  return (
    <div className='suggestion-wrapper'>
      <div>
        {movieNames.movieNames.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movies={movieResults.movieResults[index]}
        /> 
      ))}
      </div>
    </div>
  )
}

export default GptMovieSuggestions