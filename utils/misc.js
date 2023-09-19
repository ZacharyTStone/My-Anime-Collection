import { dirname } from "path";
import { fileURLToPath } from "url";

export const getDirname = () => {
  return dirname(fileURLToPath(import.meta.url));
};
