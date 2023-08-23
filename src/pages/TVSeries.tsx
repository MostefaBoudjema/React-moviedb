import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TVShow from '../interface/TVShow';
import SearchBar from '../components/SearchBar';
import ColumnsSelect from '../components/ColumnsSelect';
import { HeaderTitle } from '../components/HeaderTitle';

import StarRating from '../components/StarRating';
interface TVSeriesProps {
    apiKey: string;
}

const TVSeries: React.FC<TVSeriesProps> = ({ apiKey }) => {
    const [tvShows, setTVShows] = useState<TVShow[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [columns, setColumns] = useState<number>(
        import.meta.env.VITE_REACT_APP_COLUMN
    ); // Default number of columns
    const [isBackdrop, setIsBackdrop] = useState(true);

    const toggleImage = () => {
        setIsBackdrop(!isBackdrop);
    };
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        // console.log('useEffect3');
        axios
            .get(`${API_URL}/tv/popular?api_key=${apiKey}`)
            .then((response) => {
                setTVShows(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const filteredTVShows = tvShows.filter((tvShow) =>
        tvShow.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container  my-2">
            <HeaderTitle value="Popular TV Series" />
            <div className="row">
                <SearchBar
                    value={searchQuery}
                    placeholderValue="Search for a TV Serie"
                    onChange={setSearchQuery}
                />
                <ColumnsSelect value={columns} onChange={setColumns} />
            </div>
            <div className="row">
                {filteredTVShows.map((serie) => (
                    <div className={`col-md-${12 / columns}`} key={serie.id}>
                        <div className="cardp mb-4">
                            <div className="main_image">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${
                                        isBackdrop
                                            ? serie.backdrop_path != null
                                                ? serie.backdrop_path
                                                : serie.poster_path
                                            : serie.poster_path
                                    }`}
                                    className={`card-img-top ${
                                        isBackdrop ? 'backdrop' : 'poster'
                                    }`}
                                    alt={serie.name}
                                    onClick={toggleImage}
                                />
                            </div>
                            <div className="card-body">
                                <p className="card-title">
                                    {serie.name} (
                                    {new Intl.DateTimeFormat('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                    }).format(new Date(serie.first_air_date))}
                                    )
                                </p>

                                <StarRating value={serie.vote_average} />
                                <p className="card-text">
                                    {serie.overview.substring(0, 50)}...
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TVSeries;
