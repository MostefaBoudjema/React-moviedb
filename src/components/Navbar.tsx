import { Link, useLocation } from 'react-router-dom';

import { useState } from 'react';
export function Navbar() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const location = useLocation();

    const shouldApplyClass = location.pathname === '/';
    return (
        <div className={shouldApplyClass ? 'bg-movie' : ''}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded={!isNavCollapsed}
                        aria-label="Toggle navigation"
                        onClick={handleNavCollapse}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className={`${
                            isNavCollapsed ? 'collapse' : ''
                        } navbar-collapse`}
                        id="navbarNav"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li>
                                <Link
                                    className={`mx-4 navbar-brand ${
                                        shouldApplyClass ? 'text-white' : ''
                                    }`}
                                    to="/"
                                >
                                    <img src="/vite.svg" alt="Logo" />
                                    <strong className="m-3 d-none d-lg-inline-block">
                                        MovieDb
                                    </strong>
                                </Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav mr-auto mb-2 mb-lg-0">
                            <li>
                                <Link
                                    className={`nav-link ${
                                        shouldApplyClass ? 'text-white' : ''
                                    } ${
                                        location.pathname === '/movies'
                                            ? 'active'
                                            : ''
                                    }`}
                                    to="/movies"
                                >
                                    Movies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`nav-link ${
                                        shouldApplyClass ? 'text-white' : ''
                                    } ${
                                        location.pathname === '/tv-series'
                                            ? 'active'
                                            : ''
                                    }`}
                                    to="/tv-series"
                                >
                                    TVShows
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className={`nav-link ${
                                        shouldApplyClass ? 'text-white' : ''
                                    } ${
                                        location.pathname === '/actors'
                                            ? 'active'
                                            : ''
                                    }`}
                                    to="/actors"
                                >
                                    Actors
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
