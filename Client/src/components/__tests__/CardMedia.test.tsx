import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CardMedia from "../AnimeCard/CardMedia";
import type { ExpectedFetchedAnimeResponse } from "../../utils/types";

vi.mock("react-player", () => ({
  default: () => <div data-testid="react-player" />,
}));

const POSTER = "https://media.kitsu.app/anime/poster_images/7442/medium.jpg";

const fetchedAnime = {
  attributes: { posterImage: { medium: POSTER, small: "small.jpg" } },
} as unknown as ExpectedFetchedAnimeResponse;

const baseProps = {
  isHovering: false,
  hasYoutubeVideoId: false,
  failedToLoadYoutube: false,
  onVideoError: () => {},
  title: "Attack on Titan",
};

describe("CardMedia", () => {
  // Anime listed from the Kitsu API have no saved coverImage. The mobile
  // branch used to read coverImage alone, so those cards rendered an <img>
  // with no src at all — a broken-image icon on every card.
  it("falls back to the fetched poster on mobile when there is no saved cover", () => {
    render(<CardMedia {...baseProps} onMobile fetchedAnime={fetchedAnime} />);
    expect(screen.getByAltText("Attack on Titan")).toHaveAttribute("src", POSTER);
  });

  it("falls back to the fetched poster on desktop when there is no saved cover", () => {
    render(<CardMedia {...baseProps} onMobile={false} fetchedAnime={fetchedAnime} />);
    expect(screen.getByAltText("Attack on Titan")).toHaveAttribute("src", POSTER);
  });

  it("prefers a saved cover image over the fetched poster", () => {
    const saved = "https://media.kitsu.app/anime/poster_images/1/medium.jpg";
    render(<CardMedia {...baseProps} onMobile coverImage={saved} fetchedAnime={fetchedAnime} />);
    expect(screen.getByAltText("Attack on Titan")).toHaveAttribute("src", saved);
  });
});
