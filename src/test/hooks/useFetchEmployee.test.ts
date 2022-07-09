import "whatwg-fetch";
import { act, renderHook } from "@testing-library/react";

import useFetchEmployee from "@/hooks/useFetchEmployee";
import { Employee } from "@/interfaces";
import { transformedData } from "@/adapters";
// import App from "@/App";

const data: Employee[] = [
  {
    id: 1,
    name: "Alan Bello",
    category: "manager",
    "category-image": "manager.png",
    company: "Planet of the Grapes",
    "company-image": "grapes.png",
    levelOfHappiness: "30",
  },
  {
    id: 2,
    name: "Alejandro Danza",
    category: "manager",
    "category-image": "manager.png",
    company: "Lord of the Fries",
    "company-image": "fries.png",
    levelOfHappiness: "100",
  },
];

// const dataResponse = [
//   rest.get("http://localhost:5000/employees", (req, res, ctx) => {
//     return res(ctx.json(data));
//   }),
// ];

// const server = setupServer(...dataResponse);

describe("useFetchEmployee", () => {
  //   beforeAll(() => server.listen());
  //   afterAll(() => server.close());
  //   afterEach(() => server.resetHandlers());

  test("should return data Employee with a successful request", async () => {
    const { result } = renderHook(() =>
      useFetchEmployee("http://localhost:5000/employees")
    );

    const employeesData: Employee[] = await transformedData(data);

    await act(async () => {
      result.current.setEmployees(employeesData);
    });

    expect(result.current.employees.length).toBe(2);
  });
});
