// Movie.ts
interface Movie {
    id: number;
    title: string;
    backdrop_path: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
  }
  export const initialMoviesState: Movie = {
    id: 0,
    title: '',
    backdrop_path: '',
    poster_path: '',
    release_date: '',
    vote_average: 0,
    overview: '',
  };
  export default Movie;
  