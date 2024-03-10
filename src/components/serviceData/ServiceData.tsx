import React from "react";
import { Service } from "../../hooks/types";
import { Spinner } from "../spinner/Spinner";

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
}: Props<T>) => {
  switch (service.state) {
    case "IDLE":
    case "LOADING":
      return <Spinner size={spinnerSize} />;
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
