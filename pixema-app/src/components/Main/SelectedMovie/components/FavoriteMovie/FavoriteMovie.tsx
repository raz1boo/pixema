import { FiBookmark, FiCheck } from "react-icons/fi";
import { useFavorites } from "../../../../store/hooks/useFavorites";
import { MovieFavoriteProps } from "../../../../types/IFavorites";
import ButtonBase from "../../../../UI/ButtonBase/ButtonBase";
import cn from "classnames";

const MovieFavorite = ({ id, isFavorite, title }: MovieFavoriteProps) => {
  const { toggleFavorite } = useFavorites();

  return (
    <ButtonBase
      ripple
      onClick={() => toggleFavorite(Number(id))}
      startIcon={isFavorite ? <FiCheck /> : <FiBookmark />}
      className={cn("favorite-button", isFavorite && "active")}
    >
      {title&&'Буду смотреть'}
    </ButtonBase>
  );
};

export default MovieFavorite;
