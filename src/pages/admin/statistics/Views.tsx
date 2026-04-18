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
import DateRange from './tabs/DateRange';
import { getViewStatistics } from '../../../apis/Applicants/seminarStatisticsApi';
import type { ViewCountItem } from '../../../types/Applicants/seminarStatistics.api';
import { useSeminarNums } from '../../../hooks/Applicants/useSeminarNums';

const CardViews = () => {
  const { data: seminarNumsData, isLoading: isNumsLoading } = useSeminarNums();
  const [selectedRound, setSelectedRound] = useState<number | null>(null);
  const [viewData, setViewData] = useState<ViewCountItem[]>([]);
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

  // API 로직
  const fetchViewStats = useCallback(
    async (from?: string, to?: string) => {
      if (!currentId) return;
      setIsLoading(true);

      const cleanFrom = from?.split('T')[0];
      const cleanTo = to?.split('T')[0];

      try {
        const res = await getViewStatistics(currentId, cleanFrom, cleanTo);
        if (res && res.isSuccess) {
          setViewData(res.result);
        }
      } catch (err) {
        console.error('조회수 데이터 로딩 실패', err);
        setViewData([]);
      } finally {
        setIsLoading(false);
      }
    },
    [currentId]
  );

  const getInitialValues = () => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const formatToUI = (d: Date) => ({
      years: String(d.getFullYear()),
      months: String(d.getMonth() + 1).padStart(2, '0'),
      days: String(d.getDate()).padStart(2, '0'),
    });

    return {
      start: formatToUI(lastWeek),
      end: formatToUI(today),
    };
  };
  const availableDateStrings = Array.isArray(viewData) ? viewData.map((item) => item.date) : [];

  const initialValues = getInitialValues();

  useEffect(() => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    fetchViewStats(formatDate(lastWeek), formatDate(today));
  }, [currentId, fetchViewStats]);

  if (isNumsLoading)
    return (
      <div className="text-white p-10 bg-black min-h-screen">데이터를 불러오는 중입니다...</div>
    );

  return (
    <div className="p-10 text-white min-h-screen bg-black">
      {/* 헤더 섹션 */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="heading-1-bold text-white">세미나 카드별 조회수</h1>
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
                  data={Array.isArray(viewData) ? viewData : []}
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
          <DateRange
            availableDates={availableDateStrings}
            initialStart={initialValues.start}
            initialEnd={initialValues.end}
            onApply={(from, to) => fetchViewStats(from, to)}
          />
        </div>
      </div>
    </div>
  );
};

export default CardViews;
