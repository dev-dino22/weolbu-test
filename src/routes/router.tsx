import Layout from '@components/layouts/Layout';

import { ROUTE_PATH } from '@routes/routePath';

import { THEME } from '@styles/global';
import reset from '@styles/reset';

import { queryClient } from '@apis/queries/queryClient';
import ToastProvider from '@components/toast/ToastProvider';
import { AuthProvider, useAuth } from '@domains/auth/context/AuthProvider';
import { Global, ThemeProvider } from '@emotion/react';
import LoginPage from '@pages/auth/login/LoginPage';
import SignUpPage from '@pages/auth/signUp/SignUpPage';
import CourseCreatePage from '@pages/course/CourseCreatePage';
import CourseEnrollPage from '@pages/course/CourseEnrollPage';
import Main from '@pages/main/MainPage';
import { QueryClientProvider } from '@tanstack/react-query';
import Header from '@widgets/Header';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router';

function Wrapper() {
  return (
    <>
      <Global styles={reset} />
      <ThemeProvider theme={THEME}>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <AuthProvider>
              <Layout>
                <Header />
                <Outlet />
              </Layout>
            </AuthProvider>
          </ToastProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

function ProtectedRoute() {
  const { loggedIn, loading, hasToken } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!loggedIn || !hasToken()) {
    return (
      <Navigate
        to={ROUTE_PATH.LOGIN}
        state={{ from: location, needsAuth: true }}
        replace
      />
    );
  }

  return <Outlet />;
}

function GuestOnlyRoute() {
  const { loggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (loggedIn) {
    return (
      <Navigate
        to={ROUTE_PATH.COURSE_ENROLL}
        state={{ from: location }}
        replace
      />
    );
  }

  return <Outlet />;
}

const routes = createBrowserRouter([
  {
    Component: Wrapper,
    children: [
      {
        Component: GuestOnlyRoute,
        children: [
          { path: ROUTE_PATH.MAIN, Component: Main },
          { path: ROUTE_PATH.SIGN_UP, Component: SignUpPage },
          { path: ROUTE_PATH.LOGIN, Component: LoginPage },
        ],
      },
      {
        Component: ProtectedRoute,
        children: [
          { path: ROUTE_PATH.COURSE_CREATE, Component: CourseCreatePage },
          { path: ROUTE_PATH.COURSE_ENROLL, Component: CourseEnrollPage },
        ],
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
