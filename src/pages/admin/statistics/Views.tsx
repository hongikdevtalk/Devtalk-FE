import { useState, useEffect, useCallback } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import chevronDown from '../../../assets/icons/common/chevrondown.svg';
import { MOCK_VIEW_DATA } from './MockView';
import DateRange from './tabs/DateRange';
// import { getViewStatistics } from '../../../apis/Applicants/seminarStatisticsApi';

interface ViewCountItem {
  date: string;
  count: number;
}

const CardViews = () => {
  const [selectedRound, setSelectedRound] = useState(10);
  const [viewData, setViewData] = useState<ViewCountItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // API 로직
  // const fetchViewStats = useCallback(
  //     async (startDate?: string, endDate?: string) => {
  //       setIsLoading(true);
  //       try {
  //         const res = await getViewStatistics(selectedRound, startDate, endDate);
  //         if (res && res.isSuccess) {
  //           setViewData(res.result as unknown as ViewCountItem[]);
  //         }
  //       } catch (err) {
  //         console.error('조회수 데이터 로딩 실패', err);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     },
  //     [selectedRound]
  //   );

  // mockdata 전용
  const fetchViewStats = useCallback(async (startDate?: string, endDate?: string) => {
    setIsLoading(true);
    try {
      // 실제 통신 없이 Mock 데이터를 상태에 주입
      setViewData(MOCK_VIEW_DATA);
      console.log(`Mock 데이터 로드 완료: ${startDate || '전체'} ~ ${endDate || '전체'}`);
    } catch (err) {
      console.error('Mock 데이터 로딩 실패', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchViewStats();
  }, [fetchViewStats]);

  return (
    <div className="p-10 text-white min-h-screen bg-black">
      {/* 헤더 섹션 */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="heading-1-bold text-white">세미나 카드별 조회수</h1>
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

      {/* 차트 영역 */}
      <div className="bg-grey-700 rounded-8 p-10 min-h-[600px]">
        {/* 메인 차트 박스 */}
        <div className="w-full max-w-[800px] bg-background p-10 rounded-8 mx-auto">
          <div className="w-full h-[400px] relative">
            {isLoading ? (
              <div className="text-black subhead-1-bold">데이터를 불러오는 중...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  // API 연결시 viewData로 변경
                  data={MOCK_VIEW_DATA}
                  margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#A6A6A6" />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#000', fontSize: 14, fontWeight: 'bold' }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#000', fontSize: 14, fontWeight: 'bold' }}
                  />
                  <Tooltip />

                  <Line
                    type="linear"
                    dataKey="count"
                    stroke="#333333"
                    strokeWidth={2}
                    dot={{ r: 4, fill: '#333333' }}
                    activeDot={{ r: 6 }}
                    isAnimationActive={false}
                  >
                    <LabelList
                      dataKey="count"
                      position="top"
                      offset={10}
                      style={{ fontSize: '12px', fontWeight: 'bold' }}
                    />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* 기간 선택 */}
        <div className="w-full mt-10 flex items-center justify-between px-4">
          <DateRange onApply={(start, end) => fetchViewStats(start, end)} />
        </div>
      </div>
    </div>
  );
};

export default CardViews;
