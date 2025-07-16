import { useState, useEffect } from 'react';
import TVShow, { initialTVShowState } from '../interface/TVShow';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import StarRating from '../components/StarRating';
import '../css/custom.scss';
import { Cast } from '../components/Cast'; // Uncomment if you want to show cast for TV shows

interface SerieDetailsProps {
    apiKey: string;
}

const SerieDetails: React.FC<SerieDetailsProps> = ({ apiKey }) => {
    const [serie, setSerie] = useState<TVShow>(initialTVShowState);
    const { id } = useParams();
    const [isBackdrop, setIsBackdrop] = useState(true);

    const toggleImage = () => {
        setIsBackdrop(!isBackdrop);
    };
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    useEffect(() => {
        const fetchSerieData = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/tv/${id}?append_to_response=credits&api_key=${apiKey}`
                );
                setSerie(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSerieData();
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
                                                ? serie.backdrop_path
                                                : serie.poster_path
                                        }`}
                                        className={`card-img-top ${
                                            isBackdrop ? 'backdrop' : 'poster'
                                        }`}
                                        alt={serie.name}
                                        onClick={toggleImage}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="p-3 right-side ">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h1>
                                        {serie.name} ({serie.first_air_date})
                                    </h1>
                                    <StarRating value={serie.vote_average} /> (
                                    {serie.vote_average}/10)
                                </div>
                                <div className="py-4">
                                    <div className="mt-2 pr-3 content ">
                                        <span className="fw-bold m-3 ">
                                            Overview
                                        </span>
                                        <p className="mt-2">{serie.overview}</p>
                                    </div>
                                </div>
                                {/* Add more TV show details here if needed */}
                            </div>
                        </div>
                    </div>
                    {/* Cast Section */}
                    <div className="mt-5">
                        <Cast castMember={serie.credits?.cast || []} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SerieDetails; 