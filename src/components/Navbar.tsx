import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export function Navbar() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    const handleNavLinkClick = () => setIsNavCollapsed(true);
    const location = useLocation();

    const shouldApplyClass = location.pathname === '/';
    return (
        <div className={shouldApplyClass ? 'bg-movie' : ''}>
            <nav className="navbar-custom">
                <div className="navbar-container">
                    <div className="navbar-header-row">
                        <Link className="navbar-brand-custom" to="/">
                            <div className="logo-brand-wrapper">
                                <img src="/favicon.png" alt="Logo" className="navbar-logo" />
                                <strong className="navbar-title">Moviez</strong>
                            </div>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            aria-controls="navbarNav"
                            aria-expanded={!isNavCollapsed}
                            aria-label="Toggle navigation"
                            onClick={handleNavCollapse}
                        >
                            <span className="navbar-toggler-icon">&#9776;</span>
                        </button>
                    </div>
                    <div
                        className={`navbar-collapse-custom${isNavCollapsed ? '' : ' expanded'}`}
                        id="navbarNav"
                    >
                        <ul className="navbar-nav-custom">
                            <li className="nav-item-custom">
                                <Link className={`nav-link-custom${location.pathname === '/movies' ? ' active' : ''}`} to="/movies" onClick={handleNavLinkClick}>
                                    Movies
                                </Link>
                            </li>
                            <li className="nav-item-custom">
                                <Link className={`nav-link-custom${location.pathname === '/tv-series' ? ' active' : ''}`} to="/tv-series" onClick={handleNavLinkClick}>
                                    TVShows
                                </Link>
                            </li>
                            <li className="nav-item-custom">
                                <Link className={`nav-link-custom${location.pathname === '/actors' ? ' active' : ''}`} to="/actors" onClick={handleNavLinkClick}>
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
