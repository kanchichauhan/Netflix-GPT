import { useSelector } from "react-redux";
import { VideoBackground } from "./VideoBackground";
import { VideoTitle } from "./VideoTitle";

export const MainContainer = () => {
    const movies = useSelector(store => store.movies?.nowPlayingMovies)
    if (!movies) return
    const trailerMovie = movies[2];
    const {original_title, overview, id} = trailerMovie
    return (<div class="main-container-wrapper">
        <VideoTitle title={original_title} overview={overview}/>
        <VideoBackground movieId={id}/>
    </div>)
};
