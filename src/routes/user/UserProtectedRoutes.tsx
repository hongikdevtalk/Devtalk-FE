import UserLayout from '../../layouts/user/UserLayout';
import SeminarLive from '../../pages/user/seminar/Live';
import SeminarReview from '../../pages/user/seminar/Review';

export const userProtectedRoutes = [
  {
    element: <UserLayout />,
    children: [
      { path: 'seminar/live', element: <SeminarLive /> },
      { path: 'seminar/review', element: <SeminarReview /> },
    ],
  },
];
