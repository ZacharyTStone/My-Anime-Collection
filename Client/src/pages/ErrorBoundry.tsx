import React, { ReactNode, ErrorInfo } from "react";
import Loading from "../Components/UI/Loading";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    console.error(error); // Log the error
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render(): React.ReactElement {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            backgroundColor: "black",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                color: "var(--primary-500)",
              }}
            >
              {" "}
              Something Went Wrong...Please Try Again Later!{" "}
            </h3>
            <p
              style={{
                color: "var(--primary-500)",
              }}
            >
              Please send an email to zach.stone.developer@gmail.com with a
              description of what happened.
            </p>
            {/* Assuming Loading component is implemented correctly */}
            <Loading />
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;
