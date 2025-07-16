import '../css/style.scss';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TVShow from '../interface/TVShow';
import Movie from '../interface/Movie';
import Actor from '../interface/Actor';
import { Navbar } from '../components/Navbar';
import { Link } from 'react-router-dom';

interface HomeProps {
    apiKey: string;
}

const Home: React.FC<HomeProps> = ({ apiKey }) => {
    const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
    const [tvShows, setTVShows] = useState<TVShow[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [actors, setActors] = useState<Actor[]>([]);
    const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const moviesResponse = await axios.get(
                    `${API_URL}/movie/popular?api_key=${apiKey}`
                );
                setMovies(moviesResponse.data.results);
                // Pick a random featured movie
                const randomIndex = Math.floor(Math.random() * Math.min(10, moviesResponse.data.results.length));
                setFeaturedMovie(moviesResponse.data.results[randomIndex]);

                const tvResponse = await axios.get(
                    `${API_URL}/tv/popular?api_key=${apiKey}`
                );
                setTVShows(tvResponse.data.results);

                const actorsResponse = await axios.get(
                    `${API_URL}/person/popular?api_key=${apiKey}`
                );
                setActors(actorsResponse.data.results);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="netflix-home" style={{ background: '#141414', minHeight: '100vh' }}>
            <Navbar />
            {/* Hero Section */}
            {featuredMovie && (
                <section
                    className="hero-section"
                    style={{
                        position: 'relative',
                        height: '70vh',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'flex-end',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundImage: `linear-gradient(to top, rgba(20,20,20,0.95) 10%, rgba(20,20,20,0.2) 60%), url(https://image.tmdb.org/t/p/original/${featuredMovie.backdrop_path})`,
                        padding: '0 4vw 4vw 4vw',
                    }}
                >
                    <div style={{ maxWidth: 600 }}>
                        <h1 className="hero-title" style={{ fontSize: '3rem', fontWeight: 700, marginBottom: 16 }}>{featuredMovie.title}</h1>
                        <p style={{ fontSize: '1.2rem', marginBottom: 24, maxHeight: 120, overflow: 'hidden', textOverflow: 'ellipsis' }}>{featuredMovie.overview}</p>
                        <div style={{ display: 'flex', gap: 16 }}>
                            <Link to={`/movie/${featuredMovie.id}`} className="hero-btn hero-btn-play">Play</Link>
                            <Link to={`/movie/${featuredMovie.id}`} className="hero-btn hero-btn-info">More Info</Link>
                        </div>
                    </div>
                </section>
            )}
            {/* Carousels */}
            <div className="carousel-section" style={{ marginTop: 32 }}>
                {/* Popular Movies */}
                <RowCarousel title="Popular Movies" items={movies} type="movie" />
                {/* Popular TV Shows */}
                <RowCarousel title="Popular TV Shows" items={tvShows} type="tv" />
                {/* Trending Actors */}
                <RowCarousel title="Trending Actors" items={actors} type="actor" />
            </div>
        </div>
    );
};

// Carousel Row Component
interface RowCarouselProps {
    title: string;
    items: any[];
    type: 'movie' | 'tv' | 'actor';
}

const RowCarousel: React.FC<RowCarouselProps> = ({ title, items, type }) => {
    return (
        <div className="row-carousel" style={{ marginBottom: 32 }}>
            <h2 style={{ color: '#fff', marginLeft: 24, marginBottom: 12 }}>{title}</h2>
            <div className="carousel-scroll" style={{ display: 'flex', overflowX: 'auto', paddingLeft: 24, gap: 16 }}>
                {items.map((item, idx) => {
                    let imageUrl = '';
                    let linkTo = '#';
                    let displayName = '';
                    if (type === 'movie') {
                        imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : '';
                        linkTo = `/movie/${item.id}`;
                        displayName = item.title;
                    } else if (type === 'tv') {
                        imageUrl = item.poster_path ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : '';
                        linkTo = `/tv/${item.id}`;
                        displayName = item.name;
                    } else if (type === 'actor') {
                        imageUrl = item.profile_path ? `https://image.tmdb.org/t/p/w300${item.profile_path}` : '';
                        linkTo = `/actor/${item.id}`;
                        displayName = item.name;
                    }
                    return (
                        <Link
                            to={linkTo}
                            key={item.id || idx}
                            style={{
                                display: 'block',
                                minWidth: 160,
                                maxWidth: 180,
                                textDecoration: 'none',
                                color: '#fff',
                            }}
                        >
                            <div
                                style={{
                                    width: 160,
                                    height: 240,
                                    background: '#222',
                                    borderRadius: 8,
                                    overflow: 'hidden',
                                    marginBottom: 8,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.5)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                {imageUrl ? (
                                    <img
                                        src={imageUrl}
                                        alt={displayName}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div style={{ color: '#888', fontSize: 14, textAlign: 'center' }}>No Image</div>
                                )}
                            </div>
                            <div style={{ fontSize: 16, fontWeight: 500, textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayName}</div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
