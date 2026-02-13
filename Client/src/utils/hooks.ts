import { useEffect, useState } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";
import { DESKTOP, LARGE_DESKTOP, TABLET } from "./constants";
import { useNavigate } from "react-router";

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

  const redirectOnUserState = () => {
    if (!user) {
      navigate(redirectFailurePath);
    }
  };

  const redirectOnSuccessfulLogin = () => {
    if (user && window.location.pathname === "/") {
      navigate(redirectSuccessPath);
    }
  };

  useEffect(() => {
    redirectOnUserState();
    redirectOnSuccessfulLogin();
  }, [user, navigate, redirectSuccessPath, redirectFailurePath]);
};

const useLoadingState = (isLoading: boolean) => {
  const [loading, setLoading] = useState(isLoading);

  const withLoading =
    (callback: Function) =>
    (...args: any[]) => {
      if (loading) return;
      setLoading(true);
      callback(...args);
      setLoading(false);
    };

  return { isLoading: loading, withLoading };
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
  useLoadingState,
};
