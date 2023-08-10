import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Actor from '../interface/Actor';


interface ActorsProps {
  apiKey: string;
}

const Actors: React.FC<ActorsProps> = ({ apiKey }) => {
  const [Actors, setActors] = useState<Actor[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [columns, setColumns] = useState<number>(import.meta.env.VITE_REACT_APP_COLUMN); // Default number of columns
  
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL

  useEffect(() => {
    console.log('useEffect1');
    axios.get(`${API_URL}/person/popular?api_key=${apiKey}`)
      .then(response => {
        setActors(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [apiKey]);

  const filteredActors = Actors.filter(tvShow =>
    tvShow.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Popular Actors</h1>

      <div className="row">
                <div className={`col-md-6`}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for an Actor"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className={`col-md-6`}>
                    <div className="mb-3">
                        <select
                            className="form-control"
                            value={columns}
                            onChange={(e) => setColumns(Number(e.target.value))}
                        >
                            <option value={1}>1 Columns</option>
                            <option value={2}>2 Columns</option>
                            <option value={3}>3 Columns</option>
                            <option value={4}>4 Columns</option>
                            <option value={6}>6 Columns</option>
                        </select>
                    </div>
                </div>
            </div>
      <div className="row">
        {filteredActors.map(serie => (
           <div className={`col-md-${12 / columns}`} key={serie.id}>
            <div className="card mb-4">
              {/* <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} className="card-img-top" alt={serie.name} /> */}
              <img src={`https://image.tmdb.org/t/p/w500${serie.profile_path}`} className="card-img-top" alt={serie.name} />
              <div className="card-body">
                <h5 className="card-title">{serie.name}</h5>
                <p className="card-text">Popularity: {serie.popularity}</p>
                <p className="card-text">Known For: {serie.known_for_department}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Actors;
