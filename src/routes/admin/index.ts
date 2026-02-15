import React from 'react';
import { Navigate, Outlet, type RouteObject } from 'react-router-dom';
import { STORAGE_KEY } from '../../constants/key';
import { adminPublicRoutes } from './AdminPublicRoutes';
import { adminProtectedRoutes } from './AdminProtectedRoutes';
import AdminErrorPage from '../../pages/admin/AdminErrorPage';

// 토큰 없이 접근 시 로그인 페이지로
const AdminProtectedWrapper = () => {
  const token = localStorage.getItem(STORAGE_KEY.ADMIN_ACCESS_TOKEN);
  return token
    ? React.createElement(Outlet)
    : React.createElement(Navigate, { to: '/admin/login', replace: true });
};

// 토큰 있는 채로 로그인 페이지 접근 시 home/exposure로
const AdminPublicWrapper = () => {
  const token = localStorage.getItem(STORAGE_KEY.ADMIN_ACCESS_TOKEN);
  return token
    ? React.createElement(Navigate, { to: '/admin/home/exposure', replace: true })
    : React.createElement(Outlet);
};

export const adminRoutes = [
  {
    path: '/admin/login',
    element: React.createElement(AdminPublicWrapper),
    children: adminPublicRoutes,
  },
  {
    path: '/admin',
    element: React.createElement(AdminProtectedWrapper),
    children: adminProtectedRoutes,
  },
  { path: '/admin/*', element: React.createElement(AdminErrorPage) },
] satisfies RouteObject[];
