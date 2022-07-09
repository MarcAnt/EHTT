import "whatwg-fetch";
import "vi-fetch/setup";
import "@testing-library/jest-dom";
import { describe, expect, test, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import App from "@/App";

import EmployeeContext, {
  EmployeeContextProps,
} from "@/context/EmployeesContext";

import { Employee } from "@/interfaces";

const data: Employee[] = [
  {
    id: 1,
    name: "Alan Bello",
    category: "manager",
    "category-image": "manager.png",
    company: "Planet of the Grapes",
    "company-image": "grapes.png",
    levelOfHappiness: "30",
    happiness: "sad",
    isFavorite: false,
  },
  {
    id: 2,
    name: "Alejandro Danza",
    category: "manager",
    "category-image": "manager.png",
    company: "Lord of the Fries",
    "company-image": "fries.png",
    levelOfHappiness: "100",
    happiness: "happy",
    isFavorite: false,
  },
];

// const dataResponse = [
//   rest.get("http://localhost:5000/employees", (req, res, ctx) => {
//     return res(ctx.json([data]));
//   }),
// ];

// const server = setupServer(...dataResponse);

describe("App test", () => {
  // beforeAll(() => server.listen());
  // afterAll(() => server.close());
  // afterEach(() => server.resetHandlers());

  // const employeesData = transformedData(data)

  const initValues: EmployeeContextProps = {
    filteredEmployees: data,
    loading: false,
    error: false,
    getAllCategories: [],
    getAllCompanies: [],
    changeToFavorite: vi.fn(),
    addFavoriteEmployee: vi.fn(),
    removeFromFavorite: vi.fn(),
    favorites: [],
    setFilter: vi.fn(),
    filter: {
      type: [],
      value: "string",
    },
    filterFavorites: {
      type: [],
      value: "string",
    },
    setFilterFavorites: vi.fn(),
  };

  beforeEach(() => {
    render(
      <EmployeeContext.Provider value={initValues as EmployeeContextProps}>
        <App />
      </EmployeeContext.Provider>
    );
  });

  test("Employees cards should be rendered", () => {
    expect(screen.getByText("Alan Bello")).toBeInTheDocument();
  });

  test("Two cards should be rendered", () => {
    const { container } = render(
      <EmployeeContext.Provider value={initValues as EmployeeContextProps}>
        <App />
      </EmployeeContext.Provider>
    );

    const cards = container.getElementsByClassName("card-container");

    expect(cards.length).toBe(2);
  });

  test("Show only happy employee when click", async () => {
    const button = screen.getByTitle("Happy");

    fireEvent.click(button);

    expect(screen.getByText("Alejandro Danza")).toBeInTheDocument();
  });
});
