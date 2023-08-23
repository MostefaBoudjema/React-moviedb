import { useState, useEffect } from 'react';
import SingleMovie, { initialMovieState } from '../interface/SingleMovie';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import '../css/custom.scss';
import { Cast } from '../components/Cast';
interface MovieDetailsProps {
    apiKey: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ apiKey }) => {
    const [movie, setMovies] = useState<SingleMovie>(initialMovieState);

    const { id } = useParams();
    const [isBackdrop, setIsBackdrop] = useState(true);

    const toggleImage = () => {
        setIsBackdrop(!isBackdrop);
    };
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/movie/${id}?append_to_response=videos,credits&api_key=${apiKey}`
                );
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMovieData();
    }, [id, apiKey]);

    return (
        <div className="">
            <div className="container mt-5 mb-5">
                <div className="card">
                    <div className="row g-0">
                        <div className="col-md-6 px-5">
                            <div className="d-flex flex-column justify-content-center ">
                                <div className="main_image align-items-start h-50">
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
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-3 right-side ">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h1>
                                        {movie.title} ({movie.release_date}
                                        {/* {new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                        }).format(new Date(movie.release_date))} */}
                                        )
                                    </h1>
                                    <StarRating value={movie.vote_average} /> (
                                    {movie.vote_average}/10)
                                </div>
                                {movie.tagline}
                                <div className="py-4">
                                    <div className="mt-2 pr-3 content ">
                                        <span className="fw-bold m-3 ">
                                            Overview
                                        </span>
                                        <p className="mt-2">{movie.overview}</p>
                                    </div>
                                </div>

                                {/* <div className="search-option">
                                    <i className="bx bx-search-alt-2 first-search"></i>
                                    <div className="inputs">
                                        <input type="text" name="" />
                                    </div>
                                    <i className="bx bx-share-alt share"></i>
                                </div> */}
                            </div>
                        </div>
                        <div className="mt-5">
                            <Cast castMember={movie.credits.cast} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
