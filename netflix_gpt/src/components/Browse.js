import Header from "./Header";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { usePopularMovies } from "../hooks/usePopularMovies";
import {useTopRatedMovies} from '../hooks/useTopRatedMovies';

import {MainContainer} from './MainContainer';
import {SecondaryContainer} from './SecondaryContainer';
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";

const Browse = () => {
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();
    return <div>
        <Header />
        <MainContainer />
        {/*         
            Main container
                - video background
                - video title
            Secondary container
                - movielist * n
                - cards * n
        */}
                <SecondaryContainer />

    </div>
};
export default Browse;