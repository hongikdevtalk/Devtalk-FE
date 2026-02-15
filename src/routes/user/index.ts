import React from 'react';
import { Navigate, Outlet, type RouteObject, useLocation } from 'react-router-dom';
import { STORAGE_KEY } from '../../constants/key';
import { userPublicRoutes } from './UserPublicRoutes';
import { userProtectedRoutes } from './UserProtectedRoutes';
import UserErrorPage from '../../pages/user/UserErrorPage';

// 토큰 없는 채로 protected로 이동 시, 인증화면(/seminar/live/verification)으로 이동
const UserProtectedWrapper = () => {
  const token = localStorage.getItem(STORAGE_KEY.USER_ACCESS_TOKEN);
  return token
    ? React.createElement(Outlet)
    : React.createElement(Navigate, { to: '/seminar/live/verification', replace: true });
};

// 토큰 있는 채로 인증화면 (/seminar/live/verification) 아동 시, /seminar/live로 이동
const UserPublicWrapper = () => {
  const token = localStorage.getItem(STORAGE_KEY.USER_ACCESS_TOKEN);
  const location = useLocation();
  const isVerificationPage = location.pathname === '/seminar/live/verification';

  // 토큰이 있는 채로 인증화면 접근하려는 경우만 /seminar/live로 리다이렉트
  if (token && isVerificationPage) {
    return React.createElement(Navigate, { to: '/seminar/live', replace: true });
  }

  // 나머지 public 페이지는 토큰 있는 상태에서도 접근 허용 설정
  return React.createElement(Outlet);
};

export const userRoutes = [
  {
    path: '/',
    children: [
      { element: React.createElement(UserPublicWrapper), children: userPublicRoutes },
      { element: React.createElement(UserProtectedWrapper), children: userProtectedRoutes },
      {
        path: '*',
        element: React.createElement(UserErrorPage),
      },
    ],
  },
] satisfies RouteObject[];
