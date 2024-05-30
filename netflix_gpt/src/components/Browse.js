import { useEffect } from "react";
import Header from "./Header";
import { options } from "./constants";

const Browse = () => {

    const  recentPlayingMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
        const json = await data.json();
        console.log(json.results);
    }
    useEffect(() => {
        recentPlayingMovies();
    }, [])

    return <div>
        <Header />
    </div>
};
export default Browse;