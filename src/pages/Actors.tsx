import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Actor from '../interface/Actor';
import SearchBar from '../components/SearchBar';
import ColumnsSelect from '../components/ColumnsSelect';
import { HeaderTitle } from '../components/HeaderTitle';

interface ActorsProps {
    apiKey: string;
}

const Actors: React.FC<ActorsProps> = ({ apiKey }) => {
    const [Actors, setActors] = useState<Actor[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [columns, setColumns] = useState<number>(
        import.meta.env.VITE_REACT_APP_COLUMN
    ); // Default number of columns

    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        console.log('useEffect1');
        axios
            .get(`${API_URL}/person/popular?api_key=${apiKey}`)
            .then((response) => {
                setActors(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [apiKey]);

    const filteredActors = Actors.filter((tvShow) =>
        tvShow.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container  my-2">
            <HeaderTitle value="Popular Actors" />
            <div className="row">
                <SearchBar
                    value={searchQuery}
                    placeholderValue="Search for an Actor"
                    onChange={setSearchQuery}
                />
                <ColumnsSelect value={columns} onChange={setColumns} />
            </div>
            <div className="row">
                {filteredActors.map((singleActor) => (
                    <div className={`col-md-${12 / columns}`} key={singleActor.id}>
                        <div className="card mb-4">
                            {/* <img src={`https://image.tmdb.org/t/p/w500${singleActor.poster_path}`} className="card-img-top" alt={singleActor.name} /> */}
                            <img
                                src={`https://image.tmdb.org/t/p/w500${singleActor.profile_path}`}
                                className="card-img-top"
                                alt={singleActor.name}
                            />
                            <div className="card-body">
                                {/* <h5 className="card-title">{singleActor.name}</h5> */}
                                <p className="card-text">
                                   <strong>{singleActor.name}</strong> 
                                </p>
                                <p className="card-text">
                                    Popularity: {singleActor.popularity}
                                </p>
                                <p className="card-text">
                                    Known For: {singleActor.known_for_department}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Actors;
