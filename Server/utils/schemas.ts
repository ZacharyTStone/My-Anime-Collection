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
    theme: z.enum(["light", "dark"]).optional(),
    language: z.enum(["en", "jp"]).optional(),
  })
  .refine(
    (data) => {
      if (data.isDemo) return true;
      return data.name && data.email && data.password;
    },
    { message: "Please provide name, email, and password" }
  );

export const updateUserSchema = z.object({
  email: z.string().email("Please provide a valid email"),
  name: z.string().min(3, "Name must be at least 3 characters").max(20),
  theme: z.enum(["light", "dark"]),
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

// Playlist schemas
export const updatePlaylistSchema = z.object({
  title: z.string().min(1, "Please provide a title").max(50),
});
