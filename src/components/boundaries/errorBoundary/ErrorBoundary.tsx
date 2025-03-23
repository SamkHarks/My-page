import { Component } from "react";
import { DefaultFallback } from "src/components/boundaries/errorBoundary/DefaultFallback";
import { HandledError } from "src/components/boundaries/errorBoundary/HandledError";

type Props = {
  children: React.ReactNode;
  Fallback?: React.ComponentType<{ onResetError: () => void, error?: Error }>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

type State = { hasError: boolean, error?: Error };

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  resetError(): void {
    const { error } = this.state;
    if (error instanceof HandledError && error.reset) {
      error.reset();
    } else {
      window.location.reload();
    }
    this.setState({ hasError: false, error: undefined });
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      const FallBackComponent = this.props.Fallback ?? DefaultFallback;
      const error = this.state.error instanceof HandledError
        ? this.state.error
        : undefined;
      return (
        <FallBackComponent
          onResetError={() => this.resetError()}
          error={error}
        />
      );
    }
    return this.props.children;
  }
};