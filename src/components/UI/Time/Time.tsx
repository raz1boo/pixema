import convertMinutesToHours from "../../helpers/convertMinutesToHours";
import { IMovie } from "../../types/IMovie";
import "./Time.scss";

const Time = ({ movieLength }: IMovie) => {
  return (
    <div className="time">
      {movieLength && convertMinutesToHours(movieLength)}
    </div>
  );
};

export default Time;
