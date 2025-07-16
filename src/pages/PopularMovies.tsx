import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movie from '../interface/Movie';
import SearchBar from '../components/SearchBar';
import ColumnsSelect from '../components/ColumnsSelect';
import { Link } from 'react-router-dom';
import { HeaderTitle } from '../components/HeaderTitle';
import StarRating from '../components/StarRating';
import LoadingSpinner from '../components/LoadingSpinner';
interface PopularMoviesProps {
    apiKey: string;
}

const PopularMovies: React.FC<PopularMoviesProps> = ({ apiKey }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    // const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [columns, setColumns] = useState<number>(
        import.meta.env.VITE_REACT_APP_COLUMN
    );
    const [isBackdrop, setIsBackdrop] = useState(false);

    const toggleImage = () => {
        setIsBackdrop(!isBackdrop);
    };

    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        if (movies.length > 0) {
            setIsLoading(false);
            return;
        }

        // console.log('useEffect2');
        axios
            .get(`${API_URL}/movie/popular?api_key=${apiKey}`)
            .then((response) => {
                setMovies(response.data.results);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            });
    }, [API_URL, apiKey, movies]);

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container my-2">
            <HeaderTitle value="Popular Movies" />
            <div className="row">
                <SearchBar
                    value={searchQuery}
                    placeholderValue="Search for a Movie"
                    onChange={setSearchQuery}
                />
                <ColumnsSelect value={columns} onChange={setColumns} />
            </div>
            {isLoading ? (
                <div className="row">
                    <LoadingSpinner />
                </div>
            ) : (
                <div className="row">
                    {filteredMovies.map((movie) => (
                        <div
                            className={`col-md-${12 / columns}`}
                            key={movie.id}
                        >
                            <div className="cardp mb-4">
                                {/* <div className="main_image">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${
                                            isBackdrop
                                                ? movie.backdrop_path != null
                                                    ? movie.backdrop_path
                                                    : movie.poster_path
                                                : movie.poster_path
                                        }`}
                                        className={`card-img-top ${
                                            isBackdrop ? 'backdrop' : 'poster'
                                        }`}
                                        alt={movie.title}
                                        onClick={toggleImage}
                                    />
                                </div> */}
                                <div className="main_image image-container">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${
                                            isBackdrop
                                                ? movie.backdrop_path
                                                : movie.poster_path
                                        }`}
                                        className={`card-img-top img-fluid h-80 ${
                                            isBackdrop ? 'backdrop' : 'poster'
                                        }`}
                                        alt={movie.title}
                                        onClick={toggleImage}
                                        // style={{
                                        //     objectFit: 'cover', // Maintain aspect ratio and cover the container
                                        //     height: '100%', // Ensure the image takes up the full height
                                        // }}
                                    />
                                </div>
                                <div className="card-body">
                                    <p className="card-title">
                                        {movie.title} (
                                        {new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                        }).format(new Date(movie.release_date))}
                                        )
                                    </p>
                                    <StarRating value={movie.vote_average} />
                                    <p className="card-text">
                                        {movie.overview.substring(0, 50)}...
                                    </p>

                                    <button className="btn btn-primary">
                                        {' '}
                                        <Link
                                            to={`/movies/${movie.id}`}
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
            )}
            {isLoading && <LoadingSpinner />}
        </div>
    );
};

export default PopularMovies;
