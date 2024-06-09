import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUpcomingMovies } from "../utils/movieSlice";
import { options } from "../components/constants";

export const useUpcomingMovies = () => {
    const dispatch = useDispatch();

    const upcomingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options);
        const json = await data.json();
        dispatch(addUpcomingMovies(json.results))
    };
    useEffect(() => {
        upcomingMovies();
    }, []);
};
