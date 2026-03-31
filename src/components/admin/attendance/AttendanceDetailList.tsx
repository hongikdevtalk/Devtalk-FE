import emptybox from '../../../assets/icons/components/SeminarApply/emptybox.svg';
import checkbox from '../../../assets/icons/components/SeminarApply/checkbox.svg';

interface AttendanceItem {
  id: number;
  seminarName: string;
  studentNum: string;
  name: string;
  contact: string;
  attendanceTime: string;
  isAttendance: boolean;
}

interface AttendanceDetailListProps {
  attendances: AttendanceItem[];
}

const AttendanceDetailList: React.FC<AttendanceDetailListProps> = ({ attendances }) => {
  const headerStyle = 'border border-grey-400 px-5 py-3 text-center subhead-1-semibold text-white';
  const cellStyle = 'border border-grey-400 px-5 py-3 text-center body-1-semibold text-white';

  const headers = ['세미나명', '학번', '이름', '연락처', '출석 시간', '출석 여부'];
  const dataKeys = ['seminarName', 'studentNum', 'name', 'contact', 'attendanceTime'] as const;

  return (
    <div className="w-full">
      <div className={`overflow-x-auto overflow-y-auto max-h-[calc(100vh-150px)] ${attendances.length === 0 ? 'flex justify-center' : ''}`}>
        <table className="min-w-max border-collapse">
          <thead>
            <tr className="bg-grey-900">
              {headers.map((header) => (
                <th key={header} className={headerStyle}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {attendances.map((item) => (
              <tr key={item.id} className="bg-grey-700 hover:ring-2 hover:ring-green-300 hover:ring-inset cursor-pointer">
                {dataKeys.map((key) => (
                  <td key={key} className={cellStyle}>
                    {item[key]}
                  </td>
                ))}
                <td className={cellStyle}>
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src={item.isAttendance ? checkbox : emptybox}
                      alt={item.isAttendance ? '출석' : '미출석'}
                      className="w-6 h-6"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {attendances.length === 0 && (
        <div className="text-center py-8 text-white subhead-1-medium">
          출석 정보가 없습니다.
        </div>
      )}
    </div>
  );
};

export default AttendanceDetailList;
