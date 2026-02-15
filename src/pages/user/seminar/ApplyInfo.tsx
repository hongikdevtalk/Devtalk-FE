import ApplyHeader from '../../../components/SeminarApply/ApplyHeader';
import { Chip } from '../../../components/Chip/Chip';
import SpeakerInfo from '../../../components/SeminarApply/SpeakerInfo';
import ApplyForm from '../../../components/SeminarApply/ApplyForm';
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
  const [proceed, setProceed] = useState<null | (() => void)>(null);
  const [seminarId, setSeminarId] = useState<number | null>(null);
  const [seminarNum, setSeminarNum] = useState<number | null>(null);
  const [seminarDate, setSeminarDate] = useState<string>('-');
  const [place, setPlace] = useState<string>('-');
  const [sessions, setSessions] = useState<SeminarSession[]>([]);

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

  // 1) 홈 노출 세미나 조회
  useEffect(() => {
    const fetchShowSeminar = async () => {
      try {
        const res = await getShowSeminar();
        if (res?.isSuccess && res.result?.applicantActivate) {
          setSeminarNum(res.result?.seminarNum ?? null);
          setSeminarId(res.result?.seminarId ?? null);
        } else {
          setSeminarNum(null);
          setSeminarId(null);
        }
      } catch (e) {
        console.error('getShowSeminar error:', e);
      }
    };
    fetchShowSeminar();
  }, []);

  // 2) seminarId를 전역에 반영 (값이 바뀔 때만)
  useEffect(() => {
    if (seminarId != null && globalSeminarId !== seminarId) {
      setSeminarIdGlobal(seminarId);
    }
  }, [seminarId, globalSeminarId, setSeminarIdGlobal]);

  // 3) seminarId 기반 상세조회 (일시/장소)
  useEffect(() => {
    if (!seminarId) return;
    const fetchSeminarDetail = async () => {
      try {
        const res = await getUserSeminar(seminarId);
        if (res?.isSuccess && res.result) {
          setSeminarDate(res.result.seminarDate);
          setPlace(res.result.place);
        }
      } catch (e) {
        console.error('getUserSeminar error:', e);
      }
    };
    fetchSeminarDetail();
  }, [seminarId]);

  // 4) seminarId 기반 세션 목록 조회
  useEffect(() => {
    if (!seminarId) return;
    const fetchSessions = async () => {
      try {
        const res = await getSeminarSession(seminarId);
        if (res?.isSuccess && Array.isArray(res.result)) {
          setSessions(res.result as SeminarSession[]);
        }
      } catch (e) {
        console.error('getSeminarSession error:', e);
      }
    };
    fetchSessions();
  }, [seminarId]);

  return (
    <div className="flex flex-col gap-16 justify-center items-center mb-64">
      <ApplyHeader backTo={seminarId ? `/seminar/${seminarId}` : '/seminar'} />
      <div className="flex flex-col w-[335px] gap-80">
        <div className="flex flex-col gap-14">
          <div className="flex flex-col gap-32">
            <h1 className="heading-2-bold text-white">
              {seminarNum !== null ? `제 ${seminarNum}회 Devtalk Seminar` : 'DevTalk Seminar'}
            </h1>
            <div className="flex flex-col gap-48">
              {/* Outline 영역 */}
              <div className="flex flex-col gap-20">
                <Chip className="body-2-semibold" text="Outline" />
                <div className="flex flex-col gap-8">
                  <div className="flex flex-row gap-16">
                    <p className="body-1-medium text-grey-300">일시</p>
                    <p className="body-1-medium text-white">{seminarDate}</p>
                  </div>
                  <div className="flex flex-row gap-16">
                    <p className="body-1-medium text-grey-300">장소</p>
                    <p className="body-1-medium text-white">{place}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-12">
                  {sessions.length > 0 ? (
                    sessions.map((s) => (
                      <SpeakerInfo
                        key={s.sessionId}
                        name={s.speaker.name}
                        history={s.speaker.history}
                        organization={s.speaker.organization}
                        profileUrl={s.speaker.profileUrl}
                      />
                    ))
                  ) : (
                    <div className="text-grey-400 body-2-medium">세션 정보를 불러오는 중…</div>
                  )}
                </div>
              </div>

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
          <hr className="text-grey-700 w-full h-[1px]" />
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
