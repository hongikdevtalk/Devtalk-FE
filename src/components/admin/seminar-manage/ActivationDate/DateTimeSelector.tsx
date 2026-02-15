import { useMemo } from 'react';
import CustomSelect from './CustomSelect';

interface DateTimeSelectorProps {
  date: Date | null;
  onDateChange: (newDate: Date | null) => void;
}

const DateTimeSelector = ({ date, onDateChange }: DateTimeSelectorProps) => {
  const handleSelectChange = (
    part: 'year' | 'month' | 'day' | 'hour' | 'minute',
    value: number | string
  ) => {
    if (value === '') {
      onDateChange(null);
      return;
    }

    const currentDate = date || new Date();
    const newDate = new Date(currentDate);

    if (part === 'year') newDate.setFullYear(value as number);
    if (part === 'month') newDate.setMonth((value as number) - 1);
    if (part === 'day') newDate.setDate(value as number);
    if (part === 'hour') newDate.setHours(value as number);
    if (part === 'minute') newDate.setMinutes(value as number);

    const roundedMinutes = Math.floor(newDate.getMinutes() / 15) * 15;
    newDate.setMinutes(roundedMinutes);
    newDate.setSeconds(0, 0);

    onDateChange(newDate);
  };

  const getDayInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const yearOptions = useMemo(
    () => [
      { value: '', label: '선택' },
      ...Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i).map((y) => ({
        value: y,
        label: String(y),
      })),
    ],
    []
  );

  const monthOptions = useMemo(
    () => [
      { value: '', label: '선택' },
      ...Array.from({ length: 12 }, (_, i) => i + 1).map((m) => ({
        value: m,
        label: String(m).padStart(2, '0'),
      })),
    ],
    []
  );

  const daysInSelectedMonth = date ? getDayInMonth(date.getFullYear(), date.getMonth() + 1) : 31;

  const dayOptions = useMemo(
    () => [
      { value: '', label: '선택' },
      ...Array.from({ length: daysInSelectedMonth }, (_, i) => i + 1).map((d) => ({
        value: d,
        label: String(d).padStart(2, '0'),
      })),
    ],
    [daysInSelectedMonth]
  );

  const hourOptions = useMemo(
    () => [
      { value: '', label: '선택' },
      ...Array.from({ length: 24 }, (_, i) => i).map((h) => ({
        value: h,
        label: String(h).padStart(2, '0'),
      })),
    ],
    []
  );

  const minuteOptions = useMemo(
    () => [
      { value: '', label: '선택' },
      ...[0, 15, 30, 45].map((m) => ({
        value: m,
        label: String(m).padStart(2, '0'),
      })),
    ],
    []
  );

  const roundedMinutes = date ? Math.floor(date.getMinutes() / 15) * 15 : '';

  return (
    <div className="flex items-center gap-5">
      {/* 연도 */}
      <div className="flex items-center gap-[6px]">
        <CustomSelect
          options={yearOptions}
          selectedValue={date?.getFullYear() || ''}
          onSelect={(value) => handleSelectChange('year', value)}
        />
        <span className="subhead-1-medium text-white">년</span>
      </div>

      {/* 월 */}
      <div className="flex items-center gap-[6px]">
        <CustomSelect
          options={monthOptions}
          selectedValue={date ? date.getMonth() + 1 : ''}
          onSelect={(value) => handleSelectChange('month', value)}
        />
        <span className="subhead-1-medium text-white">월</span>
      </div>

      {/* 일 */}
      <div className="flex items-center gap-[6px]">
        <CustomSelect
          options={dayOptions}
          selectedValue={date?.getDate() || ''}
          onSelect={(value) => handleSelectChange('day', value)}
        />
        <span className="subhead-1-medium text-white">일</span>
      </div>

      {/* 시간 : 분 */}
      <div className="flex items-center gap-[6px]">
        <CustomSelect
          options={hourOptions}
          selectedValue={date?.getHours() || ''}
          onSelect={(value) => handleSelectChange('hour', value)}
        />
        <span className="heading-3-semibold text-white">:</span>
        <CustomSelect
          options={minuteOptions}
          selectedValue={roundedMinutes}
          onSelect={(value) => handleSelectChange('minute', value)}
        />
      </div>
    </div>
  );
};

export default DateTimeSelector;
