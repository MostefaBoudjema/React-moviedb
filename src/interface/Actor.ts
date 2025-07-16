// Actor.ts
interface Actor {
    id: number;
    name: string;
    popularity: number;
    profile_path: string;
    known_for_department: string;
    known_for: {
        id: number;
        poster_path: string;
        media_type: string; // 'movie' or 'tv'
        title?: string; // for movies
        name?: string; // for tv shows
    }[];
}

export default Actor;
