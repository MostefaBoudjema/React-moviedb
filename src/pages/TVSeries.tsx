import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  overview: string;
}

interface TVSeriesProps {
  apiKey: string;
}

const TVSeries: React.FC<TVSeriesProps> = ({ apiKey }) => {
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL

  useEffect(() => {
    axios.get(`${API_URL}/tv/popular?api_key=${apiKey}`)
      .then(response => {
        setTVShows(response.data.results);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [apiKey]);

  const filteredTVShows = tvShows.filter(tvShow =>
    tvShow.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Popular TV Series</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a serie"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredTVShows.map(serie => (
          <div className="col-md-4" key={serie.id}>
            <div className="card mb-4">
              {/* <img src={`https://image.tmdb.org/t/p/w500${serie.poster_path}`} className="card-img-top" alt={serie.name} /> */}
              <img src={`https://image.tmdb.org/t/p/w500${serie.backdrop_path}`} className="card-img-top" alt={serie.name} />
              <div className="card-body">
                <h5 className="card-title">{serie.name}</h5>
                <p className="card-text">Vote Average: {serie.vote_average}</p>
                <p className="card-text">{serie.overview}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TVSeries;
