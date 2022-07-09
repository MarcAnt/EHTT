import "@testing-library/jest-dom";
import { describe, expect, test } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Header from "@/components/Header";
import Search from "@/components/Header";

describe("Header test", () => {
  beforeEach(() => {
    render(<Header />);
  });

  test("Search component should be rendred", () => {
    expect(<Search />).toBeDefined();
  });

  test("button should be rendred", () => {
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeDefined();
  });

  test("Modal should be rendered when click", async () => {
    const buttonElement = screen.getByRole("button");

    fireEvent.click(buttonElement);

    const modalText = await screen.findByText(
      "Search and remove from favorite list"
    );
    await waitFor(() => expect(modalText).toBeInTheDocument());
  });
});
