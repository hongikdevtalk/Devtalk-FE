import { useState } from 'react';
import arrowdown from '../../assets/icons/common/arrowdown.svg';

type GradeSectionProps = {
  selected: string | null;
  onSelect: (grade: string) => void;
};

export const GradeSection = ({ selected, onSelect }: GradeSectionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col mt-[30px]">
      <p className="subhead-medium text-black">학년</p>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-[56px] px-[20px] items-center justify-between self-stretch rounded-[3px] border-[1.4px] border-grey-700 mt-[12px]"
      >
        <span className={`heading-3-regular-normal ${selected ? 'text-black' : 'text-grey-700'}`}>
          {selected || '학년을 선택해주세요.'}
        </span>
        <img src={arrowdown} alt="열기" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-[375px] bg-white rounded-t-[16px] px-[20px] pt-[24px] pb-[40px] flex flex-col">
            {['1학년', '2학년', '3학년', '4학년','5학년'].map((grade) => (
              <button
                key={grade}
                type="button"
                onClick={() => { onSelect(grade); setOpen(false); }}
                className={`h-[52px] flex items-center px-[4px] heading-3-regular-normal ${selected === grade ? 'text-black font-medium' : 'text-grey-700'}`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
