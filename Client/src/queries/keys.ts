export const queryKeys = {
  playlists: ["playlists"] as const,
  animes: (playlistId: string, params: Record<string, string>) =>
    ["animes", playlistId, params] as const,
  animeStats: ["anime-stats"] as const,
  collection: ["collection"] as const,
  kitsu: (args: Record<string, unknown>) => ["kitsu", args] as const,
  aiRecommendations: (title: string) => ["ai-recommendations", title] as const,
};
