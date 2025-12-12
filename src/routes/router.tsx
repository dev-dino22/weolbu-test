import Layout from '@components/layouts/Layout';

import { ROUTE_PATH } from '@routes/routePath';

import { THEME } from '@styles/global';
import reset from '@styles/reset';

import { Global, ThemeProvider } from '@emotion/react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import Main from '@pages/Main';

function Wrapper() {
  return (
    <>
      <Global styles={reset} />
      <ThemeProvider theme={THEME}>
        <Layout>
          <Outlet />
        </Layout>
      </ThemeProvider>
    </>
  );
}

const routes = createBrowserRouter([
  {
    Component: Wrapper,
    children: [{ path: ROUTE_PATH.MAIN, Component: Main }],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
