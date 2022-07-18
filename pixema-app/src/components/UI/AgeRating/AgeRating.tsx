import { IMovie } from "../../types/IMovie";
import "./AgeRating.scss";

const AgeRating = ({ ageRating }: IMovie) => {
  return <div className="age-rating">{ageRating&&ageRating+'+'}</div>;
};

export default AgeRating;
