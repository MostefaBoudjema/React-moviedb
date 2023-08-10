// Movie.ts
interface SingleMovie {
    id: number;
    title: string;
    backdrop_path: string;
    poster_path: string;
    release_date: string;
    runtime: string;
    genres: string;
    tagline: string;
    production_countries: string;
    popularity: string;
    spoken_languages: string;
    vote_average: number;
    overview: string;
  }
export interface Country {
    id: number;
    iso_3166_1: string;
    name: string;
  }
  
  export default SingleMovie;
  