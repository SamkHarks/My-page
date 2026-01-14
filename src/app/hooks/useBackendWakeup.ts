import { useQuery } from "@tanstack/react-query"
import { apiClient } from "src/common/api/http/clients";
import { getConfiguration } from "src/config/utils";

/**
 * Ping free tier backend to prevent it from going to sleep.
 */
export const useBackendWakeup = (): void => {

  const paths = getConfiguration().paths;

  useQuery({
    queryKey: ['backend-wakeup'],
    queryFn: async () => {
      try {
        return await apiClient.get(paths.email.health);
      } catch {
        return null;
      }
    },
    staleTime: Infinity,
    retry: false,
    enabled: process.env.NODE_ENV === 'production',
  });

  return;

}