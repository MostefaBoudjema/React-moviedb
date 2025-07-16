import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Actor from '../interface/Actor';
import SearchBar from '../components/SearchBar';
import ColumnsSelect from '../components/ColumnsSelect';
import { HeaderTitle } from '../components/HeaderTitle';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link } from 'react-router-dom';
interface ActorsProps {
    apiKey: string;
}

const Actors: React.FC<ActorsProps> = ({ apiKey }) => {
    const [Actors, setActors] = useState<Actor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [columns, setColumns] = useState<number>(
        import.meta.env.VITE_REACT_APP_COLUMN
    ); // Default number of columns

    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        // console.log('useEffect1');
        axios
            .get(`${API_URL}/person/popular?api_key=${apiKey}`)
            .then((response) => {
                setActors(response.data.results);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [apiKey]);

    const filteredActors = Actors.filter((tvShow) =>
        tvShow.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <>
            <div className="container  my-2">
                <HeaderTitle value="Popular Actors" />
                {!isLoading && (
                    <div className="">
                        <div className="row">
                            <SearchBar
                                value={searchQuery}
                                placeholderValue="Search for an Actor"
                                onChange={setSearchQuery}
                            />
                            <ColumnsSelect
                                value={columns}
                                onChange={setColumns}
                            />
                        </div>
                        <div className="row">
                            {filteredActors.map((singleActor) => (
                                <div
                                    className={`col-md-${12 / columns}`}
                                    key={singleActor.id}
                                >
                                    <div className="cardp mb-4">
                                        <div className="card card-cover h-100 overflow-hidden text-white rounded-5 shadow-lg position-relative" style={{ minHeight: '350px' }}>
                                            {/* Actor image as absolutely positioned img */}
                                            <img
                                                src={
                                                    singleActor.profile_path
                                                        ? `https://image.tmdb.org/t/p/w500${singleActor.profile_path}`
                                                        : '/public/images/img-1.png'
                                                }
                                                alt={singleActor.name}
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover',
                                                    zIndex: 1,
                                                }}
                                            />
                                            {/* Overlay for readability */}
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    left: 0,
                                                    width: '100%',
                                                    height: '100%',
                                                    background: 'rgba(0,0,0,0.35)',
                                                    zIndex: 2,
                                                }}
                                            />
                                            {/* Card content */}
                                            <div className="d-flex flex-column h-100 p-4 pb-3 text-white text-shadow-1" style={{ position: 'relative', zIndex: 3 }}>
                                                <Link to={`/actors/${singleActor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    <h2 className="pt-3 mt-5 mb-4 display-6 lh-1 fw-bold">
                                                        {singleActor.name
                                                            .split(' ')
                                                            .map(
                                                                (
                                                                    namePart,
                                                                    index
                                                                ) => (
                                                                    <div className='actor-name-stroke'
                                                                        key={index}
                                                                    >
                                                                        {namePart}
                                                                    </div>
                                                                )
                                                            )}
                                                    </h2>
                                                </Link>

                                                <ul className="d-flex list-unstyled mt-auto">
                                                    {singleActor.known_for.map((item, idx) => (
                                                        <li className="d-flex align-items-center me-3" key={idx}>
                                                            <Link
                                                                to={
                                                                    item.media_type === 'movie'
                                                                        ? `/movies/${item.id}`
                                                                        : item.media_type === 'tv'
                                                                        ? `/tv-series/${item.id}`
                                                                        : '#'
                                                                }
                                                            >
                                                                <img
                                                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                                                    alt={item.title || item.name}
                                                                    width="64"
                                                                    height="64"
                                                                    className="rounded-circle border border-white"
                                                                    title={item.title || item.name}
                                                                />
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {isLoading && <LoadingSpinner />}
            </div>
        </>
    );
};

export default Actors;
