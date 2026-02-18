interface SkeletonLoadingBlockProps {
  width: string | number;
  height: string | number;
  borderRadius: string | number;
  className?: string;
  darkPulseStateColor?: string;
  lightPulseStateColor?: string;
}

const SkeletonLoadingBlock = ({
  width,
  height,
  borderRadius,
  className,
  darkPulseStateColor,
  lightPulseStateColor,
}: SkeletonLoadingBlockProps) => {
  const darkColor = darkPulseStateColor || "var(--grey-100)";
  const lightColor = lightPulseStateColor || "var(--grey-50)";

  return (
    <div
      className={`animate-[skeleton-pulse_1s_ease_infinite,skeleton-shimmer_2s_ease-in-out_infinite] relative overflow-hidden ${className || ""}`}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        borderRadius: typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
        background: `linear-gradient(90deg, ${lightColor} 0%, rgba(212, 54, 124, 0.1) 50%, ${lightColor} 100%)`,
        backgroundSize: "200% 100%",
        animationDelay: "0.5s",
        border: "1px solid rgba(212, 54, 124, 0.1)",
        ["--skeleton-dark" as string]: darkColor,
        ["--skeleton-light" as string]: lightColor,
      }}
    />
  );
};

export default SkeletonLoadingBlock;
