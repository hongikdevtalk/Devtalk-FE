import { SectionHeader } from '../../components/SeminarApply/SectionHeader';
import emptycircle from '../../assets/icons/components/SeminarApply/emptycircle.svg';
import chosencircle from '../../assets/icons/components/SeminarApply/chosencircle.svg';

type HowToKnowSectionProps = {
  options: string[];
  selected: string | null;
  etcValue: string | null;
  onSelect: (option: string) => void;
  onSelectEtc: (checked: boolean) => void;
  onChangeEtc: (value: string) => void;
};

export const HowToKnowSection = ({
  options,
  selected,
  etcValue,
  onSelect,
  onSelectEtc,
  onChangeEtc,
}: HowToKnowSectionProps) => (
  <div className="flex flex-col gap-20">
    <SectionHeader title="이번 세미나를 어떻게 알게 되었나요?" required />
    <div className="flex flex-col gap-6">
      {options.map((opt, i) => {
        const id = `howtoknow-${i}`;
        return (
          <label key={id} htmlFor={id} className="group flex items-center gap-12 cursor-pointer">
            <input
              id={id}
              name="howtoknow"
              type="radio"
              value={opt}
              className="sr-only"
              checked={selected === opt}
              onChange={() => onSelect(opt)}
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

            <span className="body-1-medium text-white">{opt}</span>
          </label>
        );
      })}

      {/* 기타 */}
      <label htmlFor="howtoknow-other" className="group flex items-center gap-12 cursor-pointer">
        <input
          id="howtoknow-other"
          name="howtoknow"
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
          data-other-for="howtoknow"
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
