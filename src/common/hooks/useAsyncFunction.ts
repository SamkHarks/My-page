import { Service } from "src/common/components/serviceData/types";
import { useCallback, useEffect, useRef, useState } from "react";

export const useAsyncFunction = <T>(
  asyncFunction: () => Promise<T>,
): [Service<T>, () => Promise<void>, () => void] => {
  const [service, setService] = useState<Service<T>>({ state: "IDLE" });
  const isMounted = useIsMounted();
  const clearService = useCallback(
    () => setService({ state: "IDLE" }),
    [],
  );
  const callService = useCallback(async () => {
    setService({ state: "LOADING" });
    try {
      const data = await asyncFunction();
      if (isMounted.current) {
        setService({ state: "SUCCESS", data });
      }
    } catch (error) {
      if (isMounted.current) {
        setService({
          state: "FAILURE",
          error: error instanceof Error ? error : new Error(),
        });
      }
    }
  }, [asyncFunction, isMounted]);
  return [service, callService, clearService];
};

const useIsMounted = () => {
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};



