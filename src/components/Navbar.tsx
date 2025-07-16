import { Link, useLocation } from 'react-router-dom';

import { useState } from 'react';
export function Navbar() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const location = useLocation();

    const shouldApplyClass = location.pathname === '/';
    return (
        <div className={shouldApplyClass ? 'bg-movie' : ''}>
            <nav className="navbar-custom">
                <div className="navbar-container">
                    <div className="navbar-collapse-custom expanded" id="navbarNav">
                        <ul className="navbar-nav-custom">
                            <li>
                                <Link className="navbar-brand-custom" to="/">
                                    <div className="logo-brand-wrapper">
                                        <img src="/vite.svg" alt="Logo" className="navbar-logo" />
                                        <strong className="navbar-title">MovieDb</strong>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link className={`nav-link-custom${location.pathname === '/movies' ? ' active' : ''}`} to="/movies">
                                    Movies
                                </Link>
                            </li>
                            <li>
                                <Link className={`nav-link-custom${location.pathname === '/tv-series' ? ' active' : ''}`} to="/tv-series">
                                    TVShows
                                </Link>
                            </li>
                            <li>
                                <Link className={`nav-link-custom${location.pathname === '/actors' ? ' active' : ''}`} to="/actors">
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
