import UserLayout from '../../layouts/user/UserLayout';
import Home from '../../pages/user/home/Home';
import SeminarHome from '../../pages/user/seminar/Home';
import SeminarDetail from '../../pages/user/seminar/Detail';
import SeminarApplyInfo from '../../pages/user/seminar/ApplyInfo';
import SeminarApplyQuestion from '../../pages/user/seminar/ApplyQuestion';
import LiveVerification from '../../pages/user/seminar/LiveVerification';
import SpeakersList from '../../pages/user/speakers/List';
import SpeakersDetail from '../../pages/user/speakers/Detail';
import NoticeHome from '../../pages/user/notice/Home';
import NoticeQna from '../../pages/user/notice/Qna';
import NoticeInquiry from '../../pages/user/notice/Inquiry';

export const userPublicRoutes = [
  {
    element: <UserLayout />,
    children: [
      { path: '', element: <Home /> },
      { path: 'seminar', element: <SeminarHome /> },
      { path: 'seminar/:id', element: <SeminarDetail /> },
      { path: 'seminar/apply-info', element: <SeminarApplyInfo /> },
      { path: 'seminar/apply-question', element: <SeminarApplyQuestion /> },
      { path: 'seminar/live/verification', element: <LiveVerification /> },
      { path: 'speakers', element: <SpeakersList /> },
      { path: 'speakers/:id', element: <SpeakersDetail /> },
      { path: 'notice', element: <NoticeHome /> },
      { path: 'notice/qna', element: <NoticeQna /> },
      { path: 'notice/inquiry', element: <NoticeInquiry /> },
    ],
  },
];
