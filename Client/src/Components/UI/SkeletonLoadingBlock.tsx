import styled, { Keyframes, css, keyframes } from "styled-components";

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

const SkeletonLoadingBlock = styled.div<SkeletonLoadingBlockProps>((props) => {
  const { width, height, borderRadius } = props;

  // get the dark and light colors from assets/css vars
  const darkColor = props.darkPulseStateColor
    ? props.darkPulseStateColor
    : "var(--grey-100)";

  const lightColor = props.lightPulseStateColor
    ? props.lightPulseStateColor
    : "var(--grey-50)";
  const pulseAnimation = createPulseAnimation(darkColor, lightColor);

  return css`
    width: ${typeof width === "number" ? `${width}px` : width};
    height: ${typeof height === "number" ? `${height}px` : height};
    background: linear-gradient(
      90deg,
      ${lightColor} 0%,
      rgba(212, 54, 124, 0.1) 50%,
      ${lightColor} 100%
    );
    background-size: 200% 100%;
    animation: ${pulseAnimation} 1s ease infinite,
      shimmer 2s ease-in-out infinite;
    animation-delay: 0.5s;
    border-radius: ${typeof borderRadius === "number"
      ? `${borderRadius}px`
      : borderRadius};
    border: 1px solid rgba(212, 54, 124, 0.1);
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.4),
        transparent
      );
      animation: shimmer 2s ease-in-out infinite;
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
  `;
});

export default SkeletonLoadingBlock;
