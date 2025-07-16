// Actor.ts
interface Cast {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string;
    poster_path?: string;
    media_type?: string;
}
export const initialCastState: Cast = {
    cast_id: 0,
    character: '',
    credit_id: '',
    gender: 0,
    id: 0,
    known_for_department: '',
    name: '',
    order: 0,
    original_name: '',
    popularity: 0,
    profile_path: '',
    poster_path: '',
    media_type: '',
  };
export default Cast;
