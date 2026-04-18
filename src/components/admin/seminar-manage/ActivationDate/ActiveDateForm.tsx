import DateTimeSelector from './DateTimeSelector';

interface ActiveDateProps {
  applyStartDate: Date | null;
  applyEndDate: Date | null;
  onChange: (dateType: 'applyStartDate' | 'applyEndDate', newDate: Date | null) => void;
  applicationDateError?: string;
}

const ActiveDateForm = ({
  applyStartDate,
  applyEndDate,
  onChange,
  applicationDateError,
}: ActiveDateProps) => {
  return (
    <div className="space-y-6">
      {/* 세미나 신청 기간 */}
      <div className="bg-grey-900 p-6 rounded-10 min-h-[240px]">
        <h2 className="heading-2-bold text-white mb-6">세미나 신청 기간</h2>
        <div className="flex flex-col gap-y-9">
          <DateTimeSelector
            date={applyStartDate}
            onDateChange={(newDate) => onChange('applyStartDate', newDate)}
          />
          <div className="flex items-center gap-x-3 ml-auto">
            <span className="subhead-1-semibold text-white">~</span>
            <DateTimeSelector
              date={applyEndDate}
              onDateChange={(newDate) => onChange('applyEndDate', newDate)}
            />
          </div>
        </div>
        {applicationDateError && (
          <p className="text-status-error text-sm text-right mt-3">{applicationDateError}</p>
        )}
      </div>
    </div>
  );
};

export default ActiveDateForm;
