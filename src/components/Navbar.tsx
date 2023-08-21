import { Link } from 'react-router-dom';

import { useState } from 'react';
export function Navbar() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    return (
        <div className="bg-light">
            <div className="container">
                <nav className="navbar navbar-expand-lg d-flex justify-content-between">
                    <div className=''></div>
                    <Link className="navbar-brand" to="/">
                        <img src="/vite.svg" alt="Logo" /><strong className="m-3 d-none d-lg-inline-block">MovieDb</strong>
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
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/movies">
                                    Movies
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/tv-series">
                                    TV Shows
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/actors">
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
