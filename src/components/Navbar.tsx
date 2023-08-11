import { Link } from 'react-router-dom';
// import RoutesList from '../routes/routes';
export function Navbar() {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
        <ul className="navbar-nav mx-auto">
        {/* <ul className="navbar-nav mr-auto"> */}
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
    );
}
