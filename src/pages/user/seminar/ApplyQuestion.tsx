import ApplyHeader from '../../../components/SeminarApply/ApplyHeader';
import SpeakerCard from '../../../components/SeminarApply/SpeakerCard';
import AutoResizeTextarea from '../../../components/SeminarApply/AutoResizeTextarea';
import { Button } from '../../../components/Button/Button';
import { useState, useEffect } from 'react';
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
  const draft = useApplyDraft();
  const seminarId = useApplyFlow((s) => s.seminarId);

  const [sessionIds, setSessionIds] = useState<number[]>([]);
  const [sessions, setSessions] = useState<SeminarSession[]>([]);

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
      <div className="flex flex-col gap-16 mb-[160px]">
        <ApplyHeader backTo="/seminar/apply-info" />
        <div className="flex flex-col gap-32">
          {/* 문구 */}
          <div className="flex flex-col gap-4 px-5">
            <div className="flex flex-row gap-4">
              <div className="heading-2-bold text-gradient">(선택)</div>
              <div className="heading-2-bold text-white">사전 질문란</div>
            </div>
            <div className="body-2-medium text-grey-300">
              연사님께서 질문 선별 후, Q&A 시간에 답변 드립니다.
            </div>
          </div>

          {/* 연사별 질문 */}
          <div className="flex flex-col">
            {sessions.map((s, idx) => (
              <div key={s.sessionId}>
                <div className="flex flex-col gap-16">
                  <SpeakerCard
                    name={s.speaker.name}
                    title={s.title}
                    organization={s.speaker.organization}
                    description={s.description}
                    profileUrl={s.speaker.profileUrl}
                  />
                  <AutoResizeTextarea
                    value={draft.questions[s.sessionId] ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      handleChangeQuestion(s.sessionId, e.target.value)
                    }
                    placeholder={`[${s.speaker.name}] 연사님께 드리고 싶은 질문을\n자유롭게 남겨주세요.`}
                  />
                </div>
                {idx < sessions.length - 1 && (
                  <hr className="border-t border-grey-700 w-[335px] mx-auto my-32" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button
        variant={submitting ? 'disabled' : 'default'}
        text={submitting ? '신청 중...' : '신청하기'}
        onClick={handleClickApply}
        className="fixed bottom-[64px] left-1/2 -translate-x-1/2 z-50"
      />

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
