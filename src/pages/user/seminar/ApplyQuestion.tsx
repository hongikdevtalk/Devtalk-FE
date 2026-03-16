import Header from '../../../components/common/Header';
import { Chip } from '../../../components/Chip/Chip';
import { SessionQuestionCard } from '../../../components/SeminarApply/SessionQuestionCard';
import chevronleft from '../../../assets/icons/common/chevronleft2.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApplySuccessModal from '../../../components/Modal/ApplySuccessModal';
import ApplyAlertModal from '../../../components/Modal/ApplyAlertModal';
import { useApplyDraft } from '../../../stores/useApplyDraft';
import { useApplyFlow } from '../../../stores/useApplyFlow';
import { postApplySeminar } from '../../../apis/seminarApply';
import type {
  SeminarApplyRequest,
  SeminarApplyResponse,
} from '../../../types/Applicants/seminarApply';
import { getUserSeminar } from '../../../apis/userSeminar/userSeminarApi';
import { getSeminarSession } from '../../../apis/seminarDetail';
import { mapParticipation, mapInflowPath } from '../../../utils/mapEnums';

type SeminarSession = {
  sessionId: number;
  title: string;
  description: string;
  speaker: {
    name: string;
    organization?: string;
    profileUrl?: string;
    history?: string;
    speakerId: number;
  };
};

