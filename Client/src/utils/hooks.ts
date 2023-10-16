import { useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";
import { DESKTOP, LARGE_DESKTOP, TABLET } from "./constants";

const useInViewAnimation = (threshold = 0.5) => {
  const controls = useAnimation();

  const [ref, inView] = useInView({ threshold });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return { controls, ref };
};

export const useMobile = () => {
  return useMediaQuery({
    query: `(max-width: ${TABLET}px)`,
  });
};

export const useTablet = () => {
  return useMediaQuery({
    query: `(min-width: ${TABLET}px) and (max-width: ${DESKTOP}px)`,
  });
};

export const useDesktop = () => {
  return useMediaQuery({
    query: `(min-width: ${DESKTOP}px)`,
  });
};

export const useLargeDesktop = () => {
  return useMediaQuery({
    query: `(min-width: ${LARGE_DESKTOP}px)`,
  });
};

export { useInViewAnimation };
