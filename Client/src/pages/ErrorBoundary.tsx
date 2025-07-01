import React, { ReactNode, ErrorInfo } from "react";
import styled from "styled-components";
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
    console.error(error); // Log the error
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error(error, errorInfo);
  }

  render(): React.ReactElement | null {
    if (this.state.hasError) {
      return (
        <StyledErrorWrapper>
          <StyledErrorContent>
            <StyledErrorMessage>
              Something Went Wrong...Please Try Again Later!
            </StyledErrorMessage>
            <StyledErrorDescription>
              Please send an email to zach.stone.developer@gmail.com with a
              description of what happened.
            </StyledErrorDescription>
            <Loading />
          </StyledErrorContent>
        </StyledErrorWrapper>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

const StyledErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: black;
`;

const StyledErrorContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledErrorMessage = styled.h3`
  color: var(--primary-500);
`;

const StyledErrorDescription = styled.p`
  color: var(--primary-500);
`;

export default ErrorBoundary;
