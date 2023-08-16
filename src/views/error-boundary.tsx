import { Component } from "react";

interface Props {
  children: React.ReactElement;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown): { hasError: boolean } {
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown): void {
    console.error(error, errorInfo);
  }

  render(): React.ReactElement {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return (
        <h1
          className="absolute whitespace-nowrap text-2xl"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          An error occurred. Check your internet connection and try refreshing
          the page.
        </h1>
      );
    }

    return children;
  }
}
