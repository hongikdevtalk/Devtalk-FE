import selectionbutton from '../../assets/icons/common/selectionbutton.svg';
import active_selectionbutton from '../../assets/icons/common/active_selectionbutton.svg';

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
    <p className="subhead-medium text-black">유입경로(선택)</p>
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
            <img src={selected === opt ? active_selectionbutton : selectionbutton} alt="" className="shrink-0" />
            <span className="heading-3-light-normal text-black">{opt}</span>
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
        <img src={etcValue !== null ? active_selectionbutton : selectionbutton} alt="" className="shrink-0" />
        <span className="heading-3-light-normal text-black shrink-0">기타:</span>
        <input
          type="text"
          value={etcValue ?? ''}
          onChange={(e) => onChangeEtc(e.target.value)}
          data-other-for="howtoknow"
          className="flex-1 bg-transparent outline-none heading-3-light-normal text-black
             border-b border-grey-600
             opacity-0 pointer-events-none transition-opacity
             group-has-[:checked]:opacity-100 group-has-[:checked]:pointer-events-auto"
        />
      </label>
    </div>
  </div>
);
