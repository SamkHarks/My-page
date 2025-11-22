import { useService } from "src/common/api/useService";
import { Service } from "src/common/components/serviceData/types";

export const useCheckLink = (link: string): {
  service: Service<string>;
  callService: () => void;
} => {
  const transformResponse = async (_res: Response) => { return link; };
  const serviceOptions = { transformResponse };
  const requestOptions = { method: 'HEAD' } as const;
  const urlOptions = { path: link };

  const service = useService<string>({
    urlOptions,
    requestOptions,
    serviceOptions,
  });

  return service;
}