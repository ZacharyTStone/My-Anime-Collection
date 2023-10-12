import { useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const useInViewAnimation = (threshold = 0.5) => {
  const controls = useAnimation();

  const [ref, inView] = useInView({ threshold });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return { controls, ref };
};

export { useInViewAnimation };
