import {
  createContext,
  useState,
  useCallback,
  Dispatch,
  useEffect,
} from "react";
import { Employee } from "@/interfaces";
import { SearchBy } from "@/types";

interface FavoriteContextProps {
  addFavoriteEmployee: (employee: Employee) => void;
  removeFromFavorite: (id: string | number) => void;
  favorites: Employee[];
  setFavorites: Dispatch<React.SetStateAction<Employee[]>>;
  filterFavoritesBy: (term: string, searchBy: SearchBy[]) => void;
}

interface PropsChildren {
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
}

const FavoriteContext = createContext<FavoriteContextProps>(
  {} as FavoriteContextProps
);

export const FavoriteProvider = ({ children }: PropsChildren) => {
  const [favorites, setFavorites] = useState<Employee[]>([]);
  const [selecteds, setSelecteds] = useState<Employee[]>([]);

  useEffect(() => {
    setSelecteds(favorites);
  }, [favorites]);

  const addFavoriteEmployee = useCallback(
    (employee: Employee): void => {
      const isFavoriteEmployee = { ...employee, isFavorite: true };

      const index = favorites.findIndex(
        (favorite) => favorite.id === employee.id
      );

      if (index === -1) setFavorites([...favorites, isFavoriteEmployee]);
    },
    [favorites]
  );

  const removeFromFavorite = useCallback(
    (id: string | number) => {
      setFavorites(favorites.filter((favorite) => favorite.id !== id));
    },
    [favorites]
  );

  const filterBy = (term: string, searchBy: SearchBy[]) => {
    const s = favorites.filter((favorite) => {
      //if any term matches, return true and fill the filtered array
      return searchBy.some((key) => {
        const searchObj = {
          name: favorite.name,
          category: favorite.category,
          company: favorite.company,
          happiness: favorite.happiness,
        };

        if (key === "happiness") return searchObj[key] === term;

        return searchObj[key].toLowerCase().includes(term.toLowerCase());
      });
    });

    setSelecteds(s);
  };

  return (
    <FavoriteContext.Provider
      value={{
        addFavoriteEmployee,
        removeFromFavorite,
        favorites: selecteds,
        setFavorites,
        filterFavoritesBy: filterBy,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContext;
