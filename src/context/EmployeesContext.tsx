import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import useFetchEmployee from "@/hooks/useFetchEmployee";
import { Employee } from "@/interfaces";
import { SearchBy } from "@/types";
import { URL_EMPLOYEES } from "@/services";

interface EmployeeContextProps {
  filteredEmployees: Employee[];
  loading: boolean;
  error: boolean;

  getAllCategories: string[];
  getAllCompanies: string[];
  changeToFavorite: (id: number | string) => void;

  addFavoriteEmployee: (employee: Employee) => void;
  removeFromFavorite: (id: string | number) => void;
  favorites: Employee[];

  setFilter: React.Dispatch<
    React.SetStateAction<{
      type: SearchBy[];
      value: string;
    }>
  >;
  filter: { type: SearchBy[]; value: string };
  setFilterFavorites: React.Dispatch<
    React.SetStateAction<{
      type: SearchBy[];
      value: string;
    }>
  >;
  filterFavorites: { type: SearchBy[]; value: string };
}

interface PropsChildren {
  children: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[];
}

const EmployeeContext = createContext<EmployeeContextProps>(
  {} as EmployeeContextProps
);

export const EmployeeProvider = ({ children }: PropsChildren) => {
  const { employees, loading, error } = useFetchEmployee(URL_EMPLOYEES);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [filter, setFilter] = useState<{ type: SearchBy[]; value: string }>({
    type: [],
    value: "",
  });

  const [filterFavorites, setFilterFavorites] = useState<{
    type: SearchBy[];
    value: string;
  }>({
    type: [],
    value: "",
  });

  const [favorites, setFavorites] = useState<Employee[]>([]);

  useEffect(() => {
    setFilteredEmployees([...employees]);
  }, [employees]);

  const getAllCompanies = useMemo(() => {
    return filteredEmployees.map((employee) => employee.company);
  }, [filteredEmployees]);

  const getAllCategories = useMemo(() => {
    let category: string[] = [];
    filteredEmployees.forEach((employee) => {
      if (!category.includes(employee.category)) {
        category = [...category, employee.category];
      }
    });

    return category;
  }, [filteredEmployees]);

  const changeToFavorite = useCallback(
    (id: number | string) => {
      const findEmployee = filteredEmployees.map((filtered) => {
        if (filtered.id === id) {
          return { ...filtered, isFavorite: true };
        }
        return filtered;
      });

      setFilteredEmployees(findEmployee);
    },
    [filteredEmployees]
  );

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
      const index = filteredEmployees.findIndex(
        (filtered) => filtered.id === id
      );

      const mapped = filteredEmployees.map((employees) => {
        if (Number(employees.id) === index + 1) {
          return { ...employees, isFavorite: false };
        }
        return employees;
      });

      setFilteredEmployees([...mapped]);
      setFavorites(favorites.filter((favorite) => favorite.id !== id));
    },
    [favorites]
  );

  return (
    <EmployeeContext.Provider
      value={{
        filteredEmployees,
        changeToFavorite,
        getAllCompanies,
        getAllCategories,
        error,
        loading,
        setFilter,
        filter,
        addFavoriteEmployee,
        removeFromFavorite,
        favorites,
        filterFavorites,
        setFilterFavorites,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;
