import { useSyncExternalStore } from "react";
import { TABLET } from "../utils/constants";

const mobileQuery = `(max-width: ${TABLET}px)`;
const subscribe = (cb: () => void) => {
  const mql = window.matchMedia(mobileQuery);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
};
const getSnapshot = () => window.matchMedia(mobileQuery).matches;
const getServerSnapshot = () => false;

const useMobile = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export { useMobile };