const ApplyQuestion = () => {
  const navigate = useNavigate();
  const draft = useApplyDraft();
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const [seminarNum] = useState<number | null>(10);
  const seminarId = useApplyFlow((s) => s.seminarId);

  const [sessionIds, setSessionIds] = useState<number[]>([]);
  const [sessions, setSessions] = useState<SeminarSession[]>([
    {
      sessionId: 1,
      title: '프론트엔드 개발자의 커리어 여정',
      description: '프론트엔드 개발자로 성장하는 방법에 대해 이야기합니다.',
      speaker: { speakerId: 1, name: '김개발', organization: '카카오', profileUrl: '', history: '' },
    },
    {
      sessionId: 2,
      title: '디자인 시스템 구축기',
      description: '실무에서 디자인 시스템을 구축한 경험을 공유합니다.',
      speaker: { speakerId: 2, name: '이디자인', organization: '토스', profileUrl: '', history: '' },
    },
  ]);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successType, setSuccessType] = useState<'online' | 'offline' | null>(null);

  // 해당 세미나의 세션 id 리스트 (질문 저장용 키)
  useEffect(() => {
    if (!seminarId) return;
    (async () => {
      try {
        const res = await getUserSeminar(seminarId);
        if (res.isSuccess && res.result) {
          setSessionIds(res.result.sessionIds ?? []);
        }
      } catch (e) {
        console.error('세미나 상세 조회 실패:', e);
      }
    })();
  }, [seminarId]);

  // 세션 상세(연사 정보, 제목/설명 등) 조회 → UI 렌더링에 사용
  useEffect(() => {
    if (!seminarId) return;
    (async () => {
      try {
        const res = await getSeminarSession(seminarId);
        if (res.isSuccess && Array.isArray(res.result)) {
          setSessions(res.result as SeminarSession[]);
        }
      } catch (e) {
        console.error('세미나 세션 목록 조회 실패:', e);
      }
    })();
  }, [seminarId]);

  const handleChangeQuestion = (sessionId: number, value: string) => {
    draft.setQuestion(sessionId, value);
  };

  const handleClickApply = async () => {
    if (submitting) return;
    setSubmitting(true);

    const questions = sessionIds
      .map((id) => ({
        sessionId: id,
        content: (draft.questions[id] ?? '').trim(),
      }))
      .filter((q) => q.content.length > 0);

    // 한국어 라벨 → 백엔드 enum 매핑 (요청 직전에만)
    const participationEnum = mapParticipation(draft.participationType);
    const inflowEnum = mapInflowPath(draft.inflowPath || '');

    const nextSuccessType: 'online' | 'offline' =
      participationEnum === 'ONLINE' ? 'online' : 'offline';
    setSuccessType(nextSuccessType);

    const body: SeminarApplyRequest = {
      studentNum: draft.studentNum,
      name: draft.name,
      grade: draft.grade,
      gradeEtc: draft.gradeEtc,
      email: draft.email,
      phone: draft.phone,
      departments: draft.departments,
      departmentEtc: draft.departmentEtc,
      participationType: participationEnum,
      inflowPath: inflowEnum,
      inflowPathEtc: draft.inflowPathEtc,
      questions,
    };

    try {
      const res: SeminarApplyResponse = await postApplySeminar(body);
      if (res.isSuccess) {
        try {
          useApplyDraft.getState().reset();
          (useApplyDraft as any).persist?.clearStorage?.();
          sessionStorage.removeItem('apply-draft');
          (useApplyDraft as any).persist?.rehydrate?.();
        } catch (err) {
          console.error('Failed to clear apply-draft:', err);
        }
        setOpenSuccess(true);
      } else {
        setOpenAlert(true);
      }
    } catch {
      setOpenAlert(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header hamburgerOpen={hamburgerOpen} setHamburgerOpen={setHamburgerOpen} />
      <div className="flex flex-col gap-16 mb-[160px] pt-[86px]">
        {/* 세미나 정보 */}
        <div className="flex flex-col w-[375px] px-[20px] gap-32">
          {seminarNum !== null && <Chip text={`${seminarNum}회차`} />}
          <div className="flex flex-col">
            <p className="heading-3-medium text-black">세미나 제목</p>
            <p className="body-1-light text-grey-700">강연 주제를 한 줄로 요약하여 적어주세요.</p>
            <div className="flex flex-row items-center gap-[12px] mt-16">
              <p className="subhead-medium text-black">연사</p>
              <p className="subhead-light text-black">
                {sessions.map((s, i) => `${i + 1}부 ${s.speaker.name} 님`).join(' / ')}
              </p>
            </div>
            <div className="mt-[30px] h-[2px] self-stretch bg-grey-400" />
          </div>
        </div>

        <div className="flex flex-col w-[375px] px-[20px]">
          <p className="subhead-medium text-black">연사님께 직접 묻고 싶은 질문을 남겨주세요!</p>
          <p className="body-1-light text-grey-700 mt-[12px]">*작성해주신 질문은 연사님께 전달됩니다.</p>
          <div className="flex flex-col gap-[30px] mt-[30px]">
            {sessions.slice(0, 2).map((s, i) => (
              <SessionQuestionCard
                key={s.sessionId}
                index={i + 1}
                title={s.title}
                value={draft.questions[s.sessionId] ?? ''}
                onChange={(v) => handleChangeQuestion(s.sessionId, v)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center w-[375px] px-[20px] mt-[30px] mb-[64px]">
        <button
          type="button"
          onClick={() => navigate('/seminar/apply-info')}
          className="flex items-center gap-[15px] cursor-pointer"
        >
          <img src={chevronleft} alt="이전" />
          <span className="heading-3-medium text-black">이전</span>
        </button>
        <button
          type="button"
          onClick={handleClickApply}
          disabled={submitting}
          style={{ background: submitting ? '#E8EAEF' : 'radial-gradient(557.08% 171.17% at 74.62% 100%, #ADE657 0%, #4CBCA5 100%)' }}
          className="flex w-[125px] shrink-0 items-center justify-center gap-[10px] rounded-[10px] px-[45px] py-[16px] cursor-pointer"
        >
          <span className={`heading-3-medium ${submitting ? 'text-grey-700' : 'text-white'}`}>
            {submitting ? '신청 중...' : '등록'}
          </span>
        </button>
      </div>

      <ApplySuccessModal
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        type={successType ?? 'offline'}
      />
      <ApplyAlertModal open={openAlert} onClose={() => setOpenAlert(false)} />
    </>
  );
};

export default ApplyQuestion;
