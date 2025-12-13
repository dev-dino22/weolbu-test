import Layout from '@components/layouts/Layout';

import { ROUTE_PATH } from '@routes/routePath';

import { THEME } from '@styles/global';
import reset from '@styles/reset';

import { Global, ThemeProvider } from '@emotion/react';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router';
import Main from '@pages/main/MainPage';
import SignUpPage from '@pages/auth/signUp/SignUpPage';
import ToastProvider from '@components/toast/ToastProvider';
import LoginPage from '@pages/auth/login/LoginPage';
import {
  AuthProvider,
  useAuth,
} from '@domains/auth/login/context/AuthProvider';
import CourseCreatePage from '@pages/course/CourseCreatePage';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@apis/queryClient';
import CourseEnrollPage from '@pages/course/CourseEnrollPage';
import Header from '@widgets/Header';
import { useShowToast } from '@components/toast/ToastProvider';

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
  const { loggedIn, loading, hasToken, logoutUser } = useAuth();
  const location = useLocation();
  const showToast = useShowToast();

  if (loading) return null;

  if (!loggedIn || !hasToken()) {
    // TODO: 로그아웃할 때 토스트 두번 뜨는 거 수정
    showToast({ mode: 'WARN', message: '로그인이 필요합니다.' });
    logoutUser();
    return (
      <Navigate to={ROUTE_PATH.LOGIN} state={{ from: location }} replace />
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
