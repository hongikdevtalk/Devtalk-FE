import { BarChart, Bar, XAxis, YAxis, LabelList, ResponsiveContainer } from 'recharts';

interface DeptYearData {
  departments: { name: string; count: number }[];
  years: { name: string; count: number }[];
}

const DeptYearTab = ({ data }: { data: DeptYearData }) => {
  if (!data) return <div className="text-black p-10">데이터가 없습니다.</div>;

  const deptData = data.departments;
  const yearData = data.years;

  const maxDeptCount = Math.max(...deptData.map((d) => d.count), 1);
  const maxYearCount = Math.max(...yearData.map((y) => y.count), 1);

  return (
    <div className="flex w-full rounded-8 gap-x-6 items-start">
      {/* 학과 통계 영역 */}
      <div className="flex-1 bg-background p-6 rounded-8 shadow-sm h-full">
        <h2 className="subhead-1-bold text-black mb-8">학과</h2>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={deptData}
              layout="vertical"
              margin={{ top: 0, right: 40, left: 10, bottom: 0 }}
              barCategoryGap={15}
            >
              <XAxis type="number" hide domain={[0, maxDeptCount + 20]} />
              <YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                width={100}
                className="font-bold text-black"
              />
              <Bar dataKey="count" fill="#ade657" radius={[0, 4, 4, 0]} barSize={24}>
                <LabelList
                  dataKey="count"
                  position="right"
                  fontSize={12}
                  fontWeight="bold"
                  fill="#000000"
                  offset={10}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 학년 통계 영역 */}
      <div className="flex-1 bg-background p-6 rounded-8 shadow-sm h-full">
        <h2 className="subhead-1-bold text-black mb-8">학년</h2>

        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={yearData}
              layout="vertical"
              margin={{ top: 0, right: 40, left: 10, bottom: 0 }}
              barCategoryGap={15}
            >
              <XAxis type="number" hide domain={[0, maxYearCount + 20]} />
              <YAxis
                type="category"
                dataKey="name"
                tickLine={false}
                axisLine={false}
                fontSize={12}
                width={80}
                className="font-bold text-black"
              />
              <Bar dataKey="count" fill="#ade657" radius={[0, 4, 4, 0]} barSize={24}>
                <LabelList
                  dataKey="count"
                  position="right"
                  fontSize={12}
                  fontWeight="bold"
                  fill="#000000"
                  offset={10}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DeptYearTab;
