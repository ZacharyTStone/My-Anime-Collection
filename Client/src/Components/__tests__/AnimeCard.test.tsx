import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Anime from "../UI/AnimeCard/AnimeCard";
import type { SavedAnime, ExpectedFetchedAnimeResponse } from "../../utils/types";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "anime.episode": "eps",
        "anime.add": "Add",
        "anime.delete": "Delete",
        "anime.showSynopsis": "Show Synopsis",
        "anime.ai_suggestions": "AI Suggestions",
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock("react-player", () => ({
  default: () => <div data-testid="react-player" />,
}));

const mockCreateAnime = vi.fn();
const mockDeleteAnime = vi.fn();

vi.mock("../../stores/hooks", () => ({
  useAnimeSelector: () => ({
    createAnime: mockCreateAnime,
    deleteAnime: mockDeleteAnime,
    isItemLoading: () => false,
  }),
  usePlaylistSelector: () => ({
    currentPlaylist: { id: "playlist-1", title: "My List", userId: "u1", createdAt: "", updatedAt: "" },
  }),
  useLanguageSelector: () => "en",
  useAiSelector: () => ({
    getRecommendations: vi.fn(),
  }),
}));

vi.mock("../../utils/hooks", () => ({
  useMobile: () => false,
}));

const defaultFetchedAnime: ExpectedFetchedAnimeResponse = {
  id: "fetched-1",
  attributes: {
    titles: { en: "Test Anime" },
    averageRating: 85,
    subtype: "TV",
    episodeCount: 12,
    posterImage: { medium: "https://img.com/med.jpg", small: "https://img.com/sm.jpg" },
  },
};

const defaultProps: SavedAnime & { fetchedAnime: ExpectedFetchedAnimeResponse; type: "add" | "delete" } = {
  _id: "anime-1",
  title: "My Test Anime",
  rating: 90,
  episodeCount: 24,
  format: "TV",
  creationDate: "2023-01-15",
  synopsis: "A great anime about testing.",
  coverImage: "https://img.com/cover.jpg",
  japanese_title: "テストアニメ",
  youtubeVideoId: "abc123",
  fetchedAnime: defaultFetchedAnime,
  type: "add",
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("AnimeCard", () => {
  it("renders the anime title", () => {
    render(<Anime {...defaultProps} />);
    expect(screen.getByText("My Test Anime")).toBeInTheDocument();
  });

  it("renders the rating", () => {
    render(<Anime {...defaultProps} />);
    expect(screen.getByText("90")).toBeInTheDocument();
  });

  it("renders the format info", () => {
    render(<Anime {...defaultProps} />);
    expect(screen.getByText("TV")).toBeInTheDocument();
  });

  it("renders episode count", () => {
    render(<Anime {...defaultProps} />);
    expect(screen.getByText("24")).toBeInTheDocument();
  });

  it("shows Add button when type is add", () => {
    render(<Anime {...defaultProps} type="add" />);
    const addBtn = screen.getByRole("button", { name: /add/i });
    expect(addBtn).toBeInTheDocument();
  });

  it("shows Delete button when type is delete", () => {
    render(<Anime {...defaultProps} type="delete" />);
    const deleteBtn = screen.getByRole("button", { name: /delete/i });
    expect(deleteBtn).toBeInTheDocument();
  });

  it("renders cover image", () => {
    render(<Anime {...defaultProps} />);
    const img = screen.getByAltText("My Test Anime");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://img.com/cover.jpg");
  });

  it("renders year from creationDate", () => {
    render(<Anime {...defaultProps} />);
    expect(screen.getByText("2023")).toBeInTheDocument();
  });
});
