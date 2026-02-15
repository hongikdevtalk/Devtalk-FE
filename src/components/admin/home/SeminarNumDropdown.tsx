import dropdown from '/src/assets/icons/common/dropdown.svg';

interface SeminarNumDropdownProps {
  options: number[];
  selected: number | null;
  onChange: (value: number | null) => void;
}

const SeminarNumDropdown = ({ options, selected, onChange }: SeminarNumDropdownProps) => {
  const sortedOptions = ['없음', ...options.sort((a, b) => b - a).map(Number)];
  const displayValue = selected === null ? '없음' : selected;

  return (
    <div className="relative">
      <select
        className="w-full h-[66px] appearance-none rounded-8 bg-grey-700 text-grey-300 px-24 py-20 text-semibold focus:outline-none"
        value={displayValue}
        onChange={(e) => {
          const value = e.target.value === '없음' ? null : Number(e.target.value);
          onChange(value);
        }}
      >
        {sortedOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <img src={dropdown} className="w-[23px] h-[16px] absolute right-[24px] top-[24px]" />
    </div>
  );
};
export default SeminarNumDropdown;
