import { LoadingBoundary } from "src/components/boundaries/loadingBoundary/LoadingBoundary"
import { ErrorBoundary } from "src/components/boundaries/errorBoundary/ErrorBoundary";

type Props = {
  children: React.ReactNode;
  ErrorFallback?: React.ComponentType<{ onResetError: () => void }>;
  LoadingFallback?: React.ReactNode;
}

export const Boundaries = (props: Props): React.JSX.Element => (
  <ErrorBoundary Fallback={props.ErrorFallback}>
    <LoadingBoundary Fallback={props.LoadingFallback}>
      {props.children}
    </LoadingBoundary>
  </ErrorBoundary>
);