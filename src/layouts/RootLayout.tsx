import { Routes, Route } from 'react-router-dom'; 
import PopularMovies from '../pages/PopularMovies';
import Home from '../pages/Home';
import TVSeries from '../pages/TVSeries';
import Actors from '../pages/Actors';
import MovieDetails from '../pages/MovieDetails';
import ActorDetails from '../pages/ActorDetails';
import SerieDetails from '../pages/SerieDetails';

export function RootLayout() {
    const apiKey = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;


    return (
        <>
            <div className="App2">
                <Routes>
                    <Route path="/" element={<Home apiKey={apiKey} />} />
                    <Route
                        path="/movies"
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
                        path="/movies/:id"
                        element={<MovieDetails apiKey={apiKey} />}
                    />
                    <Route
                        path="/actors/:id"
                        element={<ActorDetails apiKey={apiKey} />}
                    />
                    <Route
                        path="/tv-series/:id"
                        element={<SerieDetails apiKey={apiKey} />}
                    />
                    {/* <Route
                        path="/*"
                        element={<Navigate to="/" replace />}
                    /> */}
                </Routes>
            </div>
        </>
    );
}
