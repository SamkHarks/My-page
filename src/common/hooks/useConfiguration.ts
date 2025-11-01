import configuration from "src/config/configuration.json";


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
