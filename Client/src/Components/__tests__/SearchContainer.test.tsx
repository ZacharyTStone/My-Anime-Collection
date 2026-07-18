import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchContainer from "../SearchContainer";
import { useAnimeStore } from "../../stores/animeStore";

// Mock i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "search_container.title": "Search",
        "search_container.search": "Search",
        "search_container.sort": "Sort",
        "search_container.clear_filters": "Clear Filters",
      };
      return translations[key] || key;
    },
  }),
}));

// Mock PlaylistSelector to avoid complex dependencies
vi.mock("../UI", async () => {
  const actual = await vi.importActual<Record<string, unknown>>("../UI");
  return {
    ...actual,
    PlaylistSelector: () => <div data-testid="playlist-selector" />,
  };
});

vi.mock("../../stores/hooks", () => ({
  useAnimeSelector: (selector: (s: ReturnType<typeof useAnimeStore.getState>) => unknown) =>
    selector(useAnimeStore.getState()),
  usePlaylistSelector: () => ({ loadingFetchPlaylists: false }),
}));

beforeEach(() => {
  useAnimeStore.setState({
    loadingMyAnimes: false,
    search: "",
    sort: "latest",
    sortOptions: [
      { title: "Latest", value: "latest" },
      { title: "Oldest", value: "oldest" },
    ],
  });
});

describe("SearchContainer", () => {
  it("renders the search input field", () => {
    render(<SearchContainer />);
    const searchInput = screen.getByRole("textbox");
    expect(searchInput).toBeInTheDocument();
  });

  it("renders the sort dropdown with the current value", () => {
    render(<SearchContainer />);
    const sortSelect = screen.getByRole("combobox");
    expect(sortSelect).toBeInTheDocument();
    expect(sortSelect).toHaveTextContent("Latest");
  });

  it("changes the sort value when an option is selected", async () => {
    const user = userEvent.setup();
    render(<SearchContainer />);

    await user.click(screen.getByRole("combobox"));
    await user.click(await screen.findByRole("option", { name: "Oldest" }));

    expect(useAnimeStore.getState().sort).toBe("oldest");
  });

  it("renders the clear filters button", () => {
    render(<SearchContainer />);
    const clearBtn = screen.getByRole("button", { name: /clear filters/i });
    expect(clearBtn).toBeInTheDocument();
  });

  it("updates local search value on input", async () => {
    const user = userEvent.setup();
    render(<SearchContainer />);

    const searchInput = screen.getByRole("textbox");
    await user.type(searchInput, "naruto");

    expect(searchInput).toHaveValue("naruto");
  });

  it("clears search input when clear filters is clicked", async () => {
    const user = userEvent.setup();
    render(<SearchContainer />);

    const searchInput = screen.getByRole("textbox");
    await user.type(searchInput, "test");
    expect(searchInput).toHaveValue("test");

    const clearBtn = screen.getByRole("button", { name: /clear filters/i });
    await user.click(clearBtn);

    expect(searchInput).toHaveValue("");
  });
});
