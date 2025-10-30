import { Service } from "src/components/serviceData/types";
import { Loader } from "src/components/loader/Loader";
import { HandledError } from "src/components/boundaries/errorBoundary/HandledError";

export type DataProps<T> = {
  data: T;
};

type Props<T> = {
  service: Service<T>;
  Renderer: React.ComponentType<DataProps<T>>;
  refetch?: () => void;
  LoadingFallback?: React.JSX.Element;
  spinnerSize?: "small" | "medium" | "large";
};

export const ServiceData = <T,>({
  service,
  Renderer,
  refetch,
  LoadingFallback,
  spinnerSize = "medium",
}: Props<T>): React.JSX.Element | null => {
  switch (service.state) {
    case "IDLE":
    case "LOADING":
      return LoadingFallback ?? <Loader size={spinnerSize} />;
    case "SUCCESS":
      return <Renderer data={service.data} />;
    case "FAILURE": 
      if (service.error instanceof HandledError && refetch) {
        service.error.reset = refetch;
      }
      throw service.error;// Let ErrorBoundary catch this
    default:
      return null;
  }
};
