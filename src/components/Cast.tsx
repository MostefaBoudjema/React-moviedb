import CastInterface from '../interface/CastInterface';
import { Link } from 'react-router-dom';
import fallbackImg from '../assets/loading.gif';

interface HeaderTitleProps {
    castMember: CastInterface[];
}
export const Cast: React.FC<HeaderTitleProps> = ({ castMember }) => {
    return (
        <>
            <span className="fw-bold m-3 ">Cast</span>
            <div className="text-center mb-4 py-4 cast-dark-bg">
                <ul className="d-flex list-unstyled mt-auto">
                    {castMember.map((member, index) => (
                        <li
                            key={index}
                            className="d-flex flex-column align-items-center me-3"
                        >
                            <Link to={`/actors/${member.id}`} className="text-decoration-none">
                                <img
                                    src={member.profile_path ? `https://image.tmdb.org/t/p/w500${member.profile_path}` : fallbackImg}
                                    alt={member.character}
                                    width="70px"
                                    className="rounded border border-white mb-2"
                                />
                                <p className='my-1'>{member.character}</p>
                                <strong>{member.original_name}</strong>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};
