import { DollarSign as Dollar, Users, ShoppingBag, Store } from 'lucide-react';
import { StatCard } from '@/components/dashboard/stat-card';
import { ChartCard } from '@/components/dashboard/chart-card';
import { FilterBar } from '@/components/filters/filter-bar';
import { useFilter } from '@/hooks/use-filter';
import { getDashboardSummary } from '@/lib/mock-data';
import { MultiSelect } from '@/components/filters/multi-select';
import { locations } from '@/lib/mock-data';

export function Dashboard() {
  const { 
    filter, 
    updateDateRange, 
    updateLocations, 
    updateTimeGranularity,
    resetFilters 
  } = useFilter();
  
  const summary = getDashboardSummary();
  
  // Format currency
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Tổng quan về dữ liệu bán hàng, kho hàng và khách hàng.
        </p>
      </div>

      <FilterBar
        filter={filter}
        onUpdateDateRange={updateDateRange}
        onUpdateTimeGranularity={updateTimeGranularity}
        onResetFilters={resetFilters}
        locationsFilter={
          <MultiSelect
            options={locations.map(loc => ({ label: loc.Ten_TP, value: loc.Ma_TP }))}
            selected={filter.locations}
            onChange={updateLocations}
            placeholder="Chọn địa điểm..."
          />
        }
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng doanh thu"
          value={formatter.format(summary.totalSales)}
          description="Doanh thu từ tất cả đơn hàng"
          icon={Dollar}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Tổng số khách hàng"
          value={summary.totalCustomers}
          description="Số lượng khách hàng"
          icon={Users}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Tổng số sản phẩm"
          value={summary.totalProducts}
          description="Số lượng sản phẩm trong hệ thống"
          icon={ShoppingBag}
        />
        <StatCard
          title="Tổng số cửa hàng"
          value={summary.totalStores}
          description="Số lượng cửa hàng"
          icon={Store}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard
          title="Doanh thu theo thời gian"
          description="Doanh thu theo tháng trong năm hiện tại"
          type="line"
          data={summary.salesByTime}
          xKey="label"
          yKeys={[{ key: 'sales', name: 'Doanh thu', color: 'hsl(var(--chart-1))' }]}
        />
        <ChartCard
          title="Doanh thu theo khu vực"
          description="Phân bố doanh thu theo khu vực"
          type="bar"
          data={summary.salesByLocation}
          xKey="location"
          yKeys={[{ key: 'sales', name: 'Doanh thu', color: 'hsl(var(--chart-2))' }]}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard
          title="Top 5 sản phẩm bán chạy"
          description="Sản phẩm có doanh thu cao nhất"
          type="bar"
          data={summary.topProducts}
          xKey="product"
          yKeys={[{ key: 'sales', name: 'Doanh thu', color: 'hsl(var(--chart-3))' }]}
        />
        <ChartCard
          title="Top 5 khách hàng"
          description="Khách hàng có doanh thu cao nhất"
          type="bar"
          data={summary.topCustomers}
          xKey="customer"
          yKeys={[{ key: 'sales', name: 'Doanh thu', color: 'hsl(var(--chart-4))' }]}
        />
      </div>
    </div>
  );
}