import { useNavigate } from 'react-router-dom';
import Header from '../../../components/common/Header';
import { useState } from 'react';
import { useSeminarAuth } from '../../../hooks/SeminarLive/useSeminarAuth';
import { STORAGE_KEY } from '../../../constants/key';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import SeminarDetailCard from '../../../components/Seminar/SeminarDetailCard';
import { useShowSeminar } from '../../../contexts/ShowSeminarContext';
import VerifyButton from '../../../components/Button/VerifyButton';
import Modal from '../../../components/Modal/Modal';

const LiveVerification = () => {
  const navigate = useNavigate();
  const [studentNum, setStudentNum] = useState('');
  const [name, setName] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
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
            setModalOpen(true);
          }
        },
      }
    );
  };
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const { seminarId } = useShowSeminar();

  const isActive = studentNum.trim() !== '' && name.trim() !== '';

  return (
    <>
      <Header hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen} />
      {isPending && <LoadingSpinner />}
      <Modal
        open={modalOpen}
        title="출석에 실패했습니다."
        body="신청자를 명단에서 확인할 수 없습니다. 이름과 학번을 다시 한 번 확인해주세요."
        onClose={() => setModalOpen(false)}
      />
      <div className="pt-[70px]">
        {seminarId && <SeminarDetailCard id={seminarId} showDownload={false} showThumbnail={false} />}
        <div className="mt-[30px] h-[2px] shrink-0 self-stretch bg-[#E8EAEF]" />
        <div className="flex flex-col px-20 pt-[30px] pb-[10px] justify-center items-start gap-12 self-stretch">
          <p className="text-black">출석을 위해 아래 내용을 작성해주세요</p>
        </div>
        <div className="flex flex-col px-20 gap-12 mt-[20px]">
          <div className="flex flex-col gap-12">
            <p className="subhead-1-medium text-black">이름</p>
            <input
              type="text"
              placeholder="이름을 입력해주세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-[56px] px-20 py-16 items-center self-stretch rounded-[3px] border-[1.4px] border-[#7B7E84] bg-transparent text-black text-[20px] font-normal placeholder:text-[#7B7E84] placeholder:text-[20px] placeholder:font-normal focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-12">
            <p className="subhead-1-medium text-black">학번</p>
            <input
              type="text"
              placeholder="C000000"
              value={studentNum}
              onChange={(e) => setStudentNum(e.target.value)}
              className="flex h-[56px] px-20 py-16 items-center self-stretch rounded-[3px] border-[1.4px] border-[#7B7E84] bg-transparent text-black text-[20px] font-normal placeholder:text-[#7B7E84] placeholder:text-[20px] placeholder:font-normal focus:outline-none"
            />
          </div>
        </div>
        <div className="flex justify-end px-20 mt-[200px]">
          <VerifyButton isActive={isActive} onClick={handleSumbmit} />
        </div>
      </div>
    </>
  );
};

export default LiveVerification;
