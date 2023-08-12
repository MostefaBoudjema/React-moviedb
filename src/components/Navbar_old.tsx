import { Link } from 'react-router-dom';
export function Navbar() {
    return (
        <div className="bg-light py-2">
            <div className="container d-flex justify-content-center">
                <nav className="navbar navbar-expand navbar-light">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <Link to="/popular-movies" className="nav-link">
                                Movies
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tv-series" className="nav-link">
                                Series
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/actors" className="nav-link">
                                Actors
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
