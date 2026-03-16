import { Chip } from '../../../components/Chip/Chip';
import ApplyForm from '../../../components/SeminarApply/ApplyForm';
import Header from '../../../components/common/Header';
import { useState, useEffect } from 'react';
import { useBlocker } from 'react-router-dom';
import ApplyExitModal from '../../../components/Modal/ApplyExitModal';
import { useApplyDraft } from '../../../stores/useApplyDraft';
import { useApplyFlow } from '../../../stores/useApplyFlow';

const ApplyInfo = () => {
  const [exitOpen, setExitOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [proceed, setProceed] = useState<null | (() => void)>(null);
  const [seminarNum] = useState<number | null>(10);
  const [sessions] = useState([
    { sessionId: 1, speaker: { name: '김개발' } },
    { sessionId: 2, speaker: { name: '이디자인' } },
  ]);

  const resetFlow = useApplyFlow((s) => s.reset);

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (
      currentLocation.pathname === '/seminar/apply-info' &&
      nextLocation.pathname !== '/seminar/apply-question'
    ) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (blocker.state === 'blocked') {
      setExitOpen(true);
      setProceed(() => blocker.proceed);
    }
  }, [blocker]);

  return (
    <div className="flex flex-col items-center mb-64">
      <Header hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen} />
      <div className="flex flex-col w-[375px] gap-80 pt-[56px]">
        <div className="flex flex-col">
          <div className="flex flex-col gap-32">
            {seminarNum !== null && <Chip text={`${seminarNum}회차`} />}
            <div className="flex flex-col">
              <p className="heading-3-medium text-black">제목</p>
              <p className="body-1-light text-grey-700">강연 주제를 한 줄로 요약하여 적어주세요.</p>
              <div className="flex flex-row items-center gap-[12px] mt-16">
                <p className="subhead-medium text-black">연사</p>
                <p className="subhead-light text-black">
                  {sessions.map((s, i) => `${i + 1}부 ${s.speaker.name} 님`).join(' / ')}
                </p>
              </div>
              <div className="mt-[30px] h-[2px] self-stretch bg-grey-400" />
              <p className="heading-3-medium text-black mt-[30px]">세미나 신청을 위해 아래 내용을 작성해주세요.</p>
            </div>
          </div>
          {/* 신청폼 부분 */}
          <ApplyForm />
        </div>
      </div>
      <ApplyExitModal
        open={exitOpen}
        onConfirm={() => {
          useApplyDraft.getState().reset();
          sessionStorage.removeItem('apply-draft');
          resetFlow();
          setExitOpen(false);
          proceed?.();
        }}
        onCancel={() => {
          setExitOpen(false);
          blocker.reset?.();
        }}
      />
    </div>
  );
};

export default ApplyInfo;
