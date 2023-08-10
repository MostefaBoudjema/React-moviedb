import { Routes, Route } from 'react-router';
import PopularMovies from '../pages/PopularMovies';
import TVSeries from '../pages/TVSeries';
import Actors from '../pages/Actors';
export function RootLayout() {
    
    const apiKey = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;
    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={<PopularMovies apiKey={apiKey} />}
                />
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
            </Routes>
        </>
    );
}
