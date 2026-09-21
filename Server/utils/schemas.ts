import { z } from "zod";

// Auth schemas
export const loginSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  password: z.string().min(1, "Please provide password"),
});

export const registerSchema = z
  .object({
    isDemo: z.boolean().optional(),
    name: z.string().min(3).max(20).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    language: z.enum(["en", "jp"]).optional(),
  })
  .refine(
    (data) => {
      if (data.isDemo) return true;
      return data.name && data.email && data.password;
    },
    { message: "Please provide name, email, and password" }
  );

export const googleSchema = z.object({
  credential: z.string().min(1, "Please provide Google credential"),
  language: z.enum(["en", "jp"]).optional(),
});

export const updateUserSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  name: z.string().min(3, "Name must be at least 3 characters").max(20),
});

// Anime schemas
export const createAnimeSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Please provide title"),
  playlistID: z.string().min(1, "Please provide playlist ID"),
  japanese_title: z.string().optional(),
  rating: z.number().optional(),
  format: z.string().optional(),
  episodeCount: z.number().nullable().optional(),
  synopsis: z.string().optional(),
  coverImage: z.string().optional(),
  youtubeVideoId: z.string().optional(),
  creationDate: z.string().optional(),
});

export const recommendationsSchema = z.object({
  title: z.string().min(1, "Anime title is required"),
  synopsis: z.string().optional(),
});

// Keep in sync with SORT_OPTIONS in animesController.ts
export const getAnimesQuerySchema = z.object({
  currentPlaylistID: z.string().min(1, "Please provide a playlist ID"),
  sort: z
    .enum(["latest", "oldest", "rating", "episodeCount", "format", "a-z", "z-a", "date added"])
    .optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type GetAnimesQuery = z.infer<typeof getAnimesQuerySchema>;

// Playlist schemas
export const createPlaylistSchema = z.object({
  title: z.string().min(1, "Please provide a title").max(50),
});

export const updatePlaylistSchema = z.object({
  title: z.string().min(1, "Please provide a title").max(50),
});
