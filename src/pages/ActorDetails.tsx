import { useState, useEffect } from 'react';
import SingleActor, { initialActorState } from '../interface/SingleActor';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/custom.scss';
interface ActorDetailsProps {
    apiKey: string;
}

const ActorDetails: React.FC<ActorDetailsProps> = ({ apiKey }) => {
    const [actor, setActors] = useState<SingleActor>(initialActorState);
    const { id } = useParams();
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    useEffect(() => {
        const fetchActorData = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/person/${id}?append_to_response=credits&api_key=${apiKey}`
                );
                setActors(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchActorData();
    }, [id, apiKey]);

    return (
        <div className="container mt-5 mb-5">
            <div className="card p-4">
                <div className="row g-0">
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <img
                            src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : '/public/images/client-img.png'}
                            className="img-fluid rounded mb-3"
                            alt={actor.name}
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                        <h2 className="fw-bold text-center">{actor.name}</h2>
                        <span className="badge bg-secondary mb-2">{actor.known_for_department}</span>
                        <p className="text-muted mb-1"><strong>Birthday:</strong> {actor.birthday || 'N/A'}</p>
                        {actor.deathday && <p className="text-muted mb-1"><strong>Deathday:</strong> {actor.deathday}</p>}
                        <p className="text-muted mb-1"><strong>Place of Birth:</strong> {actor.place_of_birth || 'N/A'}</p>
                        <p className="text-muted mb-1"><strong>Popularity:</strong> {actor.popularity}</p>
                    </div>
                    <div className="col-md-8">
                        <div className="p-3">
                            <h4 className="fw-bold mb-3">Biography</h4>
                            <p style={{ whiteSpace: 'pre-line' }}>{actor.biography || 'No biography available.'}</p>
                            <h4 className="fw-bold mt-4 mb-3">Known For</h4>
                            <div className="row">
                                {actor.credits.cast && actor.credits.cast.length > 0 ? (
                                    actor.credits.cast.slice(0, 8).map((credit) => (
                                        <div className="col-6 col-md-4 col-lg-3 mb-3" key={credit.credit_id}>
                                            <div className="card h-100">
                                                <Link
                                                    to={
                                                        credit.media_type === 'movie'
                                                            ? `/popular-movies/${credit.id}`
                                                            : credit.media_type === 'tv'
                                                            ? `/tv-series/${credit.id}`
                                                            : '#'
                                                    }
                                                    style={{ textDecoration: 'none' }}
                                                >
                                                    <img
                                                        src={credit.poster_path ? `https://image.tmdb.org/t/p/w200${credit.poster_path}` : '/public/images/client-img.png'}
                                                        className="card-img-top"
                                                        alt={credit.original_name || credit.name}
                                                        style={{ height: '200px', objectFit: 'cover' }}
                                                    />
                                                </Link>
                                                <div className="card-body p-2">
                                                    <h6 className="card-title mb-1">{credit.original_name || credit.name}</h6>
                                                    <p className="card-text mb-0"><small>as {credit.character}</small></p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No credits available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActorDetails;
