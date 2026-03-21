import { useState } from 'react';
import chevronDown from '../../../../assets/icons/common/chevrondown.svg';
import { DATE_OPTIONS, DATE_UNITS } from '../MockView'; // 경로에 맞춰 수정

interface DateRangeProps {
  onApply: (startDate: string, endDate: string) => void;
}

const DateRange = ({ onApply }: DateRangeProps) => {
  const [startValues, setStartValues] = useState<Record<string, string>>({
    years: '2024',
    months: '01',
    days: '01',
    hours: '00',
    minutes: '00',
  });
  const [endValues, setEndValues] = useState<Record<string, string>>({
    years: '2024',
    months: '01',
    days: '01',
    hours: '00',
    minutes: '00',
  });

  const handleApply = () => {
    const startStr = `${startValues.years}-${startValues.months}-${startValues.days} ${startValues.hours}:${startValues.minutes}`;
    const endStr = `${endValues.years}-${endValues.months}-${endValues.days} ${endValues.hours}:${endValues.minutes}`;
    onApply(startStr, endStr);
  };
  const renderSelectGroup = (
    currentValues: Record<string, string>,
    setValues: React.Dispatch<React.SetStateAction<Record<string, string>>>
  ) => (
    <div className="flex gap-x-2 items-center">
      {DATE_UNITS.map((unit) => (
        <div key={unit.key} className="relative">
          <select
            value={currentValues[unit.key]}
            onChange={(e) => setValues({ ...currentValues, [unit.key]: e.target.value })}
            className="appearance-none bg-[#222222] text-white border border-black px-4 py-1 pr-10 rounded-4 text-sm cursor-pointer min-w-[70px]"
          >
            {DATE_OPTIONS[unit.key as keyof typeof DATE_OPTIONS].map((val: string) => (
              <option key={val} value={val}>
                {val}
                {unit.label}
              </option>
            ))}
          </select>
          <img
            src={chevronDown}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-3 invert pointer-events-none"
            alt=""
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full mt-10 flex items-center justify-between px-4">
      <div className="flex items-center gap-x-6">
        <span className="text-white subhead-1-bold">기간</span>
        <div className="flex flex-col gap-y-3">
          <div className="flex items-center">
            {renderSelectGroup(startValues, setStartValues)}
            <span className="text-black mx-2">~</span>
          </div>
          <div className="flex items-center">{renderSelectGroup(endValues, setEndValues)}</div>
        </div>
      </div>
      <button
        onClick={handleApply}
        className="ml-4 bg-[#ade657] text-black px-6 py-4 rounded-8 subhead-2-bold hover:opacity-80 transition-all"
      >
        적용
      </button>
    </div>
  );
};

export default DateRange;
