import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ChartType = 'line' | 'bar' | 'area' | 'pie';

interface YKey<T> {
  key: keyof T;
  name: string;
  color: string;
}

interface ChartCardProps<T> {
  title: string;
  description?: string;
  type: ChartType;
  data: T[];
  xKey: keyof T;
  yKeys: YKey<T>[];
  aspect?: number;
}

export function ChartCard<T>({
  title,
  description,
  type,
  data,
  xKey,
  yKeys,
  aspect = 2,
}: ChartCardProps<T>) {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" aspect={aspect}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey as string} />
              <YAxis />
              <Tooltip />
              <Legend />
              {yKeys.map((yKey, idx) => (
                <Line
                  key={idx}
                  type="monotone"
                  dataKey={yKey.key as string}
                  name={yKey.name}
                  stroke={yKey.color}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" aspect={aspect}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey as string} />
              <YAxis />
              <Tooltip />
              <Legend />
              {yKeys.map((yKey, idx) => (
                <Bar
                  key={idx}
                  dataKey={yKey.key as string}
                  name={yKey.name}
                  fill={yKey.color}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" aspect={aspect}>
            <AreaChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey as string} />
              <YAxis />
              <Tooltip />
              <Legend />
              {yKeys.map((yKey, idx) => (
                <Area
                  key={idx}
                  type="monotone"
                  dataKey={yKey.key as string}
                  name={yKey.name}
                  fill={yKey.color}
                  stroke={yKey.color}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" aspect={aspect}>
            <PieChart>
              <Pie
                data={data}
                dataKey={yKeys[0].key as string}
                nameKey={xKey as string}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill={yKeys[0].color}
                label
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-2">{renderChart()}</CardContent>
    </Card>
  );
}
