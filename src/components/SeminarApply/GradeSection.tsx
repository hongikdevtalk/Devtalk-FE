import { SectionHeader } from '../../components/SeminarApply/SectionHeader';
import emptycircle from '../../assets/icons/components/SeminarApply/emptycircle.svg';
import chosencircle from '../../assets/icons/components/SeminarApply/chosencircle.svg';

type GradeSectionProps = {
  options: string[];
  selected: string | null;
  etcValue: string | null;
  onSelect: (grade: string) => void;
  onSelectEtc: (checked: boolean) => void;
  onChangeEtc: (value: string) => void;
};

export const GradeSection = ({
  options,
  selected,
  etcValue,
  onSelect,
  onSelectEtc,
  onChangeEtc,
}: GradeSectionProps) => (
  <div className="flex flex-col gap-20">
    <SectionHeader title="학년을 선택해주세요" required />
    <div className="flex flex-col gap-6">
      {options.map((g, i) => {
        const id = `grade-${i}`;
        return (
          <label key={id} htmlFor={id} className="group flex items-center gap-12 cursor-pointer">
            <input
              id={id}
              name="grade"
              type="radio"
              value={g}
              className="sr-only"
              checked={selected === g}
              onChange={() => onSelect(g)}
            />

            <span className="relative w-6 h-6 shrink-0">
              <img src={emptycircle} alt="" className="w-6 h-6" />
              <img
                src={chosencircle}
                alt=""
                className="w-3 h-3 absolute top-1/2 left-1/2
                           -translate-x-1/2 -translate-y-1/2
                           hidden group-has-[:checked]:block"
              />
            </span>

            <span className="body-1-medium text-white">{g}</span>
          </label>
        );
      })}

      {/* 기타 */}
      <label htmlFor="grade-other" className="group flex items-center gap-12 cursor-pointer">
        <input
          id="grade-other"
          name="grade"
          type="radio"
          value="기타"
          className="sr-only"
          checked={etcValue !== null}
          onChange={(e) => onSelectEtc(e.target.checked)}
        />

        <span className="relative w-6 h-6 shrink-0">
          <img src={emptycircle} alt="" className="w-6 h-6" />
          <img
            src={chosencircle}
            alt=""
            className="w-3 h-3 absolute top-1/2 left-1/2
                       -translate-x-1/2 -translate-y-1/2
                       hidden group-has-[:checked]:block"
          />
        </span>

        <span className="body-1-medium text-white shrink-0">기타:</span>
        <input
          type="text"
          value={etcValue ?? ''}
          onChange={(e) => onChangeEtc(e.target.value)}
          data-other-for="grade"
          className="flex-1 bg-transparent outline-none
             body-1-medium text-white
             border-b border-grey-900
             opacity-0 pointer-events-none transition-opacity
             group-has-[:checked]:opacity-100 group-has-[:checked]:pointer-events-auto
             focus:border-grey-600"
        />
      </label>
    </div>
  </div>
);
