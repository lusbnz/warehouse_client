import React from 'react';
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

interface ChartCardProps {
  title: string;
  description?: string;
  type: ChartType;
  data: any[];
  xKey: string;
  yKeys: {
    key: string;
    name: string;
    color: string;
  }[];
  aspect?: number;
}

export function ChartCard({
  title,
  description,
  type,
  data,
  xKey,
  yKeys,
  aspect = 2,
}: ChartCardProps) {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" aspect={aspect}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {yKeys.map((yKey, idx) => (
                <Line
                  key={idx}
                  type="monotone"
                  dataKey={yKey.key}
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
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {yKeys.map((yKey, idx) => (
                <Bar
                  key={idx}
                  dataKey={yKey.key}
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
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              {yKeys.map((yKey, idx) => (
                <Area
                  key={idx}
                  type="monotone"
                  dataKey={yKey.key}
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
                dataKey={yKeys[0].key}
                nameKey={xKey}
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