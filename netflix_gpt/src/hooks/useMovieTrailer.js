import { useEffect } from "react";
import { options } from "./../components/constants";
import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

export const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const trailerVideo = useSelector(store => store.movies.trailerVideo)

    const getMovieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
        const json = await data.json();

        const filterTrailerData = json.results.filter((video) => video.type === 'Trailer')
        const trailer = filterTrailerData.length ? filterTrailerData[0] : json.results[0]
        dispatch(addTrailerVideo(trailer));
    }
    useEffect(() => {
        !trailerVideo && getMovieVideos()
    }, []);
};