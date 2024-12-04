import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface ProgressData {
  date: string;
  completed: number;
  total: number;
}

interface ProgressChartProps {
  data: ProgressData[];
}

export const ProgressChart = ({ data }: ProgressChartProps) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ fill: '#10B981' }}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#6B7280"
            strokeWidth={2}
            dot={{ fill: '#6B7280' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};