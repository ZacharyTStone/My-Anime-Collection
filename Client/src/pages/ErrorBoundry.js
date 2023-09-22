import React from "react";
import { Loading } from "../Components/UI";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(error);
    return { hasError: true };
  }

  render() {
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
              Please send an email to zach.stone.develper@gmail.com wih a
              description of what happened.
            </p>
            <Loading />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
