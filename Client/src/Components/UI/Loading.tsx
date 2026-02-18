import { cn } from "../../utils/cn";

interface LoadingProps {
  center?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
}

const sizeMap = {
  small: "w-12 h-12",
  medium: "w-24 h-24",
  large: "w-32 h-32",
};

const Loading = ({
  center = true,
  size = "medium",
  className,
}: LoadingProps) => {
  return (
    <div
      className={cn(
        "rounded-full animate-spin relative",
        sizeMap[size],
        center && "mx-auto",
        className
      )}
      style={{
        border: "5px solid rgba(212, 54, 124, 0.2)",
        borderTopColor: "var(--primary-500)",
        borderRightColor: "var(--anime-pink)",
        borderBottomColor: "var(--primary-600)",
        borderLeftColor: "var(--anime-purple)",
        background: "conic-gradient(from 0deg, transparent 0deg, rgba(212, 54, 124, 0.1) 90deg, transparent 180deg)",
        animationDuration: "2s",
        boxShadow: "var(--glow-primary)",
      }}
    />
  );
};

export default Loading;
