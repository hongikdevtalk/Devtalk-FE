import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NameSection } from './NameSection';
import { PhoneSection } from './PhoneSection';
import { StudentIdSection } from './StudentIdSection';
import { DepartmentSection } from './DepartmentSection';
import { GradeSection } from './GradeSection';
import { EmailSection } from './EmailSection';
import { HowToKnowSection } from './HowToKnowSection';
import { useApplyDraft } from '../../stores/useApplyDraft';
import { validateStudentId } from '../../utils/formatStudentId';
import { HOWTOKNOW } from '../../constants/seminarApplyInfo';
import { useEffect } from 'react';
import chevronleft from '../../assets/icons/common/chevronleft2.svg';

const ApplyForm = () => {
  const navigate = useNavigate();
  const draft = useApplyDraft();
  const [isDuplicateChecked, setIsDuplicateChecked] = useState(false);

  const isActive =
    !!draft.name.trim() &&
    validateStudentId(draft.studentNum || '') &&
    isDuplicateChecked &&
    !!draft.phone.trim() &&
    /\S+@\S+\.\S+/.test(draft.email || '') &&
    !!draft.departments[0]?.trim() &&
    !!draft.grade;

  useEffect(() => {
    if (!draft.participationType) {
      draft.setField('participationType', '온라인 Live (Q&A, 이벤트 참여 불가)');
    }
  }, [draft]);

  return (
    <div className="flex flex-col gap-80">
      <div className="flex flex-col">
        <NameSection value={draft.name} onChange={(v) => draft.setField('name', v)} />
        <StudentIdSection
          value={draft.studentNum}
          onChange={(v) => draft.setField('studentNum', v)}
          onDuplicateCheck={setIsDuplicateChecked}
        />
        <PhoneSection value={draft.phone} onChange={(v) => draft.setField('phone', v)} />
        <EmailSection value={draft.email} onChange={(v) => draft.setField('email', v)} />
        <DepartmentSection
          value={draft.departments[0] || ''}
          onChange={(v) => draft.setField('departments', v ? [v] : [])}
        />
        <GradeSection
          selected={draft.grade ? `${draft.grade}학년` : null}
          onSelect={(g) => {
            draft.setField('grade', parseInt(g[0]));
            draft.setField('gradeEtc', null);
          }}
        />
        <div className="mt-[30px]">
          <HowToKnowSection
            options={HOWTOKNOW}
            selected={draft.inflowPathEtc !== null ? '기타' : draft.inflowPath || null}
            etcValue={draft.inflowPathEtc}
            onSelect={(opt) => {
              draft.setField('inflowPath', opt);
              draft.setField('inflowPathEtc', null);
            }}
            onSelectEtc={(checked) => {
              draft.setField('inflowPath', '');
              draft.setField('inflowPathEtc', checked ? '' : null);
            }}
            onChangeEtc={(v) => draft.setField('inflowPathEtc', v)}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-[15px] cursor-pointer"
        >
          <img src={chevronleft} alt="이전" />
          <span className="heading-3-medium text-black cursor-pointer">이전</span>
        </button>
        <button
          type="button"
          onClick={() => { if (!isActive) return; navigate('/seminar/apply-question'); }}
          style={isActive ? {
            background: 'radial-gradient(557.08% 171.17% at 74.62% 100%, #ADE657 0%, #4CBCA5 100%)',
          } : {
            background: '#E8EAEF',
          }}
          className="cursor-pointer flex w-[125px] shrink-0 items-center justify-center gap-[10px] rounded-[10px] px-[45px] py-[16px]"
        >
          <span className={`heading-3-medium ${isActive ? 'text-white' : 'text-grey-700'}`}>다음</span>
        </button>
      </div>
    </div>
  );
};

export default ApplyForm;
