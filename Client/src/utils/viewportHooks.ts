import { useMediaQuery } from "react-responsive";
import { DESKTOP, LARGE_DESKTOP, TABLET } from "./constants";

// hooks

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
