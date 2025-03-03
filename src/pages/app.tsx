import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

import queryClient, { asyncStoragePersister } from '@api/datasource/query';

import { RoutesApp } from '@constants/routes';

import Home from '@pages/home';
import FormEvent from '@pages/event/form';

import Layout from '@components/layout';

const App = () => {
  // register('/sw.ts', {
  //   registrationOptions: { scope: '/', type: 'module' },
  //   ready() {
  //     console.log('Service worker is ACTIVE .');
  //   },
  //   registered() {
  //     console.log('Service worker has been registered.');
  //   },
  //   cached() {
  //     console.log('Content has been cached for offline use.');
  //   },
  //   updatefound() {
  //     console.log('New content is downloading.');
  //   },
  //   updated() {
  //     console.log('New content is available; please refresh.');
  //   },
  //   offline() {
  //     console.log(
  //       'No internet connection found. App is running in offline mode.'
  //     );
  //   },
  //   error(error) {
  //     console.error('Error during service worker registration:', error);
  //   },
  // });

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
