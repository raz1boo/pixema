import { useLocalStorage } from "usehooks-ts";

export const useFavorites = () => {
  const [favorites, setFavorites] = useLocalStorage<number[]>("favorites", []);

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favorite: number) => favorite !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return {
    favorites,
    toggleFavorite,
  };
};
