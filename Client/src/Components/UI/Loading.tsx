import styled, { keyframes } from "styled-components";

// Types and Interfaces
interface LoadingProps {
  center?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
}

// Constants
const SPIN_ANIMATION_DURATION = "2s";
const BORDER_WIDTH = "5px";

// Animations
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Styled Components
const LoadingSpinner = styled.div<{ center: boolean; size: string }>`
  width: ${({ size }) => {
    switch (size) {
      case "small":
        return "3rem";
      case "large":
        return "8rem";
      default:
        return "6rem";
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case "small":
        return "3rem";
      case "large":
        return "8rem";
      default:
        return "6rem";
    }
  }};
  border: ${BORDER_WIDTH} solid rgba(212, 54, 124, 0.2);
  border-radius: 50%;
  border-top-color: var(--primary-500);
  border-right-color: var(--anime-pink);
  border-bottom-color: var(--primary-600);
  border-left-color: var(--anime-purple);
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    rgba(212, 54, 124, 0.1) 90deg,
    transparent 180deg
  );
  animation: ${spin} ${SPIN_ANIMATION_DURATION} linear infinite;
  box-shadow: var(--glow-primary);
  position: relative;
  ${({ center }) => center && "margin: 0 auto;"}
  
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: 60%;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(212, 54, 124, 0.1) 0%,
      transparent 70%
    );
    animation: ${spin} ${SPIN_ANIMATION_DURATION} linear infinite reverse;
  }
`;

/**
 * Loading component that displays a spinning loader
 */
const Loading: React.FC<LoadingProps> = ({
  center = true,
  size = "medium",
  className,
}) => {
  return <LoadingSpinner center={center} size={size} className={className} />;
};

export default Loading;
