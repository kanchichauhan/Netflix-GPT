import { useEffect } from "react";
import { options } from "./../components/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

export const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getMovieVideos = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, options)
        const json = await data.json();

        const filterTrailerData = json.results.filter((video) => video.type === 'Trailer')
        const trailer = filterTrailerData.length ? filterTrailerData[0] : json.results[0]
        dispatch(addTrailerVideo(trailer));
    }
    useEffect(() => {
        getMovieVideos()
    }, []);
};