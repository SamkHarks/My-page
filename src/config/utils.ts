import configuration from "src/config/configuration.json";

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const { dev, prod, ...restBaseUrls } = configuration.baseUrls;

const processedConfiguration = {
  baseUrls: {
    ...restBaseUrls,
    api: env === 'production' ? prod : dev
  },
  paths: configuration.paths
} as const;

export const getConfiguration = (): typeof processedConfiguration => processedConfiguration;