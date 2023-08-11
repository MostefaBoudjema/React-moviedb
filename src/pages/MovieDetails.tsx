import { useState, useEffect } from 'react';
import SingleMovie, {initialMovieState} from '../interface/SingleMovie';
import axios from 'axios';
import { useParams } from 'react-router-dom';
interface MovieDetailsProps {
    apiKey: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ apiKey }) => {
    const [movie, setMovies] = useState<SingleMovie>(initialMovieState);
   
    const { id } = useParams();
    const [isBackdrop, setIsBackdrop] = useState(false);

    const toggleImage = () => {
        setIsBackdrop(!isBackdrop);
    };
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    useEffect(() => {
        const fetchMovieData = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/movie/${id}?api_key=${apiKey}`
                );
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchMovieData();
    }, [id, apiKey]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${
                            isBackdrop ? movie.backdrop_path : movie.poster_path
                        }`}
                        className={`card-img-top ${
                            isBackdrop ? 'backdrop' : 'poster'
                        }`}
                        alt={movie.title}
                        onClick={toggleImage}
                    />
                </div>
                <div className="col-md-8">
                    <h2 className="mb-3 text-primary">{movie.title}</h2>
                    <p className="lead">{movie.tagline}</p>
                    <p className="mb-4">{movie.overview}</p>
                    <ul className="list-unstyled">
                        <li>
                            <strong className="text-muted">Release Date:</strong>{' '}
                            {movie.release_date}
                        </li>
                        <li>
                            <strong className="text-muted">Runtime:</strong>{' '}
                            {movie.runtime} minutes
                        </li>
                        <li>
                            <strong className="text-muted">Vote Average:</strong>{' '}
                            {movie.vote_average}
                        </li>
                        <li>
                            <strong className="text-muted">Popularity:</strong>{' '}
                            {movie.popularity}
                        </li>
                    </ul>
                </div>
            </div>
            {/* <div className="row mt-4">
                <div className="col">
                    <h4>Production Countries:</h4>
                    <ul>
                        {movie.production_countries.map(country => (
                            <li key={country.iso_3166_1}>{country.name}</li>
                        ))}
                    </ul>
                </div>
            </div> */}
            {/* <div className="row mt-4">
                <div className="col">
                    <h4>Spoken Languages:</h4>
                    <ul>
                        {movie.spoken_languages.map(language => (
                            <li key={language.iso_639_1}>{language.name}</li>
                        ))}
                    </ul>
                </div>
            </div> */}
        </div>
    );
};

export default MovieDetails;
