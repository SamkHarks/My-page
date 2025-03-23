import { Suspense } from "react"
import { DefaultFallback } from "src/components/boundaries/loadingBoundary/DefaultFallback"

type Props = {
  children: React.ReactNode;
  Fallback?: React.ReactNode;
}

export const LoadingBoundary = (props: Props): React.JSX.Element => (
  <Suspense fallback={props.Fallback ?? <DefaultFallback />}>
    {props.children}
  </Suspense>
);