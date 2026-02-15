import AdminLayout from '../../layouts/admin/AdminLayout';
import PromoImage from '../../pages/admin/home-manage/PromoImage';
import Links from '../../pages/admin/home-manage/Links';
import Reviews from '../../pages/admin/home-manage/Reviews';
import SeminarCards from '../../pages/admin/seminar-manage/Cards';
import SeminarManageDetail from '../../pages/admin/seminar-manage/Detail';
import SeminarReviews from '../../pages/admin/seminar-manage/Reviews';
import SeminarAdd from '../../pages/admin/seminar-manage/Add';
import SeminarApplicantsList from '../../pages/admin/seminar-manage/applicants/List';
import SeminarApplicantsDetail from '../../pages/admin/seminar-manage/applicants/Detail';
import SeminarApplicantsQuestions from '../../pages/admin/seminar-manage/applicants/Questions';
import Attendance from '../../pages/admin/seminar-live/Attendance';
import Accounts from '../../pages/admin/auth-manage/Accounts';
import HomeExposure from '../../pages/admin/home-manage/HomeExposure';

export const adminProtectedRoutes = [
  {
    element: <AdminLayout />,
    children: [
      { path: 'home/exposure', element: <HomeExposure /> },
      { path: 'home/promo', element: <PromoImage /> },
      { path: 'home/links', element: <Links /> },
      { path: 'home/reviews', element: <Reviews /> },
      { path: 'seminars', element: <SeminarCards /> },
      { path: 'seminars/:id', element: <SeminarManageDetail /> },
      { path: 'seminars/:id/reviews', element: <SeminarReviews /> },
      { path: 'seminars/add', element: <SeminarAdd /> },
      { path: 'seminars/applicants', element: <SeminarApplicantsList /> },
      { path: 'seminars/applicants/:id', element: <SeminarApplicantsDetail /> },
      { path: 'seminars/applicants/:id/questions', element: <SeminarApplicantsQuestions /> },
      { path: 'seminar-live/attendance', element: <Attendance /> },
      { path: 'admin-accounts', element: <Accounts /> },
    ],
  },
];
