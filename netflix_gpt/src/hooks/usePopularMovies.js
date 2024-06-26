import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addPopularMovies } from "../utils/movieSlice";
import { options } from "../components/constants";

export const usePopularMovies = () => {
    const dispatch = useDispatch();
    const popularMovies = useSelector(store => store.movies.popularMovies)


    const getpopularMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?page=1', options);
        const json = await data.json();
        dispatch(addPopularMovies(json.results))
    };
    useEffect(() => {
        !popularMovies && getpopularMovies();
    }, []);
};
