import { useQuery } from '@tanstack/react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import devlogo2 from '../../../assets/logos/devlogo2.svg';
import qrsuccess from '../../../assets/icons/common/qrsuccess.svg';
import { useShowSeminar } from '../../../contexts/ShowSeminarContext';
import { getSeminarSession } from '../../../apis/seminarDetail';

const Live = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { seminarNum, mainCards, seminarId } = useShowSeminar();
  const seminarTitle = mainCards?.card1?.seminarTitle;

  const { data: sessionData } = useQuery({
    queryKey: ['seminarSession', seminarId],
    queryFn: () => getSeminarSession(seminarId!),
    enabled: !!seminarId,
  });

  const sessions = sessionData?.result ?? [];

  const speakerText = sessions
    .map((s, i) => `${i + 1}부 ${s.speaker.name} 님`)
    .join(' / ');

  const attendanceTime = (() => {
    const raw = location.state?.attendanceTime;
    const date = raw ? new Date(raw) : new Date();
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Seoul',
    });
  })();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="pt-[10px] pl-[20px]">
        <img src={devlogo2} alt="devlogo2" className="w-[119.06px] h-[24px]" />
      </div>

      <div className="flex flex-col items-center mt-[200px]">
        <img src={qrsuccess} alt="qrsuccess" />
        <p className="text-center text-black text-[26px] font-medium leading-normal">
          출석 완료
        </p>
        <p className="mt-[5px] text-center text-black text-[22px] font-normal leading-normal">
          {seminarNum}회차 세미나 | {seminarTitle}
        </p>
      </div>

      <div className="flex-1" />

      <div className="mx-[10px] p-[30px]">
        <div className="flex flex-row justify-between items-start">
          <span className="text-black text-[18px] font-medium leading-normal shrink-0">연사</span>
          <span className="text-black text-[18px] font-light leading-normal text-right ml-[16px]">
            {speakerText}
          </span>
        </div>
        <div className="flex flex-row justify-between items-center mt-[15px]">
          <span className="text-black text-[18px] font-medium leading-normal shrink-0">출석일시</span>
          <span className="text-black text-[18px] font-light leading-normal text-right ml-[16px]">
            {attendanceTime}
          </span>
        </div>
      </div>

      <div className="px-[20px] pt-[20px] pb-[20px]">
        <button
          onClick={() => navigate('/')}
          className="flex h-[56px] justify-center items-center w-full rounded-[10px] text-white text-[20px] font-semibold leading-normal cursor-pointer"
          style={{
            background:
              'radial-gradient(557.08% 171.17% at 74.62% 100%, #BDF548 0%, #4EABB5 100%)',
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Live;
