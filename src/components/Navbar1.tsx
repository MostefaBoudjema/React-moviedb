import { Link, useLocation } from 'react-router-dom';

import { useState } from 'react';
export function Navbar() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const location = useLocation();

    const shouldApplyClass = location.pathname === '/';
    return (
        <div className={shouldApplyClass ? 'bg-movie' : ''}>
            <div className="container">
                <nav className="navbar navbar-expand-lg d-flex justify-content-between">
                    <Link
                        className={`navbar-brand ${
                            shouldApplyClass ? 'text-white' : ''
                        }`}
                        to="/"
                    >
                        <img src="/favicon.png" alt="Logo" />
                        <strong className="m-3 d-none d-lg-inline-block">
                            MovieDb
                        </strong>
                    </Link>

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
                        <ul className="navbar-nav mr-auto fw-bold fs-61">
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${
                                        shouldApplyClass ? 'text-white' : ''
                                    }`}
                                    to="/movies"
                                >
                                    Movies
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${
                                        shouldApplyClass ? 'text-white' : ''
                                    }`}
                                    to="/tv-series"
                                >
                                    TV Shows
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${
                                        shouldApplyClass ? 'text-white' : ''
                                    }`}
                                    to="/actors"
                                >
                                    Actors
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}
