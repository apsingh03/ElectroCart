import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error("ErrorBoundary caught error:", error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong rendering this component.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
