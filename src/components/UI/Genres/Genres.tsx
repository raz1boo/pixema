import { IMovie } from "../../types/IMovie";
import "./Genres.scss";

const Genres = ({ genres }: IMovie) => {
  return (
    <div className="genres">
      {genres?.map((item) => (
        <p key={item.name}>{item.name.charAt(0).toUpperCase()+item.name.slice(1)}</p>
      ))}
    </div>
  );
};

export default Genres;
