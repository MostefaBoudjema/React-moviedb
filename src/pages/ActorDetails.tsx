import { useState, useEffect } from 'react';
import SingleActor, { initialActorState } from '../interface/SingleActor';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/custom.scss';
interface ActorDetailsProps {
    apiKey: string;
}

const getCreditTitle = (credit: any) => {
    return (
        credit.title ||
        credit.name ||
        credit.original_title ||
        credit.original_name ||
        'Untitled'
    );
};

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
                            src={
                                actor.profile_path
                                    ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                                    : '/public/images/client-img.png'
                            }
                            className="img-fluid rounded mb-3"
                            alt={actor.name}
                            style={{ maxHeight: '400px', objectFit: 'cover' }}
                        />
                        <h2
                            className="fw-bold text-center"
                            style={{
                                textShadow:
                                    '0 0 3px #fff, 0 0 3px #fff, 0 0 3px #fff',
                            }}
                        >
                            {actor.name}
                        </h2>
                        <span
                            className="badge bg-info text-dark badge-on-dark mb-2"
                            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
                        >
                            {actor.known_for_department}
                        </span>
                        <p
                            className="text-light text-on-dark mb-1"
                            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
                        >
                            <strong>Birthday:</strong> {actor.birthday || 'N/A'}
                        </p>
                        {actor.deathday && (
                            <p
                                className="text-light text-on-dark mb-1"
                                style={{
                                    textShadow: '0 1px 4px rgba(0,0,0,0.7)',
                                }}
                            >
                                <strong>Deathday:</strong> {actor.deathday}
                            </p>
                        )}
                        <p
                            className="text-light text-on-dark mb-1"
                            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
                        >
                            <strong>Place of Birth:</strong>{' '}
                            {actor.place_of_birth || 'N/A'}
                        </p>
                        <p
                            className="text-light text-on-dark mb-1"
                            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.7)' }}
                        >
                            <strong>Popularity:</strong> {actor.popularity}
                        </p>
                    </div>
                    <div className="col-md-8">
                        <div className="p-3">
                            <h4 className="fw-bold mb-3">Biography</h4>
                            <p style={{ whiteSpace: 'pre-line' }}>
                                {actor.biography || 'No biography available.'}
                            </p>
                            <h4 className="fw-bold mt-4 mb-3">Known For</h4>
                            <div className="row">
                                {actor.credits.cast &&
                                actor.credits.cast.length > 0 ? (
                                    actor.credits.cast
                                        .slice(0, 8)
                                        .map((credit) => (
                                            <div
                                                className="col-6 col-md-4 col-lg-3 mb-3"
                                                key={credit.credit_id}
                                            >
                                                <Link
                                                    to={
                                                        credit.media_type ===
                                                            'tv' ||
                                                        (!!credit.name &&
                                                            !credit.title)
                                                            ? `/tv-series/${credit.id}`
                                                            : `/movies/${credit.id}`
                                                    }
                                                    style={{
                                                        textDecoration: 'none',
                                                    }}
                                                >
                                                    <div className="card h-100">
                                                        <img
                                                            src={
                                                                credit.poster_path
                                                                    ? `https://image.tmdb.org/t/p/w200${credit.poster_path}`
                                                                    : '/public/images/client-img.png'
                                                            }
                                                            className="card-img-top"
                                                            alt={getCreditTitle(
                                                                credit
                                                            )}
                                                            style={{
                                                                height: '200px',
                                                                objectFit:
                                                                    'cover',
                                                            }}
                                                        />
                                                        <div className="card-body p-2">
                                                            <p className="card-text mb-0">
                                                                <strong
                                                                    style={{
                                                                        fontWeight: 900,
                                                                    }}
                                                                >
                                                                    {
                                                                        credit.character
                                                                    }
                                                                </strong>
                                                                <br />in <br />
                                                                <strong
                                                                    style={{
                                                                        fontWeight: 900,
                                                                    }}
                                                                >
                                                                    {getCreditTitle(
                                                                        credit
                                                                    )}
                                                                </strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
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
