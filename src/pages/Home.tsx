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
    const [Actors, setActors] = useState<Actor[]>([]);

    const [bgImage1, setBgImage1] = useState('');
    const [bgImage2, setBgImage2] = useState('');
    const [bgImage3, setBgImage3] = useState('');

    const generateRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const moviesResponse = await axios.get(
                    `${API_URL}/movie/popular?api_key=${apiKey}`
                );
                setMovies(moviesResponse.data.results);

                setBgImage1(moviesResponse.data.results[generateRandomNumber(0, 2)].backdrop_path);
                setBgImage2(moviesResponse.data.results[generateRandomNumber(3, 5)].backdrop_path);
                setBgImage3(moviesResponse.data.results[generateRandomNumber(6, 8)].backdrop_path);
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
        <>
            <div
                className="header_section mask1"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${bgImage1})`,
                }}
            >
                <Navbar />
                {/* <!-- banner section start --> */}
                <div className="banner_section layout_padding">
                    <div className="logo">
                        <a href="index.html">
                            <img src="/images/logo.png" />
                        </a>
                        <div
                            id="carouselExampleSlidesOnly"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="container">
                                        <h1 className="banner_taital">
                                            Adventure
                                        </h1>
                                        <p className="banner_text">
                                            There are many variations of
                                            passages of Lorem Ipsum available,
                                            but the majority have sufferedThere
                                            are ma available, but the majority
                                            have suffered
                                        </p>
                                        <div className="read_bt">
                                            <a href="#">Get A Quote</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="container">
                                        <h1 className="banner_taital">
                                            Adventure
                                        </h1>
                                        <p className="banner_text">
                                            There are many variations of
                                            passages of Lorem Ipsum available,
                                            but the majority have sufferedThere
                                            are ma available, but the majority
                                            have suffered
                                        </p>
                                        <div className="read_bt">
                                            <a href="#">Get A Quote</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="container">
                                        <h1 className="banner_taital">
                                            Adventure
                                        </h1>
                                        <p className="banner_text">
                                            There are many variations of
                                            passages of Lorem Ipsum available,
                                            but the majority have sufferedThere
                                            are ma available, but the majority
                                            have suffered
                                        </p>
                                        <div className="read_bt">
                                            <a href="#">Get A Quote</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- banner section end --> */}
            </div>
            {/* <!-- header section end -->
      <!-- services section start --> */}
            <div className="services_section layout_padding">
                <div className="container">
                    <h1 className="services_taital">Services </h1>
                    <p className="services_text">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration
                    </p>
                    <div className="services_section_2">
                        <div className="row">
                            <div className="col-md-4">
                                <Link to="/popular-movies">
                                    <div>
                                        {movies.length > 0 && (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movies[generateRandomNumber(0, 19)].poster_path}`}
                                            />
                                        )}
                                    </div>
                                    <div className="btn_main">
                                        <Link
                                            to="/popular-movies"
                                            className="btn_main"
                                        >
                                            Movies
                                        </Link>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to="/tv-series">
                                    <div>
                                        {tvShows.length > 0 && (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${tvShows[generateRandomNumber(0, 19)].poster_path}`}
                                            />
                                        )}
                                    </div>
                                    <div className="btn_main active">
                                        <Link
                                            to="/tv-series"
                                            className="btn_main"
                                        >
                                            TV Shows
                                        </Link>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-4">
                                <Link to="/actors">
                                    <div>
                                        {Actors.length > 0 && (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${Actors[generateRandomNumber(0, 19)].profile_path}`}
                                            />
                                        )}
                                    </div>
                                    <div className="btn_main">
                                        <Link to="/actors" className="btn_main">
                                            Actors
                                        </Link>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- services section end -->
      <!-- about section start --> */}
            <div className="about_section layout_padding">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="about_taital_main2 px-4">
                                <h1 className="about_taital">About Us</h1>
                                <p className="about_text">
                                    Our core objective is to provide a dynamic and
                                    immersive React JS application that serves
                                    as a comprehensive platform for users to
                                    explore and engage with the latest trends in
                                    movies, TV series, and actors. Through
                                    integration with an external API, the
                                    website aims to present up-to-date
                                    information on the most popular and trending
                                    content, offering users an interactive and
                                    visually appealing experience. By showcasing
                                    a curated selection of films, series, and
                                    talent profiles, the website seeks to cater
                                    to a diverse audience of entertainment
                                    enthusiasts, empowering them to discover,
                                    learn about, and connect with the dynamic
                                    world of cinema and television.{' '}
                                </p>
                                {/* <div className="readmore_bt">
                                    <a href="#">Read More</a>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-md-6 padding_right_0">
                            <div>
                                {/* <img
                                    src="/images/about-img.png"
                                    className="about_img"
                                /> */}
                                {movies.length > 0 && (
                                    <img
                                        src={`https://image.tmdb.org/t/p/original/${movies[generateRandomNumber(0, 19)].backdrop_path}`}
                                        className="about_img"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- about section end -->
      <!-- blog section start --> */}
            <div
                className="blog_section layout_padding mask2"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${bgImage2})`,
                }}
            >
                <div className="container">
                    <h1 className="blog_taital">See Our Movies</h1>
                    <p className="blog_text">
                        many variations of passages of Lorem Ipsum available,
                        but the majority have suffered alteration in some form,
                        by injected humour, or randomised words which
                    </p>
                    <div className="play_icon_main">
                        {/* <div className="play_icon">
                            <a href="#">
                                <img src="/images/play-icon.png" />
                            </a>
                        </div> */}
                    </div>
                </div>
            </div>
            {/* <!-- blog section end -->
      <!-- client section start --> */}
            <div className="client_section layout_padding">
                <div className="container">
                    <h1 className="client_taital">Testimonial</h1>
                    <div className="client_section_2">
                        <div
                            id="carouselExampleIndicators"
                            className="carousel slide"
                            data-ride="carousel"
                        >
                            <ol className="carousel-indicators">
                                <li
                                    data-target="#carouselExampleIndicators"
                                    data-slide-to="0"
                                    className="active"
                                ></li>
                                <li
                                    data-target="#carouselExampleIndicators"
                                    data-slide-to="1"
                                ></li>
                                <li
                                    data-target="#carouselExampleIndicators"
                                    data-slide-to="2"
                                ></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <div className="client_main">
                                        <div className="box_left">
                                            <p className="lorem_text">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit, sed
                                                do eiusmod tempor incididunt ut
                                                labore et dolore magna aliqua.
                                                Ut enim ad minim veniam, quis
                                                nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea
                                                commodo consequat. Duis aute
                                                irure dolor in reprehenderit in
                                                voluptate velit esse cillum
                                                dolore eu fugia
                                            </p>
                                        </div>
                                        <div className="box_right">
                                            <div className="client_taital_left">
                                                <div className="client_img">
                                                    <img src="/images/client-img.png" />
                                                </div>
                                                <div className="quick_icon">
                                                    <img src="/images/quick-icon.png" />
                                                </div>
                                            </div>
                                            <div className="client_taital_right">
                                                <h4 className="client_name">
                                                    Dame
                                                </h4>
                                                <p className="customer_text">
                                                    Customer
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="client_main">
                                        <div className="box_left">
                                            <p className="lorem_text">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit, sed
                                                do eiusmod tempor incididunt ut
                                                labore et dolore magna aliqua.
                                                Ut enim ad minim veniam, quis
                                                nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea
                                                commodo consequat. Duis aute
                                                irure dolor in reprehenderit in
                                                voluptate velit esse cillum
                                                dolore eu fugia
                                            </p>
                                        </div>
                                        <div className="box_right">
                                            <div className="client_taital_left">
                                                <div className="client_img">
                                                    <img src="/images/client-img.png" />
                                                </div>
                                                <div className="quick_icon">
                                                    <img src="/images/quick-icon.png" />
                                                </div>
                                            </div>
                                            <div className="client_taital_right">
                                                <h4 className="client_name">
                                                    Dame
                                                </h4>
                                                <p className="customer_text">
                                                    Customer
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="carousel-item">
                                    <div className="client_main">
                                        <div className="box_left">
                                            <p className="lorem_text">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipiscing elit, sed
                                                do eiusmod tempor incididunt ut
                                                labore et dolore magna aliqua.
                                                Ut enim ad minim veniam, quis
                                                nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea
                                                commodo consequat. Duis aute
                                                irure dolor in reprehenderit in
                                                voluptate velit esse cillum
                                                dolore eu fugia
                                            </p>
                                        </div>
                                        <div className="box_right">
                                            <div className="client_taital_left">
                                                <div className="client_img">
                                                    <img src="/images/client-img.png" />
                                                </div>
                                                <div className="quick_icon">
                                                    <img src="/images/quick-icon.png" />
                                                </div>
                                            </div>
                                            <div className="client_taital_right">
                                                <h4 className="client_name">
                                                    Dame
                                                </h4>
                                                <p className="customer_text">
                                                    Customer
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- client section start -->
      <!-- choose section start --> */}
            <div className="choose_section layout_padding">
                <div className="container">
                    <h1 className="choose_taital">Why Choose Us</h1>
                    <p className="choose_text">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in
                        some form, by injected humour, or randomised words which
                        don't look even slightly believable. If you are going to
                        use a passage of Lorem Ipsum, you need to be sure there
                        isn't anything embarrassing hidden in the middle of
                        text. All{' '}
                    </p>
                    <div className="read_bt_1">
                        <a href="#">Read More</a>
                    </div>
                    <div className="newsletter_box">
                        <h1 className="let_text">Let Start Talk with Us</h1>
                        <div className="getquote_bt">
                            <a href="#">Get A Quote</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- choose section end -->
      <!-- footer section start --> */}
            <div
                className="footer_section layout_padding mask3"
                style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original/${bgImage3})`,
                    }}
            >
                <div className="container">
                    <div className="input_btn_main">
                        <input
                            type="text"
                            className="mail_text"
                            placeholder="Enter your email"
                            name="Enter your email"
                        />
                        <div className="subscribe_bt">
                            <a href="#">Subscribe</a>
                        </div>
                    </div>
                    <div className="location_main">
                        <div className="call_text">
                            <img src="/images/call-icon.png" />
                        </div>
                        <div className="call_text">
                            <a href="#">Call +01 1234567890</a>
                        </div>
                        <div className="call_text">
                            <img src="/images/mail-icon.png" />
                        </div>
                        <div className="call_text">
                            <a href="#">demo@gmail.com</a>
                        </div>
                    </div>
                    <div className="social_icon">
                        <ul>
                            <li>
                                <a href="#">
                                    <img src="/images/fb-icon.png" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="/images/twitter-icon.png" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="/images/linkedin-icon.png" />
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <img src="/images/instagram-icon.png" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
