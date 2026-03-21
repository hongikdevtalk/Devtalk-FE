import { PieChart, Pie } from 'recharts';

interface InflowData {
  name: string;
  count: number;
  percentage: number;
}

const InflowTab = ({ data }: { data: InflowData[] }) => {
  if (!data || data.length === 0) return <div className="text-black p-10">데이터가 없습니다.</div>;

  return (
    <div className="flex flex-col items-center w-full bg-background rounded-8">
      <div className="w-full h-[350px] mb-12 flex justify-center items-center">
        {/* 파이 차트 영역 */}
        <PieChart width={550} height={350}>
          <Pie
            data={data}
            cx={275}
            cy={175}
            outerRadius={100}
            dataKey="count"
            stroke="#000000"
            fill="#ffffff"
            strokeWidth={1}
            isAnimationActive={false}
            labelLine={{ stroke: '#000000', strokeWidth: 1 }}
            label={(props: any) => {
              const { x, y, cx, name, percentage } = props;
              return (
                <text
                  x={x}
                  y={y}
                  fill="#000000"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                >
                  {`${name} ${(percentage ?? 0).toFixed(0)}%`}
                </text>
              );
            }}
          ></Pie>
        </PieChart>
      </div>

      {/* 테이블 영역 */}
      <div className="w-full max-w-[800px] overflow-hidden rounded-8 border border-black mb-10">
        <table className="w-full text-center border-collapse table-fixed">
          <thead>
            <tr className="text-black subhead-2-bold border-b border-black">
              <th className="py-3 border-r border-black whitespace-pre-wrap">유입 경로</th>
              {data.map((item, idx) => (
                <th key={idx} className="py-3 border-r border-black last:border-r-0 truncate px-2">
                  {item.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="text-black body-1-medium">
              <td className="py-4 border-r border-black font-bold">인원 (명)</td>
              {data.map((item, idx) => (
                <td key={idx} className="py-4 border-r border-black last:border-r-0">
                  {item.count}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InflowTab;
