import { useState } from 'react';
import chevronDown from '../../../../assets/icons/common/chevrondown.svg';

interface DateRangeProps {
  onApply: (startDate: string, endDate: string) => void;
  availableDates: string[];
  initialStart?: Record<string, string>;
  initialEnd?: Record<string, string>;
}

const DateRange = ({ onApply, initialStart, initialEnd }: DateRangeProps) => {
  const YEARS = ['2024', '2025', '2026'];
  const MONTHS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));

  const [startValues, setStartValues] = useState(
    initialStart || { years: '2026', months: '01', days: '01' }
  );
  const [endValues, setEndValues] = useState(
    initialEnd || { years: '2026', months: '01', days: '01' }
  );
  const handleApply = () => {
    const from = `${startValues.years}-${startValues.months}-${startValues.days}`;
    const to = `${endValues.years}-${endValues.months}-${endValues.days}`;
    onApply(from, to);
  };

  const renderSelectGroup = (currentValues: any, setValues: any) => (
    <div className="flex gap-x-2 items-center">
      {[
        { key: 'years', options: YEARS, label: '년' },
        { key: 'months', options: MONTHS, label: '월' },
        { key: 'days', options: DAYS, label: '일' },
      ].map((unit) => (
        <div key={unit.key} className="relative">
          <select
            value={currentValues[unit.key as keyof typeof currentValues]}
            onChange={(e) => setValues({ ...currentValues, [unit.key]: e.target.value })}
            className="appearance-none bg-[#222222] text-white border border-black px-4 py-1 pr-10 rounded-4 text-sm cursor-pointer min-w-[80px]"
          >
            {unit.options.map((val) => (
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
            <span className="text-white mx-2">~</span>
          </div>
          <div className="flex items-center">{renderSelectGroup(endValues, setEndValues)}</div>
        </div>
      </div>

      <button
        onClick={handleApply}
        className="ml-4 bg-primary-200 text-black px-6 py-4 rounded-8 subhead-2-bold hover:opacity-80 transition-all"
      >
        적용
      </button>
    </div>
  );
};

export default DateRange;
