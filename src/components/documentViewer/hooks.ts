import { useCallback } from "react";
import { useMemo } from "react";
import { useService } from "src/hooks/hooks";
import { Service } from "src/components/serviceData/types";

export const useCheckLink = (link: string): {
  service: Service<string>;
  callService: () => void;
} => {
  const transformResponse = useCallback(async (_res: Response) => { return link; }, [link]);
  const serviceOptions = { transformResponse };
  const requestOptions = useMemo(() => ({ method: 'HEAD' } as const), []);
  const urlOptions = { path: link };

  const service = useService<string>({
    urlOptions,
    requestOptions,
    serviceOptions,
  });

  return service;
}