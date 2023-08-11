// src/components/PopularMovies.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../interface/Movie';
import SearchBar from '../components/SearchBar';
import ColumnsSelect from '../components/ColumnsSelect';
import { Link } from 'react-router-dom';

interface PopularMoviesProps {
    apiKey: string;
}

const PopularMovies: React.FC<PopularMoviesProps> = ({ apiKey }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState(true); // Added loading state
    const [columns, setColumns] = useState<number>(
        import.meta.env.VITE_REACT_APP_COLUMN
    );
    const [isBackdrop, setIsBackdrop] = useState(true);

    const toggleImage = () => {
        setIsBackdrop(!isBackdrop);
    };

    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        // Check if movies are already cached in local state
        if (movies.length > 0) {
            setLoading(false); // Set loading to false since data is available
            return; // Exit the effect early
        }

        console.log('useEffect2');
        axios
            .get(`${API_URL}/movie/popular?api_key=${apiKey}`)
            .then((response) => {
                setMovies(response.data.results);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false); // Set loading to false in case of error
            });
    }, [API_URL, apiKey, movies]); // Include API_URL and movies in the dependency array

    if (loading) {
        return <div>Loading...</div>;
    }

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container my-2">
            <h1 className="text-center mb-4">Popular Movies</h1>
            <div className="row">
                <SearchBar value={searchQuery} placeholderValue="Search for a Movie" onChange={setSearchQuery} />
                <ColumnsSelect value={columns} onChange={setColumns} />
            </div>
            <div className="row">
                {filteredMovies.map((movie) => (
                    <div className={`col-md-${12 / columns}`} key={movie.id}>
                        <div className="card mb-4">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${
                                    isBackdrop
                                        ? movie.backdrop_path
                                        : movie.poster_path
                                }`}
                                className={`card-img-top ${
                                    isBackdrop ? 'backdrop' : 'poster'
                                }`}
                                alt={movie.title}
                                onClick={toggleImage}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">
                                    Vote Average: {movie.vote_average}
                                </p>
                                <p className="card-text">
                                    {movie.overview.substring(0, 50)}...
                                </p>

                                <button className="btn btn-primary">
                                    {' '}
                                    <Link
                                        to={`/popular-movies/${movie.id}`}
                                        className="text-decoration-none text-light"
                                    >
                                        Read More
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularMovies;
