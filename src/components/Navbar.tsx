import { Link } from 'react-router-dom';
// import RoutesList from '../routes/routes';
export function Navbar() {
    return (
        <div className="bg-light">
            <div className="container ">
                <nav className="navbar navbar-expand navbar-light">
                    <div className="container-fluid">
                        <div
                            className="collapse navbar-collapse"
                            id="navbarSupportedContent"
                        >
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/" className="nav-link">
                                        <img
                                            src="/logo192.png"
                                            width="40"
                                            height="60"
                                            className="img-fluid"
                                            alt="logo"
                                        />
                                        <strong className="m-3 d-none d-lg-inline-block">MovieDb</strong>
                                    </Link>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link
                                            to="/popular-movies"
                                            className="nav-link"
                                        >
                                            Movies
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to="/tv-series"
                                            className="nav-link"
                                        >
                                            Series
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/actors" className="nav-link">
                                            Actors
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}
