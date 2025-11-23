import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
}

const QueryClientProvider = ({ children }: Props): React.JSX.Element => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;