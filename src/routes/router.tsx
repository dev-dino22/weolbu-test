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
import CourseCreatePage from '@pages/course/CourseCreatePage';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@apis/queryClient';
import CourseEnrollPage from '@pages/course/CourseEnrollPage';

function Wrapper() {
  return (
    <>
      <Global styles={reset} />
      <ThemeProvider theme={THEME}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <AuthProvider>
              <Layout>
                <Outlet />
              </Layout>
            </AuthProvider>
          </ToastProvider>
        </QueryClientProvider>
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
      { path: ROUTE_PATH.COURSE_CREATE, Component: CourseCreatePage },
      { path: ROUTE_PATH.COURSE_ENROLL, Component: CourseEnrollPage },
    ],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
