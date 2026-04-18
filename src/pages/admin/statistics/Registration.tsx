import { useState, useEffect } from 'react';
import chevronDown from '../../../assets/icons/common/chevrondown.svg';
import AttendanceTab from './tabs/AttendanceTab';
import DeptYearTab from './tabs/DeptYearTab';
import InflowTab from './tabs/InflowTab';
import { getSeminarStatistics } from '../../../apis/Applicants/seminarStatisticsApi';
import { useSeminarNums } from '../../../hooks/Applicants/useSeminarNums';

interface InflowData {
  inflowType: string;
  count: number;
  inflowRate: number;
}

interface DepartmentRatio {
  department: string;
  count: number;
  percentage: number;
}

interface GradeRatio {
  grade: string;
  count: number;
  percentage: number;
}

interface AttendanceSummary {
  totalApplicants: number;
  presentCount: number;
  attendanceRate: number;
}

interface StatsResponse {
  seminarNum: number;
  departmentRatios: DepartmentRatio[];
  gradeRatios: GradeRatio[];
  attendanceSummary: AttendanceSummary;
  inflows: InflowData[];
}

const StatisticsRegistration = () => {
  const { data: seminarNumsData, isLoading: isNumsLoading } = useSeminarNums();

  const [selectedRound, setSelectedRound] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'attendance' | 'deptYear' | 'inflow'>('attendance');
  const [statsData, setStatsData] = useState<StatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (seminarNumsData?.result && selectedRound === null) {
      setSelectedRound(seminarNumsData.result[0].seminarNum);
    }
  }, [seminarNumsData, selectedRound]);

  const currentSeminar = (seminarNumsData?.result || []).find(
    (s) => s.seminarNum === selectedRound
  );
  const currentId = currentSeminar?.seminarId;

  useEffect(() => {
    if (!currentId) return;

    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const res = await getSeminarStatistics(currentId);

        if (res && res.isSuccess) {
          setStatsData({ ...res.result } as unknown as StatsResponse);
        }
      } catch (err) {
        console.error('통계 데이터 로딩 실패', err);
        setStatsData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [currentId]);

  if (isNumsLoading)
    return (
      <div className="text-white p-10 bg-black min-h-screen">데이터를 불러오는 중입니다...</div>
    );
  if (!statsData) return <div className="text-black p-10">로딩 중...</div>;

  const attendanceProps = statsData
    ? {
        totalCount: statsData.attendanceSummary.totalApplicants,
        attendanceCount: statsData.attendanceSummary.presentCount,
        absentCount:
          statsData.attendanceSummary.totalApplicants - statsData.attendanceSummary.presentCount,
      }
    : null;

  const deptYearProps = statsData
    ? {
        departments: statsData.departmentRatios.map((d) => ({
          name: d.department,
          count: d.count,
        })),
        years: statsData.gradeRatios.map((g) => ({ name: g.grade, count: g.count })),
      }
    : null;

  const inflowProps = statsData
    ? statsData.inflows.map((i) => ({
        name: i.inflowType,
        count: i.count,
        percentage: i.inflowRate,
      }))
    : null;

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="heading-1-bold">회차별 신청자 통계</h1>
        <div className="relative">
          <select
            value={selectedRound ?? ''}
            onChange={(e) => setSelectedRound(Number(e.target.value))}
            className="appearance-none bg-grey-800 px-4 py-2 pr-10 rounded-8 border cursor-pointer focus:outline-none subhead-1-medium"
          >
            {(seminarNumsData?.result || []).map((item) => (
              <option key={item.seminarId} value={item.seminarNum}>
                {item.seminarNum}회차
              </option>
            ))}
          </select>
          <img
            src={chevronDown}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 pointer-events-none"
            alt=""
          />
        </div>
      </header>

      <div className="bg-grey-700 rounded-8 p-10 min-h-[600px]">
        <div className="flex gap-x-4 mb-10">
          {[
            { id: 'attendance', name: '참석률' },
            { id: 'deptYear', name: '학과/학년' },
            { id: 'inflow', name: '유입 경로' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2 rounded-8 subhead-1-bold transition-all ${
                activeTab === tab.id ? 'bg-grey-500 text-black' : 'text-black hover:bg-grey-500'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center">
          {isLoading || !statsData ? (
            <div className="text-white">통계 데이터를 업데이트 중입니다...</div>
          ) : (
            <>
              {activeTab === 'attendance' && attendanceProps && (
                <AttendanceTab data={attendanceProps} />
              )}
              {activeTab === 'deptYear' && deptYearProps && <DeptYearTab data={deptYearProps} />}
              {activeTab === 'inflow' && inflowProps && <InflowTab data={inflowProps} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatisticsRegistration;
