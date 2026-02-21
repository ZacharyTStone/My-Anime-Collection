import { useEffect, useSyncExternalStore, type RefObject } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TABLET } from "./constants";

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  onClose: () => void,
) => {
  useEffect(() => {
    if (!active) return;
    const handleClick = (e: globalThis.MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, active, onClose]);
};

const useInViewAnimation = (threshold = 0.5) => {
  const controls = useAnimation();

  const [ref, inView] = useInView({ threshold });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return { controls, ref };
};

const mobileQuery = `(max-width: ${TABLET}px)`;
const subscribe = (cb: () => void) => {
  const mql = window.matchMedia(mobileQuery);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
};
const getSnapshot = () => window.matchMedia(mobileQuery).matches;
const getServerSnapshot = () => false;

const useMobile = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export {
  useClickOutside,
  useInViewAnimation,
  useMobile,
};
