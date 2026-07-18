import type { CollectionAnime } from "./fetchAllAnimes";

const CSV_COLUMNS = [
  "title",
  "rating",
  "episodeCount",
  "playlistID",
  "createdAt",
] as const;

type CsvColumn = (typeof CSV_COLUMNS)[number];

/** Escapes a single CSV field per RFC 4180. */
export const escapeCsvField = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

/** Builds a CSV string (header row + one row per anime) from a collection. */
export const animesToCsv = (animes: CollectionAnime[]): string => {
  const header = CSV_COLUMNS.join(",");
  const rows = animes.map((anime) =>
    CSV_COLUMNS.map((column: CsvColumn) => escapeCsvField(anime[column])).join(
      ","
    )
  );
  return [header, ...rows].join("\n");
};

/** Builds a pretty-printed JSON string of the collection. */
export const animesToJson = (animes: CollectionAnime[]): string =>
  JSON.stringify(animes, null, 2);

/** Triggers a browser download for the given content and revokes the object URL. */
export const downloadFile = (
  content: string,
  filename: string,
  mimeType: string
): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};
