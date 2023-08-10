// MovieContext.js
import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';

const MovieContext = createContext();

const initialState = {
    movies: [],
    loading: true,
};

const movieReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return {
                ...state,
                movies: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

const MovieProvider = ({ children }) => {
    const [state, dispatch] = useReducer(movieReducer, initialState);

    useEffect(() => {
        const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
        const apiKey = import.meta.env.VITE_REACT_APP_TMDB_API_KEY; 

        if (state.movies.length === 0) {
            axios
                .get(`${API_URL}/movie/popular?api_key=${apiKey}`)
                .then((response) => {
                    dispatch({ type: 'SET_MOVIES', payload: response.data.results });
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [state.movies]);

    return (
        <MovieContext.Provider value={state}>
            {children}
        </MovieContext.Provider>
    );
};

const useMovieContext = () => {
    return useContext(MovieContext);
};

export { MovieProvider, useMovieContext };
