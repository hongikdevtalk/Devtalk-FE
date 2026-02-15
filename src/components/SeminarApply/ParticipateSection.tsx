import { SectionHeader } from '../../components/SeminarApply/SectionHeader';
import emptycircle from '../../assets/icons/components/SeminarApply/emptycircle.svg';
import chosencircle from '../../assets/icons/components/SeminarApply/chosencircle.svg';

type ParticipateSectionProps = {
  options: string[];
  selected: string | null;
  onSelect: (label: string) => void;
};

export const ParticipateSection = ({ options, selected, onSelect }: ParticipateSectionProps) => (
  <div className="flex flex-col gap-5">
    <SectionHeader
      title="어떤 방식으로 참여하시겠어요?"
      required
      helperText="세미나 활성화를 위해 가급적 오프라인으로 함께해 주세요 🙌"
    />
    <div className="flex flex-col gap-16">
      {options.map((opt, i) => {
        const id = `participate-${i}`;
        const checked = selected === opt;

        return (
          <label key={id} htmlFor={id} className="group flex items-center gap-12 cursor-pointer">
            <input
              id={id}
              name="participate"
              type="radio"
              value={opt}
              className="sr-only"
              checked={checked}
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
    </div>
  </div>
);
