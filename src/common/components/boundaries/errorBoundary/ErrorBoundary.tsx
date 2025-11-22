import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { BaseErrorBoundary } from 'src/common/components/boundaries/errorBoundary/BaseErrorBoundary';

type Props = {
  children: React.JSX.Element;
  Fallback?: React.ComponentType<{ onResetError: () => void; error?: Error }>;
}

export const ErrorBoundary = (props: Props): React.JSX.Element => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <BaseErrorBoundary
          onResetError={reset}
          Fallback={props.Fallback}
        >
          {props.children}
        </BaseErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};