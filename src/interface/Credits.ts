import Cast, { initialCastState } from "./CastInterface";

interface Credits {
    cast: Cast[];

}
export const initialCreditsState: Credits = {
    cast: [initialCastState],
  };
export default Credits;
