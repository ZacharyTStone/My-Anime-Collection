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
  border: ${BORDER_WIDTH} solid var(--grey-400);
  border-radius: 50%;
  border-top-color: var(--primary-500);
  animation: ${spin} ${SPIN_ANIMATION_DURATION} linear infinite;
  ${({ center }) => center && "margin: 0 auto;"}
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
