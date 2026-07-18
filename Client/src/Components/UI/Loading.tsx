import { cn } from "../../utils/cn";

interface LoadingProps {
  center?: boolean;
  size?: "small" | "medium" | "large";
  className?: string;
}

const sizeMap = {
  small: "size-12 border-4",
  medium: "size-24 border-[6px]",
  large: "size-32 border-8",
};

const Loading = ({
  center = true,
  size = "medium",
  className,
}: LoadingProps) => {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "animate-spin rounded-full border-primary-500/20 border-t-primary-500",
        sizeMap[size],
        center && "mx-auto",
        className
      )}
    />
  );
};

export default Loading;
