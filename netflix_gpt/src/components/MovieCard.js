import React from 'react'
import {movieImgUrl} from './constants'

const MovieCard = ({posterPath}) => {
  if (!posterPath) return null
  return (
    <div className='movie-card'>
      <img src={movieImgUrl+posterPath} alt="movie card"/>
    </div>
  )
}

export default MovieCard