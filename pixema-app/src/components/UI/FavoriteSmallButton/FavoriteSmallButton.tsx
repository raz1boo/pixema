import { FiBookmark } from "react-icons/fi";
import { useFavorites } from "../../store/hooks/useFavorites";
import "./FavoriteSmallButton.scss";

interface IFavBtn {
  id: number;
}

const FavoriteSmallButton = ({ id }: IFavBtn) => {
  const { toggleFavorite } = useFavorites();
  return (
    <div
      className="favorite-small-button"
      onClick={() => toggleFavorite(Number(id))}
    >
      <FiBookmark />
    </div>
  );
};

export default FavoriteSmallButton;
