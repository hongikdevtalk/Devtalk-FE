import { useNavigate } from 'react-router-dom';
import { useShowSeminar } from '../../contexts/ShowSeminarContext';
import { getHomeLink } from '../../apis/HomeManage/homeLinkApi';
import { getFAQLink } from '../../apis/HomeManage/homeFAQApi';
import { useQuery } from '@tanstack/react-query';

type HamburgerBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const HamburgerBar = ({ isOpen, onClose: _onClose }: HamburgerBarProps) => {
  const navigate = useNavigate();

  const { data: inquiryLinkData } = useQuery({
    queryKey: ['home', 'inquiryLink'],
    queryFn: getHomeLink,
  });

  const { data: faqLinkData } = useQuery({
    queryKey: ['home', 'faqLink'],
    queryFn: getFAQLink,
  });

  const handleIntroduceClick = () => {
    navigate('/');
    _onClose();
  };

  const handleFAQClick = () => {
    const url = faqLinkData?.result?.url;
    console.log(url);
    if (url) {
      window.open(url, '_self');
    } else {
      console.error('FAQ 링크를 불러오지 못했습니다.');
    }
  };

  const handleInquiryClick = () => {
    const url = inquiryLinkData?.result?.url;
    console.log(url);
    if (url) {
      window.open(url, '_self');
    } else {
      console.error('문의하기 링크를 불러오지 못했습니다.');
    }
  };

  // 노출 회차 정보
  const { seminarId, seminarNum } = useShowSeminar();

  return (
    <>
      {/* 햄버거 바 */}
      <div
        className={`absolute w-[375px] h-screen bg-black transform transition-transform duration-400 z-40 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="flex flex-col gap-16 pt-[110px] px-20">
          <nav className="flex flex-col text-grey-300 subhead-1-semibold">
            <button
              className="w-[335px] py-[12px] pl-[16px] pr-[8px] rounded-8 text-left hover:bg-grey-800 hover:text-white cursor-pointer transition-all duration-200"
              onClick={handleIntroduceClick}
            >
              소개
            </button>
            <button
              className="w-[335px] py-[12px] pl-[16px] pr-[8px] rounded-8 text-left hover:bg-grey-800 hover:text-white cursor-pointer transition-all duration-200"
              onClick={() => navigate('/seminar')}
            >
              세미나
            </button>
            {seminarId && (
              <button
                className="w-[335px] py-[12px] pl-[16px] pr-[8px] rounded-8 text-left hover:bg-grey-800 cursor-pointer transition-all duration-200"
                onClick={() => navigate('/seminar/apply-info')}
              >
                <p className="text-gradient">{seminarNum}회차 데브톡 신청하기</p>{' '}
              </button>
            )}
            <hr className="border-grey-700 mt-[28px] mb-[8px]" />
            <button
              onClick={handleFAQClick}
              className="w-[335px] py-[12px] pl-[16px] pr-[8px] rounded-8 text-left hover:bg-grey-800 hover:text-white cursor-pointer transition-all duration-200"
            >
              FAQ
            </button>
            <button
              onClick={handleInquiryClick}
              className="w-[335px] py-[12px] pl-[16px] pr-[8px] rounded-8 text-left hover:bg-grey-800 hover:text-white cursor-pointer transition-all duration-200"
            >
              문의하기
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default HamburgerBar;
