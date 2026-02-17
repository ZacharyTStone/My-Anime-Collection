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

  static getDerivedStateFromError(_error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _errorInfo: ErrorInfo): void {
    // Error caught by boundary - could send to error reporting service
  }

  render(): React.ReactElement | null {
    if (this.state.hasError) {
      return (
        <div className="flex justify-center items-center h-screen w-screen bg-black">
          <div className="flex justify-center items-center flex-col">
            <h3 className="text-primary-500">
              Something Went Wrong...Please Try Again Later!
            </h3>
            <p className="text-primary-500">
              Please send an email to zach.stone.developer@gmail.com with a
              description of what happened.
            </p>
            <Loading />
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;
