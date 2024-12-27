import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

const queryClient = new QueryClient({
  queryCache: new QueryCache(),
  mutationCache: new MutationCache(),
});

queryClient.setDefaultOptions({
  queries: {
    retry: 2,
    networkMode: 'always',
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  },
  mutations: {
    retry: 1,
    gcTime: 0,
    networkMode: 'always',
  },
});

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: localStorage,
});

export default queryClient;
