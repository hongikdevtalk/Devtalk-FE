import { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LabelList } from 'recharts';
import { MOCK_POPULAR_KEYWORDS } from './MockSearch';
import DateRange from './tabs/DateRange';
// import { getPopularKeywords } from '../../../apis/Applicants/seminarStatisticsApi';

interface KeywordSearchCount {
  keyword: string;
  count: number;
}

const PopularKeywordsSearch = () => {
  const [keywordData, setKeywordData] = useState<KeywordSearchCount[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // API 전용 로직
  // const fetchKeywords = useCallback(async (start?: string, end?: string) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await getPopularKeywords(start, end);
  //     if (res && res.isSuccess) {
  //       setKeywordData(res.result as unknown as KeywordSearchCount[]);
  //     }
  //   } catch (err) {
  //     console.error('검색어 데이터 로딩 실패', err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  // mockdata 전용
  const fetchKeywords = useCallback(async (start?: string, end?: string) => {
    setIsLoading(true);
    try {
      setKeywordData(MOCK_POPULAR_KEYWORDS);
      console.log(`Mock 검색어 로드 완료: ${start || '전체'} ~ ${end || '전체'}`);
    } catch (err) {
      console.error('검색어 데이터 로딩 실패', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKeywords();
  }, [fetchKeywords]);

  const handleApplyDate = (startDate: string, endDate: string) => {
    fetchKeywords(startDate, endDate);
  };

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
                  // API 연결시 keywordData로 변경해야함
                  data={MOCK_POPULAR_KEYWORDS}
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
          <DateRange onApply={handleApplyDate} />
        </div>
      </div>
    </div>
  );
};

export default PopularKeywordsSearch;
