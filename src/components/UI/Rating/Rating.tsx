import cn from "classnames";
import { IMovie } from "../../types/IMovie";
import "./Rating.scss";

const Rating = ({ rating }: IMovie) => {
  const rate = `${rating?.kp}`.split("");
  return (
    <div
      className={cn(
        "rating",
        rating?.kp &&
          ((rating?.kp >= 7 && "rating__green") ||
            (rating?.kp <= 5 && "rating__red"))
      )}
    >
      {rating?.kp && rate[0] + (rate[1] || '.') + (rate[2] || '0')}
    </div>
  );
};

export default Rating;
