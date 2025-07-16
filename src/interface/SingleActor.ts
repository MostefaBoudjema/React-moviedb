import Credits, { initialCreditsState } from "./Credits";

// Actor.ts
interface SingleActor {
    id: number;
    name: string;
    profile_path: string;
    biography: string;
    birthday: string;
    place_of_birth: string;
    known_for_department: string;
    popularity: number;
    gender: number;
    deathday?: string;
    credits: Credits;
}
export const initialActorState: SingleActor = {
    id: 0,
    name: '',
    profile_path: '',
    biography: '',
    birthday: '',
    place_of_birth: '',
    known_for_department: '',
    popularity: 0,
    gender: 0,
    credits: initialCreditsState,
};

export interface Country {
    id: number;
    iso_3166_1: string;
    name: string;
  }
  
  export default SingleActor;
  