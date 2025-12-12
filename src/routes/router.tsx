import Layout from '@components/layouts/Layout';

import { ROUTE_PATH } from '@routes/routePath';

import { THEME } from '@styles/global';
import reset from '@styles/reset';

import { Global, ThemeProvider } from '@emotion/react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import Main from '@pages/main/MainPage';
import SignUpPage from '@pages/auth/signUp/SignUpPage';
import ToastProvider from '@components/toast/ToastProvider';
import LoginPage from '@pages/auth/login/LoginPage';
import { AuthProvider } from '@domains/auth/login/context/AuthProvider';

function Wrapper() {
  return (
    <>
      <Global styles={reset} />
      <ThemeProvider theme={THEME}>
        <ToastProvider>
          <AuthProvider>
            <Layout>
              <Outlet />
            </Layout>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </>
  );
}

const routes = createBrowserRouter([
  {
    Component: Wrapper,
    children: [
      { path: ROUTE_PATH.MAIN, Component: Main },
      { path: ROUTE_PATH.SIGN_UP, Component: SignUpPage },
      { path: ROUTE_PATH.LOGIN, Component: LoginPage },
    ],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
