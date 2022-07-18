import { Link } from "react-router-dom";
import { IMoviePerson } from "../../../../types/IMovie";
import './PersonTab.scss'

interface PersonTabProps {
  item: IMoviePerson;
}

const PersonTab = ({ item }: PersonTabProps) => {
  const { name, id, photo } = item;
  return (
    <Link to={`/person/${id}`} className="person">
      <div
        style={{ backgroundImage: `url(${photo})` }}
        className="person__photo"
      ></div>
      <div className="person__description">
        <h2>{name}</h2>
      </div>
    </Link>
  );
};

export default PersonTab;
