import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Search from "@/components/Search";

describe("Search test", () => {
  beforeEach(() => {
    render(
      <Search
        placeholder="Search"
        label="Name, category o company"
        queryBy={["name", "category", "company"]}
        filterState={() => ({ type: ["name"], value: "" })}
        setIsSearching={() => true}
      />
    );
  });

  test("Search should contain placeholder prop", () => {
    const placeholder = screen.getByPlaceholderText(/Search/i);
    const label = screen.getByText(/Name, category o company/i);
    expect(placeholder).toBeDefined();
    expect(label).toBeDefined();
  });

  test("Search input should change", () => {
    const searchInput: HTMLInputElement =
      screen.getByPlaceholderText(/Search/i);
    const testValue = "test";
    fireEvent.change(searchInput, { target: { value: testValue } });
    expect(searchInput.value).toBe(testValue);
  });
});
