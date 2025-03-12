import { Service } from "src/hooks/types";
import { Loader } from "src/components/loader/Loader";

export type DataProps<T> = {
  data: T;
};

type Props<T> = {
  service: Service<T>;
  Renderer: React.ComponentType<DataProps<T>>;
  spinnerSize?: "small" | "medium" | "large";
};

//TODO add components for failure and idle/loading
export const ServiceData = <T,>({
  service,
  Renderer,
  spinnerSize = "medium",
}: Props<T>): React.JSX.Element | null => {
  switch (service.state) {
    case "IDLE":
    case "LOADING":
      return <Loader size={spinnerSize} />;
    case "SUCCESS":
      return <Renderer data={service.data} />;
    case "FAILURE":
      return (
        <div>
          <p>Oops something went wrong</p>
        </div>
      );
    default:
      return null;
  }
};
