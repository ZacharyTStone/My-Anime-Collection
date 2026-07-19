import type { KitsuStreamingLink } from "../queries/kitsu";

/** Streaming services the user can mark as "the ones I have". */
export const SERVICE_PRESETS = [
  "Crunchyroll",
  "Netflix",
  "Hulu",
  "HIDIVE",
  "Prime Video",
  "Disney+",
] as const;

const HOST_TO_SERVICE: Record<string, string> = {
  "crunchyroll.com": "Crunchyroll",
  "netflix.com": "Netflix",
  "hulu.com": "Hulu",
  "hidive.com": "HIDIVE",
  "amazon.com": "Prime Video",
  "primevideo.com": "Prime Video",
  "disneyplus.com": "Disney+",
};

/** Maps a streaming link URL to a human-readable service name. */
export const serviceNameFromUrl = (url: string): string => {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (HOST_TO_SERVICE[host]) return HOST_TO_SERVICE[host];
    const name = host.split(".")[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return url;
  }
};

/** True when any link belongs to one of the user's selected services. */
export const matchesServices = (
  links: KitsuStreamingLink[],
  selectedServices: string[]
): boolean =>
  links.some((link) =>
    selectedServices.includes(serviceNameFromUrl(link.url))
  );
