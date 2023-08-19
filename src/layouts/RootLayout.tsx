import { Routes, Route } from 'react-router-dom'; 
import PopularMovies from '../pages/PopularMovies';
import Home from '../pages/Home';
import TVSeries from '../pages/TVSeries';
import Actors from '../pages/Actors';
import MovieDetails from '../pages/MovieDetails';

export function RootLayout() {
    const apiKey = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;


    return (
        <>
            <div className="App2">
                <Routes>
                    <Route path="/" element={<Home apiKey={apiKey} />} />
                    <Route
                        path="/popular-movies"
                        element={<PopularMovies apiKey={apiKey} />}
                    />
                    <Route
                        path="/tv-series"
                        element={<TVSeries apiKey={apiKey} />}
                    />
                    <Route
                        path="/actors"
                        element={<Actors apiKey={apiKey} />}
                    />
                    <Route
                        path="/popular-movies/:id"
                        element={<MovieDetails apiKey={apiKey} />}
                    />
                    <Route
                        path="/*"
                        element={<PopularMovies apiKey={apiKey} />}
                    />
                </Routes>
            </div>
        </>
    );
}
