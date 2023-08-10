// src/components/PopularMovies.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../interface/Movie';

interface PopularMoviesProps {
    apiKey: string;
}

const PopularMovies: React.FC<PopularMoviesProps> = ({ apiKey }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [columns, setColumns] = useState<number>(import.meta.env.VITE_REACT_APP_COLUMN); 

    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
      console.log('useEffect2');
        axios
            .get(`${API_URL}/movie/popular?api_key=${apiKey}`)
            .then((response) => {
                setMovies(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [apiKey]);

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Popular Movies</h1>
            <div className="row">
                <div className={`col-md-6`}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for a Movie"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className={`col-md-6`}>
                    <div className="mb-3">
                        <select
                            className="form-control"
                            value={columns}
                            onChange={(e) => setColumns(Number(e.target.value))}
                        >
                            <option value={1}>1 Columns</option>
                            <option value={2}>2 Columns</option>
                            <option value={3}>3 Columns</option>
                            <option value={4}>4 Columns</option>
                            <option value={6}>6 Columns</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row">
                {filteredMovies.map((movie) => (
                    <div className={`col-md-${12 / columns}`} key={movie.id}>
                        <div className="card mb-4">
                            {/* <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} /> */}
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                                className="card-img-top"
                                alt={movie.title}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">
                                    Vote Average: {movie.vote_average}
                                </p>
                                <p className="card-text">{movie.overview}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularMovies;
