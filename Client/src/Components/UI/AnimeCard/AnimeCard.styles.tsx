import type React from "react";
import { cn } from "../../../utils/cn";

// Wrapper - article container for the anime card
export const Wrapper = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <article
    className={cn(
      "anime-card-wrapper",
      "flex flex-col justify-center items-center",
      "max-[1000px]:flex-row",
      className
    )}
    {...props}
  >
    {children}
  </article>
);

// ImageDiv - container for card image with dynamic min-height
export const ImageDiv = ({ $onMobile, className, style, ...props }: React.HTMLAttributes<HTMLDivElement> & { $onMobile?: boolean }) => (
  <div
    className={cn("flex justify-center items-center", className)}
    style={{
      minHeight: $onMobile ? "auto" : "378px",
      ...style,
    }}
    {...props}
  />
);

// Modal - fixed overlay for synopsis
export const Modal = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "fixed inset-0 flex items-center justify-center z-[9999]",
      "bg-black/50 backdrop-blur-[4px]",
      className
    )}
    {...props}
  />
);

// ModalContent - content container inside modal
export const ModalContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "p-8 rounded-[calc(var(--borderRadius)*1.5)] max-w-[80%] max-h-[80%] overflow-y-auto relative overflow-hidden",
      "border-2 border-[var(--primary-alpha-30)]",
      "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-[var(--gradient-primary)]",
      "[&_h5]:text-[1.5rem] [&_h5]:mb-6 [&_h5]:font-semibold [&_h5]:border-b-2 [&_h5]:border-[var(--primary-alpha-20)] [&_h5]:pb-3",
      "[&_h5]:bg-[var(--gradient-primary)] [&_h5]:bg-clip-text [&_h5]:[-webkit-background-clip:text] [&_h5]:[-webkit-text-fill-color:transparent]",
      "[&_p]:text-base [&_p]:leading-[1.6] [&_p]:text-grey-700",
      className
    )}
    style={{
      background: "linear-gradient(135deg, var(--white) 0%, var(--primary-50) 100%)",
      boxShadow: "var(--shadow-anime-lg)",
    }}
    {...props}
  >
    {children}
  </div>
);

// ShimmerIcon - animated gradient icon wrapper
export const ShimmerIcon = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "inline-flex items-center justify-center bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]",
      "animate-[anime-shimmer_2s_linear_infinite]",
      "[&_svg]:animate-[aiGlow_2s_ease-in-out_infinite,jiggle_3s_ease-in-out_infinite]",
      className
    )}
    style={{
      background: "linear-gradient(90deg, var(--anime-purple) 0%, var(--anime-pink) 20%, var(--anime-blue) 40%, var(--anime-pink) 60%, var(--anime-purple) 80%, var(--anime-blue) 100%)",
      backgroundSize: "300% auto",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
    {...props}
  />
);

// AI Modal components
export const AiModalOverlay = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "fixed inset-0 flex items-center justify-center z-[9999]",
      "bg-[rgba(15,20,35,0.6)] backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)]",
      className
    )}
    {...props}
  />
);

export const AiModalContent = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "bg-white rounded-2xl max-w-[520px] w-[92%] max-h-[85vh] overflow-y-auto relative",
      "before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:rounded-t-2xl",
      "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-grey-200 hover:scrollbar-thumb-grey-300",
      className
    )}
    style={{
      boxShadow: "0 25px 60px rgba(0, 0, 0, 0.3)",
    }}
    {...props}
  >
    <div
      className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
      style={{
        background: "linear-gradient(90deg, var(--anime-purple), var(--anime-blue), var(--anime-pink))",
      }}
    />
    {children}
  </div>
);

export const AiModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center justify-between px-7 py-6 border-b border-grey-100",
      className
    )}
    {...props}
  />
);

export const AiModalTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center gap-2.5 text-[1.2rem] font-bold bg-clip-text [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]",
      className
    )}
    style={{
      background: "linear-gradient(135deg, var(--anime-purple), var(--anime-blue))",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}
    {...props}
  />
);

export const AiCloseButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={cn(
      "flex items-center justify-center w-9 h-9 rounded-full",
      "border-[1.5px] border-grey-200 bg-transparent text-grey-400 cursor-pointer",
      "transition-all duration-200",
      "hover:bg-grey-100 hover:border-grey-300 hover:text-grey-700 hover:rotate-90",
      "active:rotate-90 active:scale-[0.92]",
      "[&_svg]:w-[13px] [&_svg]:h-[13px]",
      className
    )}
    {...props}
  />
);

export const AiModalBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("px-7 pt-4 pb-7", className)} {...props} />
);

export const AiErrorMessage = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "text-center p-5 text-red-dark bg-[#fef2f2] rounded-[10px] text-[0.875rem] border border-[#fecaca]",
      className
    )}
    {...props}
  />
);

export const AiLoadingContainer = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col items-center justify-center py-12", className)}
    {...props}
  />
);

export const AiRecommendationList = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-3", className)} {...props} />
);

export const AiRecommendationItem = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex gap-3.5 p-4 rounded-xl bg-[#f9fafb] border border-[#f3f4f6]",
      "transition-all duration-200",
      "hover:bg-white hover:border-[var(--primary-alpha-30)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.05)]",
      className
    )}
    {...props}
  />
);

export const AiRecNumber = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex items-center justify-center w-[26px] h-[26px] min-w-[26px] rounded-full",
      "text-white text-[0.7rem] font-bold mt-0.5",
      className
    )}
    style={{
      background: "linear-gradient(135deg, var(--anime-purple), var(--anime-blue))",
    }}
    {...props}
  />
);

export const AiRecContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex-1 min-w-0", className)} {...props} />
);

export const AiRecTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("font-bold text-grey-900 leading-[1.3] text-[0.95rem] m-0 mb-0.5", className)}
    {...props}
  />
);

export const AiRecSecondaryTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-grey-400 text-[0.75rem] italic m-0 mb-2", className)}
    {...props}
  />
);

export const AiRecReason = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-grey-600 leading-[1.55] text-[0.8125rem] m-0 [&_span]:text-[var(--anime-purple)] [&_span]:font-semibold", className)}
    {...props}
  >
    {children}
  </p>
);
