import React from 'react';

interface StarRatingProps {
  value: number; 
}

const StarRating: React.FC<StarRatingProps> = ({ value }) => {
  const maxStars = 5;
  const max = 10;
  const filledStars = Math.min(Math.max(value / max * maxStars, 0), maxStars); // Ensure value is between 0 and maxStars
  const fullStars = Math.floor(filledStars);
  const hasHalfStar = filledStars % 1 >= 0.5;

  return (
    <div className="star-rating">
      {[...Array(fullStars)].map((_, index) => (
        <span key={index} className="star filled">
          &#9733;
        </span>
      ))}
      {hasHalfStar && (
        <span className="star half-filled">
          &#9733;
        </span>
      )}
      {[...Array(maxStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <span key={index} className="star">
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
