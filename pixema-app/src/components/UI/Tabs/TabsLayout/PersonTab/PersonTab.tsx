import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../store/hooks/redux";
import { IMoviePerson } from "../../../../types/IMovie";
import "./PersonTab.scss";

interface PersonTabProps {
  item: IMoviePerson;
}

const PersonTab = ({ item }: PersonTabProps) => {
  const { name, id, photo, description } = item;
  const { theme } = useAppSelector((state) => state.themeReducer);
  return (
    <Link to={`/name/${id}`} className="person">
      <div
        style={{ backgroundImage: `url(${photo})` }}
        className="person__photo"
      ></div>
      <div className="person__description">
        <h2 style={{ color: theme === "light" ? "#242426" : "#fff" }}>
          {name}
        </h2>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default PersonTab;
