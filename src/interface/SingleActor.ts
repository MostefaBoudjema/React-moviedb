import Credits, { initialCreditsState } from "./Credits";

// Actor.ts
interface SingleActor {
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
    credits: Credits;
  }
  export const initialActorState: SingleActor = {
    id: 0,
    title: '',
    backdrop_path: '',
    poster_path: '',
    release_date: '',
    runtime: '',
    genres: '',
    tagline: '',
    production_countries: '',
    popularity: '',
    spoken_languages: '',
    vote_average: 0,
    overview: '',
    credits:initialCreditsState,
  };

export interface Country {
    id: number;
    iso_3166_1: string;
    name: string;
  }
  
  export default SingleActor;
  