import { useCallback, useEffect, useMemo } from "react";
import { useAsyncFunction } from "src/hooks/hooks";
import { Service } from "src/hooks/types";
import { HandledError } from "src/components/boundaries/errorBoundary/HandledError";
import { handleNetworkError } from "src/utils/utils";



export const useCheckLink = (link: string): {
  service: Service<string>;
  refetch: () => Promise<void>;
} => {
  const checkLink = useCallback(async () => {
    const response = await fetch(link, { method: 'HEAD' });
    if (response.ok) {
      return link;
    }
    const errorArgs = handleNetworkError(response.status);
    throw new HandledError(errorArgs.key, errorArgs.args);
  }, [link]);

  const [service, callService] = useAsyncFunction<string>(checkLink);
  
  useEffect(() => {
    callService();
  }, [callService]);

  return useMemo(() => ({service, refetch: callService}), [service, callService]);
}