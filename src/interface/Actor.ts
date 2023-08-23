// Actor.ts
interface Actor {
    id: number;
    name: string;
    popularity: number;
    profile_path: string;
    known_for_department: string;
    known_for: {
        poster_path: string;
    }[];
}

export default Actor;
