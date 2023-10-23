import { useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";
import { DESKTOP, LARGE_DESKTOP, TABLET } from "./constants";
import { useNavigate } from "react-router-dom";

const useInViewAnimation = (threshold = 0.5) => {
  const controls = useAnimation();

  const [ref, inView] = useInView({ threshold });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return { controls, ref };
};

const useRedirectOnAuth = (
  user: any,
  redirectSuccessPath: string,
  redirectFailurePath: string
) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(redirectFailurePath);
      return;
    }

    if (user && window.location.pathname === "/") {
      navigate(redirectSuccessPath);
      return;
    }
  }, [user, navigate, redirectSuccessPath, redirectFailurePath]);
};

const useMobile = () => {
  return useMediaQuery({
    query: `(max-width: ${TABLET}px)`,
  });
};

const useTablet = () => {
  return useMediaQuery({
    query: `(min-width: ${TABLET}px) and (max-width: ${DESKTOP}px)`,
  });
};

const useDesktop = () => {
  return useMediaQuery({
    query: `(min-width: ${DESKTOP}px)`,
  });
};

const useLargeDesktop = () => {
  return useMediaQuery({
    query: `(min-width: ${LARGE_DESKTOP}px)`,
  });
};

export {
  useInViewAnimation,
  useRedirectOnAuth,
  useMobile,
  useTablet,
  useDesktop,
  useLargeDesktop,
};
