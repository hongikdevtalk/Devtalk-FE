import { useState, useEffect } from 'react';
import chevronDown from '../../../assets/icons/common/chevrondown.svg';
import AttendanceTab from './tabs/AttendanceTab';
import DeptYearTab from './tabs/DeptYearTab';
import InflowTab from './tabs/InflowTab';
// API 연결시 필요
// import { getSeminarStatistics } from '../../../apis/Applicants/seminarStatisticsApi';
import MOCK_STATS_DATA from './MockData';

interface AttendanceData {
  totalCount: number;
  attendanceCount: number;
  absentCount: number;
}

interface DeptYearData {
  departments: { name: string; count: number }[];
  years: { name: string; count: number }[];
}

interface InflowData {
  name: string;
  count: number;
  percentage: number;
}

interface StatsResponse {
  attendance: AttendanceData;
  deptYear: DeptYearData;
  inflow: InflowData[];
}

const StatisticsRegistration = () => {
  const [selectedRound, setSelectedRound] = useState(10);
  const [activeTab, setActiveTab] = useState<'attendance' | 'deptYear' | 'inflow'>('attendance');
  const [statsData, setStatsData] = useState<StatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // API 연결 실행시 주석 해제 필요
  // useEffect(() => {
  //   const fetchStats = async () => {
  //     setIsLoading(true)
  //     try {
  //       const res = await getSeminarStatistics(selectedRound);
  //       if (res.isSuccess) setStatsData(res.result);
  //     } catch (err) {
  //       console.error('통계 데이터 로딩 실패', err);
  //     }
  //   };
  //   fetchStats();
  // }, [selectedRound]);

  // mock data 전용
  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        setStatsData(MOCK_STATS_DATA);
      } catch (err) {
        console.error('통계 데이터 로딩 실패', err);
        setStatsData(MOCK_STATS_DATA);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, [selectedRound]);

  if (isLoading)
    return (
      <div className="text-white p-10 bg-black min-h-screen">데이터를 불러오는 중입니다...</div>
    );
  if (!statsData) return <div className="text-black p-10">로딩 중...</div>;

  return (
    <div className="p-10 text-white bg-black min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="heading-1-bold">회차별 신청자 통계</h1>
        <div className="relative">
          <select
            value={selectedRound}
            onChange={(e) => setSelectedRound(Number(e.target.value))}
            className="appearance-none bg-grey-800 px-4 py-2 pr-10 rounded-8 border cursor-pointer focus:outline-none subhead-1-medium"
          >
            {[10, 9, 8].map((num) => (
              <option key={num} value={num}>
                {num}회차
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
        {/* Tab Navigation */}
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

        {/* Tab Content */}
        <div className="flex flex-col items-center justify-center">
          {activeTab === 'attendance' && statsData.attendance && (
            <AttendanceTab data={statsData.attendance} />
          )}
          {activeTab === 'deptYear' && statsData.deptYear && (
            <DeptYearTab data={statsData.deptYear} />
          )}
          {activeTab === 'inflow' && statsData.inflow && <InflowTab data={statsData.inflow} />}
        </div>
      </div>
    </div>
  );
};

export default StatisticsRegistration;
