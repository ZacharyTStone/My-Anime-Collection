import { Skeleton } from "@/Components/UI/skeleton";

interface SkeletonLoadingBlockProps {
  width: string | number;
  height: string | number;
  borderRadius: string | number;
  className?: string;
}

const SkeletonLoadingBlock = ({
  width,
  height,
  borderRadius,
  className,
}: SkeletonLoadingBlockProps) => {
  return (
    <Skeleton
      className={className}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
        borderRadius:
          typeof borderRadius === "number" ? `${borderRadius}px` : borderRadius,
      }}
    />
  );
};

export default SkeletonLoadingBlock;
