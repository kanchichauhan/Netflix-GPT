import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: 'gpt',
    initialState: {
        showGptSearch: false,
        movieNames: null,
        movieResults: null,
    },
    reducers: {
        toggleGptSearchView: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addGptMovieResult: (state, action) => {
            const { movieNames, movieResults} = action.payload;
            state.movieNames = action.payload;
            state.movieResults = action.payload;
        }
    },
});

export const {toggleGptSearchView, addGptMovieResult} = gptSlice.actions;

export default gptSlice.reducer