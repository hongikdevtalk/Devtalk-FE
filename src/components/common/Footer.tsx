import link from '../../assets/icons/components/Footer/link.svg';
import mail from '../../assets/icons/components/Footer/mail.svg';
import messagecircle from '../../assets/icons/components/Footer/messagecircle.svg';
import dev from '../../assets/logos/dev.svg';
import { getHomeLink } from '../../apis/HomeManage/homeLinkApi';
import { useQuery } from '@tanstack/react-query';

const Footer = () => {
  const { data: inquiryLinkData } = useQuery({
    queryKey: ['home', 'inquiryLink'],
    queryFn: getHomeLink,
  });

  const handlePrivacyClick = () => {
    window.open(
      'https://noiseless-anaconda-297.notion.site/DevTalk-285aaa6ed13f80558981fb69645223c0?source=copy_link',
      '_self'
    );
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

  return (
    <footer className="flex justify-center items-center w-full h-[122px] bg-grey-400">
      <div className="flex flex-row justify-between items-center w-[327px] h-[62px]">
        {/* 왼쪽 정보 영역 */}
        <div className="flex flex-col gap-[5px]">
          <div className="flex items-center gap-[8px] cursor-pointer" onClick={handlePrivacyClick}>
            <img src={link} alt="link" className="w-[24px] h-[24px]" />
            <span className="caption-medium text-grey-700">개인정보 처리 방침</span>
          </div>
          <div className="flex items-center gap-[8px]">
            <img src={mail} alt="mail" className="w-[24px] h-[24px]" />
            <span className="caption-medium text-grey-700">dev.hongik@gmail.com</span>
          </div>
          <div className="flex items-center gap-[8px] cursor-pointer" onClick={handleInquiryClick}>
            <img src={messagecircle} alt="messagecircle" className="w-[24px] h-[24px]" />
            <span className="caption-medium text-grey-700">문의하기</span>
          </div>
        </div>

        {/* 오른쪽 로고 */}
        <div className="flex items-start">
          <img src={dev} alt="devlogo" className="w-[85px] h-[34px]" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
