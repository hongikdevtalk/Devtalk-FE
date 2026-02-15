import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import Header from '../../../components/common/Header';
import { useState } from 'react';
import { useSeminarAuth } from '../../../hooks/SeminarLive/useSeminarAuth';
import { STORAGE_KEY } from '../../../constants/key';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const LiveVerification = () => {
  const navigate = useNavigate();
  const [studentNum, setStudentNum] = useState('');
  const [name, setName] = useState('');
  const { mutate, isPending } = useSeminarAuth();

  const handleSumbmit = () => {
    mutate(
      { studentNum, name },
      {
        onSuccess: (res) => {
          if (res.result) {
            const { accessToken, refreshToken } = res.result;
            localStorage.setItem(STORAGE_KEY.USER_ACCESS_TOKEN, accessToken);
            localStorage.setItem(STORAGE_KEY.USER_REFRESH_TOKEN, refreshToken);
            alert('인증이 완료되었습니다.');
            navigate('/seminar/live');
          } else {
            alert('인증이 실패했습니다.');
          }
        },
      }
    );
  };
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <>
      <Header hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen} />
      {isPending && <LoadingSpinner />}
      <div className="pt-[56px]">
        <div className="flex flex-col px-20 pt-28">
          <p className="flex text-white heading-2-bold pb-32">세미나 신청자 인증</p>
          <div className="flex flex-col gap-12 pb-[381px]">
            <input
              type="text"
              placeholder="학번"
              value={studentNum}
              onChange={(e) => setStudentNum(e.target.value)}
              className="w-[335px] h-[54px] px-16 py-8 text-grey-50 bg-grey-800 rounded-8 placeholder:text-grey-300 border border-transparent focus:border-grey-300 focus:outline-none"
            />
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-[335px] h-[54px] px-16 py-8 text-grey-50 bg-grey-800 rounded-8 placeholder:text-grey-300 border border-transparent focus:border-grey-300 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex px-20 pt-[20px] pb-[89px]">
          <Button text="인증하기" variant="default" onClick={handleSumbmit} />
        </div>
      </div>
    </>
  );
};

export default LiveVerification;
