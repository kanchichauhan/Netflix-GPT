import { useSelector } from "react-redux";
import MovieList from "./MovieList";

export const SecondaryContainer = () => {
    const movies = useSelector((store) => store.movies);

    return (<div className="all-movies">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
        <MovieList title={"Popular Movies"} movies={movies.popularMovies}/>
        <MovieList title={"Top Rated Movies"} movies={movies.topRatedMovies}/>
        <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies}/>
    </div>)
};
