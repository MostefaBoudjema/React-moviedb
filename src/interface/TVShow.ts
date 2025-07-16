// TVShow.ts
interface TVShow {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    overview: string;
    first_air_date: string;
  }
  
  export default TVShow;

  export const initialTVShowState: TVShow = {
    id: 0,
    name: '',
    poster_path: '',
    backdrop_path: '',
    vote_average: 0,
    overview: '',
    first_air_date: '',
  };
  