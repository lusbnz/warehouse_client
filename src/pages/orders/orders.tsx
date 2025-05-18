import React from 'react';
import { FilterBar } from '@/components/filters/filter-bar';
import { useFilter } from '@/hooks/use-filter';
import { DataTable } from '@/components/data-table/data-table';
import { orderColumns } from '@/components/data-table/columns';
import { processedOrders, locations, customers, products } from '@/lib/mock-data';
import { MultiSelect } from '@/components/filters/multi-select';
import { ChartCard } from '@/components/dashboard/chart-card';

export function Orders() {
  const {
    filter,
    updateDateRange,
    updateLocations,
    updateCustomers,
    updateProducts,
    updateTimeGranularity,
    resetFilters,
  } = useFilter();
  
  // Filter orders data based on current filters
  const filteredData = React.useMemo(() => {
    return processedOrders.filter(order => {
      // Date range filter
      if (filter.dateRange.from && new Date(order.Date_key) < filter.dateRange.from) {
        return false;
      }
      if (filter.dateRange.to && new Date(order.Date_key) > filter.dateRange.to) {
        return false;
      }
      
      // Locations filter
      if (filter.locations.length > 0 && !filter.locations.includes(order.Ma_TP)) {
        return false;
      }
      
      // Customers filter
      if (filter.customers.length > 0 && !filter.customers.includes(order.Ma_KH)) {
        return false;
      }
      
      // Products filter
      if (filter.products.length > 0 && !filter.products.includes(order.Ma_MH)) {
        return false;
      }
      
      return true;
    });
  }, [filter]);
  
  // Create summary data for time series chart based on granularity
  const salesByTime = React.useMemo(() => {
    // Map to store aggregated data
    const timeMap = new Map();
    
    filteredData.forEach(order => {
      if (!order.time) return;
      
      let timeKey = "";
      let timeLabel = "";
      
      // Format based on selected granularity
      switch(filter.timeGranularity) {
        case 'day':
          timeKey = order.Date_key;
          timeLabel = new Date(order.Date_key).toLocaleDateString();
          break;
        case 'month':
          timeKey = `${order.time.Nam}-${order.time.Thang}`;
          timeLabel = `${order.time.Thang}/${order.time.Nam}`;
          break;
        case 'quarter':
          timeKey = `${order.time.Nam}-Q${order.time.Quy}`;
          timeLabel = `Q${order.time.Quy}/${order.time.Nam}`;
          break;
        case 'year':
          timeKey = `${order.time.Nam}`;
          timeLabel = `${order.time.Nam}`;
          break;
      }
      
      if (timeMap.has(timeKey)) {
        const current = timeMap.get(timeKey);
        timeMap.set(timeKey, {
          ...current,
          value: current.value + order.So_luong_tong_tien
        });
      } else {
        timeMap.set(timeKey, {
          time: timeLabel,
          value: order.So_luong_tong_tien
        });
      }
    });
    
    // Convert map to array and sort by time
    return Array.from(timeMap.values())
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [filteredData, filter.timeGranularity]);
  
  // Sales by location
  const salesByLocation = React.useMemo(() => {
    const locationMap = new Map();
    
    filteredData.forEach(order => {
      const locationCode = order.Ma_TP;
      const locationObj = locations.find(loc => loc.Ma_TP === locationCode);
      const locationName = locationObj ? locationObj.Ten_TP : locationCode;
      
      if (locationMap.has(locationCode)) {
        const current = locationMap.get(locationCode);
        locationMap.set(locationCode, {
          ...current,
          value: current.value + order.So_luong_tong_tien
        });
      } else {
        locationMap.set(locationCode, {
          location: locationName,
          value: order.So_luong_tong_tien
        });
      }
    });
    
    return Array.from(locationMap.values());
  }, [filteredData]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Đơn hàng</h1>
        <p className="text-muted-foreground">
          Quản lý thông tin đơn hàng và phân tích doanh thu theo thời gian.
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
        customersFilter={
          <MultiSelect
            options={customers.map(cust => ({ label: cust.Ten_KH, value: cust.Ma_KH }))}
            selected={filter.customers}
            onChange={updateCustomers}
            placeholder="Chọn khách hàng..."
          />
        }
        productsFilter={
          <MultiSelect
            options={products.map(prod => ({ label: prod.Mota, value: prod.Ma_MH }))}
            selected={filter.products}
            onChange={updateProducts}
            placeholder="Chọn sản phẩm..."
          />
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Doanh thu theo thời gian"
          description={`Doanh thu được phân tích theo ${
            filter.timeGranularity === 'day' ? 'ngày' : 
            filter.timeGranularity === 'month' ? 'tháng' : 
            filter.timeGranularity === 'quarter' ? 'quý' : 'năm'
          }`}
          type="line"
          data={salesByTime}
          xKey="time"
          yKeys={[{ key: 'value', name: 'Doanh thu', color: 'hsl(var(--chart-1))' }]}
        />
        <ChartCard
          title="Doanh thu theo khu vực"
          description="Doanh thu được phân tích theo từng khu vực"
          type="bar"
          data={salesByLocation}
          xKey="location"
          yKeys={[{ key: 'value', name: 'Doanh thu', color: 'hsl(var(--chart-2))' }]}
        />
      </div>

      <DataTable
        columns={orderColumns}
        data={filteredData}
        searchPlaceholder="Tìm kiếm đơn hàng..."
      />
    </div>
  );
}