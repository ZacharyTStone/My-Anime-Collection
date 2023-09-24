import { useMediaQuery } from "react-responsive";

export const SMALL_MOBILE = 320;
export const MEDIUM_MOBILE = 375;
export const LARGE_MOBILE = 425;
export const TABLET = 768;
export const DESKTOP = 1024;
export const LARGE_DESKTOP = 1440;
export const EXTRA_LARGE_DESKTOP = 2560;

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
