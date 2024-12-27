import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import queryClient, { asyncStoragePersister } from '@api/datasource/query';

import { RoutesApp } from '@constants/routes';

import Home from '@pages/home';
import FormEvent from '@pages/event/form';

import Layout from '@components/layout';

const App = () => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        //2 days in milliseconds
        maxAge: 2 * 24 * 60 * 60 * 1000,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<Home />} path={RoutesApp.HOME} />
            <Route element={<FormEvent />} path={RoutesApp.EVENT_FORM} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PersistQueryClientProvider>
  );
};

export default App;
