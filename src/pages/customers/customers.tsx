import React from 'react';
import { FilterBar } from '@/components/filters/filter-bar';
import { useFilter } from '@/hooks/use-filter';
import { DataTable } from '@/components/data-table/data-table';
import { customerColumns } from '@/components/data-table/columns';
import { processedCustomers, locations, processedOrders } from '@/lib/mock-data';
import { MultiSelect } from '@/components/filters/multi-select';
import { ChartCard } from '@/components/dashboard/chart-card';

export function Customers() {
  const {
    filter,
    updateLocations,
    // updateCustomers,
    updateTimeGranularity,
    resetFilters,
  } = useFilter();
  
  // Filter customers data based on current filters
  const filteredData = React.useMemo(() => {
    return processedCustomers.filter(customer => {
      // Locations filter
      if (filter.locations.length > 0 && !filter.locations.includes(customer.Ma_TP)) {
        return false;
      }
      
      // Customers filter (if specific customers are selected)
      if (filter.customers.length > 0 && !filter.customers.includes(customer.Ma_KH)) {
        return false;
      }
      
      return true;
    });
  }, [filter]);
  
  // Calculate customer metrics
  const customerMetrics = React.useMemo(() => {
    // Customer types distribution
    const customerTypeMap = new Map();
    filteredData.forEach(customer => {
      const type = customer.Loai_KH;
      if (customerTypeMap.has(type)) {
        customerTypeMap.set(type, customerTypeMap.get(type) + 1);
      } else {
        customerTypeMap.set(type, 1);
      }
    });
    
    const customerTypeDistribution = Array.from(customerTypeMap.entries()).map(([type, count]) => ({
      type,
      count,
    }));
    
    // Customers by location
    const locationMap = new Map();
    filteredData.forEach(customer => {
      const locationCode = customer.Ma_TP;
      // const locationName = customer.location ? customer.location.Ten_TP : locationCode;
      
      if (locationMap.has(locationCode)) {
        locationMap.set(locationCode, locationMap.get(locationCode) + 1);
      } else {
        locationMap.set(locationCode, 1);
      }
    });
    
    const customersByLocation = Array.from(locationMap.entries()).map(([code, count]) => {
      const location = locations.find(loc => loc.Ma_TP === code);
      return {
        location: location ? location.Ten_TP : code,
        count,
      };
    });
    
    // Customers by lifetime value (from orders)
    const customerValueMap = new Map();
    processedOrders.forEach(order => {
      const customerId = order.Ma_KH;
      const orderValue = order.So_luong_tong_tien;
      
      if (customerValueMap.has(customerId)) {
        customerValueMap.set(customerId, customerValueMap.get(customerId) + orderValue);
      } else {
        customerValueMap.set(customerId, orderValue);
      }
    });
    
    const topCustomersByValue = Array.from(customerValueMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([id, value]) => {
        const customer = processedCustomers.find(c => c.Ma_KH === id);
        return {
          customer: customer ? customer.Ten_KH : id,
          value,
        };
      });
    
    return {
      customerTypeDistribution,
      customersByLocation,
      topCustomersByValue,
    };
  }, [filteredData]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Khách hàng</h1>
        <p className="text-muted-foreground">
          Quản lý thông tin khách hàng và phân tích dữ liệu khách hàng.
        </p>
      </div>

      <FilterBar
        filter={filter}
        onUpdateDateRange={() => {}}
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

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Phân bố khách hàng theo loại"
          description="Số lượng khách hàng theo từng phân loại"
          type="pie"
          data={customerMetrics.customerTypeDistribution}
          xKey="type"
          yKeys={[{ key: 'count', name: 'Số lượng', color: 'hsl(var(--chart-1))' }]}
        />
        <ChartCard
          title="Phân bố khách hàng theo khu vực"
          description="Số lượng khách hàng theo từng khu vực"
          type="bar"
          data={customerMetrics.customersByLocation}
          xKey="location"
          yKeys={[{ key: 'count', name: 'Số lượng', color: 'hsl(var(--chart-2))' }]}
        />
      </div>
      
      <ChartCard
        title="Top khách hàng theo doanh thu"
        description="Khách hàng có tổng giá trị đơn hàng cao nhất"
        type="bar"
        data={customerMetrics.topCustomersByValue}
        xKey="customer"
        yKeys={[{ key: 'value', name: 'Doanh thu', color: 'hsl(var(--chart-3))' }]}
      />

      <DataTable
        columns={customerColumns}
        data={filteredData}
        searchPlaceholder="Tìm kiếm khách hàng..."
      />
    </div>
  );
}