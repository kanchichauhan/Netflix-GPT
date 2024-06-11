import { useEffect } from "react";
import { options } from "../components/constants";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";

export const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const nowPlayingMovies = useSelector(store => store.movies.nowPlayingMovies)

    const  recentPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
        const json = await data.json();
        dispatch(addNowPlayingMovies(json.results))
    }
    useEffect(() => {
        !nowPlayingMovies && recentPlayingMovies();
    }, [])
};