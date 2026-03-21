import { PieChart, Pie } from 'recharts';

interface AttendanceData {
  totalCount: number;
  attendanceCount: number;
  absentCount: number;
}

const AttendanceTab = ({ data }: { data: AttendanceData }) => {
  const chartData = [
    { name: '출석', value: data.attendanceCount, fill: '#FFFFFF' },
    { name: '불참', value: data.absentCount, fill: '#D9D9D9' },
  ];

  return (
    <div className="flex flex-col items-center w-full rounded-8 bg-background pb-10">
      {/* 파이 차트 영역 */}
      <div className="w-full h-[300px] mb-12 flex justify-center items-center">
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            cx={200}
            cy={150}
            outerRadius={100}
            dataKey="value"
            stroke="#000000"
            labelLine={false}
            isAnimationActive={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }) => {
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const RADIAN = Math.PI / 180;
              const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
              const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="#000000"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {`${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                </text>
              );
            }}
          />
        </PieChart>
      </div>

      {/* 테이블 영역 */}
      <div className="w-[500px] overflow-hidden rounded-8 border border-black">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b border-black text-black body-1-medium">
              <th className="py-3 border-r border-black">총 신청자 수</th>
              <th className="py-3 border-r border-black">출석 인원</th>
              <th className="py-3">불참 인원</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-black text-black body-1-medium">
              <td className="py-4 border-r border-black">{data.totalCount}</td>
              <td className="py-4 border-r border-black">{data.attendanceCount}</td>
              <td className="py-4">{data.absentCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTab;
