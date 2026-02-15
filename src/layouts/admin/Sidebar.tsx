import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import chevronup from '../../assets/icons/common/chevronup.svg';
import chevrondown from '../../assets/icons/common/chevrondown.svg';
import devlogo from '../../assets/logos/devlogo.svg';
import { postAdminLogout } from '../../apis/authApi';

const menuData = [
  {
    title: '홈 화면 관리',
    children: [
      { name: '홈화면 노출 회차', to: '/admin/home/exposure', end: true },
      { name: '홍보 사진 관리', to: '/admin/home/promo', end: true },
      { name: '링크 관리', to: '/admin/home/links', end: true },
      { name: '후기 카드 갤러리', to: '/admin/home/reviews', end: true },
    ],
  },
  {
    title: '세미나 관리',
    children: [
      {
        name: '세미나 카드 조회',
        to: '/admin/seminars',
        end: true,
        matchPaths: ['/admin/seminars/:id', '/admin/seminars/:id/reviews'],
      },
      { name: '세미나 추가하기', to: '/admin/seminars/add', end: true },
      { name: '세미나 신청자 관리', to: '/admin/seminars/applicants', end: false },
    ],
  },
  {
    title: '세미나 Live 관리',
    children: [{ name: '출석 관리', to: '/admin/seminar-live/attendance', end: true }],
  },
  {
    title: '관리자 권한 관리',
    children: [{ name: '관리자 아이디 관리', to: '/admin/admin-accounts', end: true }],
  },
];

export const Sidebar: React.FC = () => {
  const [openSections, setOpenSections] = useState<string[]>(() =>
    menuData.map((section) => section.title)
  );

  const { pathname } = useLocation();

  // pathname이 matchPaths 패턴과 일치하는지 확인
  const isPathMatching = (matchPaths?: string[]) => {
    if (!matchPaths) return;

    return matchPaths.some((pattern) => {
      const regexPattern = `^${pattern.replace(/:id/g, '\\d+')}$`;
      const regex = new RegExp(regexPattern);
      return regex.test(pathname);
    });
  };

  const handleSectionClick = (title: string) => {
    if (openSections?.includes(title)) {
      setOpenSections(openSections.filter((sectionTitle) => sectionTitle !== title));
    } else {
      setOpenSections([...openSections, title]);
    }
  };

  // 사이드바 메뉴 스타일
  const activeLinkStyle = 'bg-grey-700 text-green-300';
  const inactiveLinkStyle = 'text-grey-300';

  return (
    <aside className="w-[290px] text-white bg-grey-900 flex flex-col flex-shrink-0">
      {/* 로고 */}
      <Link className="flex items-center justify-center gap-5 h-[80px]" to="/admin/home/promo">
        <img src={devlogo} alt="devlogo" className="w-80 h-9" />
        <span className="heading-2-bold">Admin</span>
      </Link>

      {/* 사이드바 메뉴들 */}
      <div className="flex-1 h-[44px] overflow-y-auto">
        <nav className="flex flex-col">
          {menuData.map((section) => (
            <div key={section.title}>
              <div
                className="flex justify-between items-center gap-6 py-3 px-[40px] cursor-pointer hover:bg-grey-700"
                onClick={() => handleSectionClick(section.title)}
              >
                <h3 className="heading-3-semibold">{section.title}</h3>
                {openSections.includes(section.title) ? (
                  <img src={chevronup} />
                ) : (
                  <img src={chevrondown} />
                )}
              </div>

              {openSections.includes(section.title) && (
                <ul className="py-1">
                  {section.children.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        className={({ isActive }) => {
                          let finalIsActive = isActive || isPathMatching(item.matchPaths);

                          return `flex items-center h-[40px] py-3 px-[40px] cursor-pointer subhead-1-medium relative transition-colors ${
                            finalIsActive ? activeLinkStyle : inactiveLinkStyle
                          }`;
                        }}
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* 로그아웃 버튼 */}
      <div className="h-[52px]">
        <button
          onClick={async () => {
            const confirmLogout = window.confirm('정말 로그아웃하시겠습니까?');
            if (confirmLogout) {
              await postAdminLogout();
            }
          }}
          className="cursor-pointer heading-3-semibold px-[40px]"
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
};
