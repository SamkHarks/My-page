import { Service } from "src/components/serviceData/types";
import { useCallback, useEffect, useRef, useState } from "react";
import configuration from "src/config/configuration.json";
import { OpenModalConfig, useModalStore } from "src/stores/useModalStore";

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

export const useConfiguration = (): {
  baseUrls: Omit<typeof configuration["baseUrls"], 'dev' | 'prod'> & { baseUrl: string };
  paths: typeof configuration["paths"];
} => {
  const {dev, prod, ...restBaseUrls} = configuration.baseUrls;
  const env = (process.env.NODE_ENV ?? 'production');
  const baseUrls = {...restBaseUrls, baseUrl: env === 'production' ? prod : dev};
  const paths = configuration.paths;
  return { baseUrls, paths };
}


export const usePreloadModalContent = (): (modalConfig: OpenModalConfig) => void => {
  const [isPreloaded, setIsPreloaded] = useState(false);

  const openModal = useModalStore((state) => state.openModal);
  const setPreloading = useModalStore((state) => state.setPreloading);

  return useCallback(
    (modalConfig: OpenModalConfig) => {
      setPreloading(!isPreloaded);
      openModal(modalConfig);
      setIsPreloaded(true);
  }, [openModal, setPreloading, isPreloaded]);
}


