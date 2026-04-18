import { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import DateRange from './tabs/DateRange';
import { getPopularKeywords } from '../../../apis/Applicants/seminarStatisticsApi';
import type { KeywordSearchCount } from '../../../types/Applicants/seminarStatistics.api';

const PopularKeywordsSearch = () => {
  const [keywordData, setKeywordData] = useState<KeywordSearchCount[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchKeywords = useCallback(async (from?: string, to?: string) => {
    setIsLoading(true);

    const cleanFrom = from?.split('T')[0];
    const cleanTo = to?.split('T')[0];

    try {
      const res = await getPopularKeywords(cleanFrom, cleanTo);
      if (res && res.isSuccess) {
        setKeywordData(res.result as unknown as KeywordSearchCount[]);
      }
    } catch (err) {
      console.error('검색어 데이터 로딩 실패', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

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

  const initialValues = getInitialValues();
  const availableDateStrings = Array.isArray(keywordData)
    ? keywordData.map((item) => item.date)
    : [];

  useEffect(() => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    fetchKeywords(formatDate(lastWeek), formatDate(today));
  }, [fetchKeywords]);

  return (
    <div className="flex flex-col items-center w-full bg-black p-10">
      <h1 className="w-full text-left text-white heading-1-bold mb-8">검색어 통계</h1>
      <div className="w-full bg-grey-700 rounded-8 p-10 items-center relative">
        <div className="w-full max-w-[800px] bg-background p-10 rounded-8 mx-auto">
          <h2 className="text-black heading-2-bold text-center mb-6">Top 5 검색어 키워드 검색량</h2>
          <div className="w-full h-[320px] flex items-center justify-center">
            {isLoading ? (
              <div className="text-black subhead-1-bold">로딩 중...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={Array.isArray(keywordData) ? keywordData : []}
                  margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                  barCategoryGap={30}
                >
                  <XAxis
                    dataKey="keyword"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#000', fontSize: 14, fontWeight: 'bold' }}
                    dy={10}
                  />

                  <YAxis hide domain={[0, 60]} />

                  <Bar dataKey="count" fill="#A3E635" radius={[4, 4, 0, 0]} barSize={40}>
                    <LabelList
                      dataKey="count"
                      position="top"
                      fontSize={14}
                      fontWeight="bold"
                      fill="#000000"
                      offset={10}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="w-full mt-10 flex items-center justify-between px-4">
          <DateRange
            availableDates={availableDateStrings}
            initialStart={initialValues.start}
            initialEnd={initialValues.end}
            onApply={(from, to) => fetchKeywords(from, to)}
          />
        </div>
      </div>
    </div>
  );
};

export default PopularKeywordsSearch;
