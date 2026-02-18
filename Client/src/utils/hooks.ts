import { useEffect, useSyncExternalStore } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TABLET } from "./constants";

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
  useInViewAnimation,
  useMobile,
};
