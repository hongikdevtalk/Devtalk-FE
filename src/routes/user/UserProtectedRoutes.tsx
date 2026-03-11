import UserLayout from '../../layouts/user/UserLayout';
import SeminarLive from '../../pages/user/seminar/Live';

export const userProtectedRoutes = [
  {
    element: <UserLayout />,
    children: [{ path: 'seminar/live', element: <SeminarLive /> }],
  },
];
