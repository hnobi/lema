import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as router from "react-router";
import UsersTable from "@/components/UserTable";

vi.mock("react-router", async () => {
  const actual: typeof router = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("UsersTable", () => {
  const mockNavigate = vi.fn();
  const mockSetPage = vi.fn();

  beforeEach(() => {
    // (router.useNavigate as unknown as vi.Mock).mockReturnValue(mockNavigate);
    mockNavigate.mockReset();
    mockSetPage.mockReset();
  });

  const users = [
    { id: 2, name: "Charlie", email: "charlie@example.com", address: "Address 3" },
    { id: 1, name: "Alice", email: "alice@example.com", address: "Address 1" },
    { id: 3, name: "Bob", email: "bob@example.com", address: "Address 2" },
  ];

  it("renders users sorted alphabetically by name", () => {
    render(
      <MemoryRouter>
        <UsersTable users={users} page={1} setPage={mockSetPage} totalPages={3} />
      </MemoryRouter>
    );

    // Names should be sorted alphabetically
    const nameCells = screen.getAllByRole("cell").filter((cell) =>
      ["Alice", "Bob", "Charlie"].includes(cell.textContent || "")
    );

    expect(nameCells.map((cell) => cell.textContent)).toEqual(["Alice", "Bob", "Charlie"]);
  });

  it("navigates to user posts page when row is clicked", () => {
    render(
      <MemoryRouter>
        <UsersTable users={users} page={1} setPage={mockSetPage} totalPages={3} />
      </MemoryRouter>
    );

    const aliceRow = screen.getByText("Alice").closest("tr")!;
    fireEvent.click(aliceRow);

    expect(mockNavigate).toHaveBeenCalledWith("/users/1/posts");
  });

  it("calls setPage with the correct page number on pagination button click", () => {
    render(
      <MemoryRouter>
        <UsersTable users={users} page={1} setPage={mockSetPage} totalPages={3} />
      </MemoryRouter>
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    expect(mockSetPage).toHaveBeenCalledWith(2);

    const page3Button = screen.getByRole("button", { name: "3" });
    fireEvent.click(page3Button);

    expect(mockSetPage).toHaveBeenCalledWith(3);
  });

  it("disables previous button on first page and next button on last page", () => {
    const { rerender } = render(
      <MemoryRouter>
        <UsersTable users={users} page={1} setPage={mockSetPage} totalPages={3} />
      </MemoryRouter>
    );

    const prevButton = screen.getByRole("button", { name: /previous/i });
    const nextButton = screen.getByRole("button", { name: /next/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).not.toBeDisabled();

    rerender(
      <MemoryRouter>
        <UsersTable users={users} page={3} setPage={mockSetPage} totalPages={3} />
      </MemoryRouter>
    );

    expect(screen.getByRole("button", { name: /previous/i })).not.toBeDisabled();
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });
});
