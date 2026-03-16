import { Chip } from '../../../components/Chip/Chip';
import ApplyForm from '../../../components/SeminarApply/ApplyForm';
import Header from '../../../components/common/Header';
import { useState, useEffect } from 'react';
import { useBlocker } from 'react-router-dom';
import ApplyExitModal from '../../../components/Modal/ApplyExitModal';
import { useApplyDraft } from '../../../stores/useApplyDraft';
import { getShowSeminar } from '../../../apis/ShowSeminar/userShowSeminar';
import { getUserSeminar } from '../../../apis/userSeminar/userSeminarApi';
import { getSeminarSession } from '../../../apis/seminarDetail';
import { useApplyFlow } from '../../../stores/useApplyFlow';

type SeminarSession = {
  sessionId: number;
  title: string;
  description: string;
  speaker: {
    name: string;
    organization?: string;
    history?: string;
    profileUrl?: string;
    speakerId: number;
  };
};

const ApplyInfo = () => {
  const [exitOpen, setExitOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [proceed, setProceed] = useState<null | (() => void)>(null);
  const [seminarId, setSeminarId] = useState<number | null>(1);
  const [seminarNum, setSeminarNum] = useState<number | null>(10);
  const [seminarDate, setSeminarDate] = useState<string>('2026.03.20 19:00');
  const [place, setPlace] = useState<string>('홍익대학교 홍문관 401호');
  const [sessions, setSessions] = useState<SeminarSession[]>([
    {
      sessionId: 1,
      title: '프론트엔드 개발자의 커리어 여정',
      description: '프론트엔드 개발자로 성장하는 방법에 대해 이야기합니다.',
      speaker: {
        speakerId: 1,
        name: '김개발',
        organization: '카카오',
        history: '카카오 프론트엔드 개발자- 네이버 UI 개발팀- 홍익대학교 컴퓨터공학과',
        profileUrl: '',
      },
    },
    {
      sessionId: 2,
      title: '디자인 시스템 구축기',
      description: '실무에서 디자인 시스템을 구축한 경험을 공유합니다.',
      speaker: {
        speakerId: 2,
        name: '이디자인',
        organization: '토스',
        history: '토스 디자인 엔지니어- 라인 UI/UX 개발자- 홍익대학교 시각디자인과',
        profileUrl: '',
      },
    },
  ]);

  const globalSeminarId = useApplyFlow((s) => s.seminarId);
  const setSeminarIdGlobal = useApplyFlow((s) => s.setSeminarId);
  const resetFlow = useApplyFlow((s) => s.reset);

  // 페이지 이동 시 모달 창 띄우기
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

  // TODO: 목데이터 확인 후 주석 해제
  // // 1) 홈 노출 세미나 조회
  // useEffect(() => {
  //   const fetchShowSeminar = async () => {
  //     try {
  //       const res = await getShowSeminar();
  //       if (res?.isSuccess && res.result?.applicantActivate) {
  //         setSeminarNum(res.result?.seminarNum ?? null);
  //         setSeminarId(res.result?.seminarId ?? null);
  //       } else {
  //         setSeminarNum(null);
  //         setSeminarId(null);
  //       }
  //     } catch (e) {
  //       console.error('getShowSeminar error:', e);
  //     }
  //   };
  //   fetchShowSeminar();
  // }, []);

  // // 2) seminarId를 전역에 반영 (값이 바뀔 때만)
  // useEffect(() => {
  //   if (seminarId != null && globalSeminarId !== seminarId) {
  //     setSeminarIdGlobal(seminarId);
  //   }
  // }, [seminarId, globalSeminarId, setSeminarIdGlobal]);

  // // 3) seminarId 기반 상세조회 (일시/장소)
  // useEffect(() => {
  //   if (!seminarId) return;
  //   const fetchSeminarDetail = async () => {
  //     try {
  //       const res = await getUserSeminar(seminarId);
  //       if (res?.isSuccess && res.result) {
  //         setSeminarDate(res.result.seminarDate);
  //         setPlace(res.result.place);
  //       }
  //     } catch (e) {
  //       console.error('getUserSeminar error:', e);
  //     }
  //   };
  //   fetchSeminarDetail();
  // }, [seminarId]);

  // // 4) seminarId 기반 세션 목록 조회
  // useEffect(() => {
  //   if (!seminarId) return;
  //   const fetchSessions = async () => {
  //     try {
  //       const res = await getSeminarSession(seminarId);
  //       if (res?.isSuccess && Array.isArray(res.result)) {
  //         setSessions(res.result as SeminarSession[]);
  //       }
  //     } catch (e) {
  //       console.error('getSeminarSession error:', e);
  //     }
  //   };
  //   fetchSessions();
  // }, [seminarId]);

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
            <div className="flex flex-col gap-48">
              {/* 온라인 LIVE 안내 영역 */}
              {/* <div className="flex flex-col gap-20">
                <Chip className="body-2-semibold" text="온라인 LIVE 안내" />
                <div className="flex flex-col gap-8">
                  <div className="subhead-1-semibold text-white">
                    현장 참석이 어려운 분들을 위해
                    <br />
                    <span className="text-gradient">온라인 라이브</span>를 병행합니다!
                  </div>
                  <p className="caption-medium text-grey-300">
                    * 첫 라이브 진행으로, 진행이 원활하지 않을 수 있습니다.
                  </p>
                  <LiveInfo />
                </div>
              </div> */}
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
