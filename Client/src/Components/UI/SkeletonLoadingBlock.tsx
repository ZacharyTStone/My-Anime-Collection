import styled, { keyframes, css, Keyframes } from "styled-components";

interface SkeletonLoadingBlockProps {
  width: string | number;
  height: string | number;
  borderRadius: string | number;
  // overrides
  darkPulseStateColor?: string;
  lightPulseStateColor?: string;
}

const createPulseAnimation = (
  darkColor: string,
  lightColor: string
): Keyframes =>
  keyframes`
    0% {
      background-color: ${lightColor};
    }
    50% {
      background-color: ${darkColor};
    }
    100% {
      background-color: ${lightColor};
    }
  `;

export const SkeletonLoadingBlock = styled.div<SkeletonLoadingBlockProps>(
  (props) => {
    const { width, height, borderRadius } = props;

    // get the dark and light colors from assets/css vars
    const darkColor = props.darkPulseStateColor
      ? props.darkPulseStateColor
      : "var(--primary-700)";

    const lightColor = props.lightPulseStateColor
      ? props.lightPulseStateColor
      : "var(--primary-500";
    const pulseAnimation = createPulseAnimation(darkColor, lightColor);

    return css`
      width: ${typeof width === "number" ? `${width}px` : width};
      height: ${typeof height === "number" ? `${height}px` : height};
      background-color: ${lightColor};
      animation: ${pulseAnimation} 1s ease infinite;
      animation-delay: 0.5s;

      border-radius: ${typeof borderRadius === "number"
        ? `${borderRadius}px`
        : borderRadius};
    `;
  }
);