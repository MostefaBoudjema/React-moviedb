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
                                        <div
                                            className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg "
                                            style={{
                                                backgroundImage: `url(https://image.tmdb.org/t/p/w500${singleActor.profile_path})`,
                                                backgroundPosition:
                                                    'left center',
                                            }}
                                        >
                                            <div className="d-flex flex-column h-100 p-4 pb-3 text-white text-shadow-1">
                                                {/* <h2 className="pt-3 mt-5 mb-4 display-6 lh-1 fw-bold d-flex justify-content-center align-items-center">
                                        {singleActor.name}
                                    </h2> */}
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

                                                <ul className="d-flex list-unstyled mt-auto">
                                                    {singleActor.known_for.map((item, idx) => (
                                                        <li className="d-flex align-items-center me-3" key={idx}>
                                                            <Link
                                                                to={
                                                                    item.media_type === 'movie'
                                                                        ? `/popular-movies/${item.id}`
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
