import React from 'react';
import { FilterBar } from '@/components/filters/filter-bar';
import { useFilter } from '@/hooks/use-filter';
import { DataTable } from '@/components/data-table/data-table';
import { storeColumns } from '@/components/data-table/columns';
import { processedStores, locations, processedInventory } from '@/lib/mock-data';
import { MultiSelect } from '@/components/filters/multi-select';
import { ChartCard } from '@/components/dashboard/chart-card';


interface StoreLocationData {
  location: string;
  count: number;
}

interface InventoryByStoreData {
  store: string;
  quantity: number;
}

interface StorePerformanceData {
  store: string;
  inventory: number;
  age: number;
  location: string;
}

interface StoreMetrics {
  storesByLocation: StoreLocationData[];
  inventoryByStore: InventoryByStoreData[];
  performanceData: StorePerformanceData[];
}

export function Stores() {
  const {
    filter,
    updateLocations,
    updateStores,
    updateTimeGranularity,
    resetFilters,
  } = useFilter();
  
  // Filter stores data based on current filters
  const filteredData = React.useMemo(() => {
    return processedStores.filter(store => {
      // Locations filter
      if (filter.locations.length > 0 && !filter.locations.includes(store.Ma_TP)) {
        return false;
      }
      
      // Specific stores filter
      if (filter.stores.length > 0 && !filter.stores.includes(store.Ma_CH)) {
        return false;
      }
      
      return true;
    });
  }, [filter]);
  
  // Calculate store metrics
  const storeMetrics = React.useMemo(() => {
    // Stores by location
    const locationMap = new Map();
    filteredData.forEach(store => {
      const locationCode = store.Ma_TP;
      // const locationName = store.location ? store.location.Ten_TP : locationCode;
      
      if (locationMap.has(locationCode)) {
        locationMap.set(locationCode, locationMap.get(locationCode) + 1);
      } else {
        locationMap.set(locationCode, 1);
      }
    });
    
    const storesByLocation = Array.from(locationMap.entries()).map(([code, count]) => {
      const location = locations.find(loc => loc.Ma_TP === code);
      return {
        location: location ? location.Ten_TP : code,
        count,
      };
    });
    
    // Inventory by store
    const inventoryMap = new Map();
    processedInventory.forEach(item => {
      const storeId = item.Ma_CH;
      const quantity = item.So_luong_nhap;
      
      if (inventoryMap.has(storeId)) {
        inventoryMap.set(storeId, inventoryMap.get(storeId) + quantity);
      } else {
        inventoryMap.set(storeId, quantity);
      }
    });
    
    const inventoryByStore = Array.from(inventoryMap.entries())
      .filter(([storeId]) => filteredData.some(store => store.Ma_CH === storeId))
      .map(([storeId, quantity]) => ({
        store: storeId,
        quantity,
      }));
    
    // Store performance over time
    // For simplicity, we'll create a performance score based on inventory and customer base
    const performanceData = filteredData.map(store => {
      const storeId = store.Ma_CH;
      const inventory = inventoryMap.get(storeId) || 0;
      
      // Calculate age in years for store maturity
      const openingDate = new Date(store.NgayMoCua);
      const today = new Date();
      const ageInYears = (today.getTime() - openingDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
      
      return {
        store: storeId,
        inventory,
        age: Math.round(ageInYears * 10) / 10,
        location: store.location ? store.location.Ten_TP : store.Ma_TP,
      };
    });
    
    return {
      storesByLocation,
      inventoryByStore,
      performanceData,
    };
  }, [filteredData]) as StoreMetrics;

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Cửa hàng</h1>
        <p className="text-muted-foreground">
          Quản lý thông tin cửa hàng và phân tích hiệu suất hoạt động.
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
        storesFilter={
          <MultiSelect
            options={processedStores.map(store => ({ 
              label: `${store.Ma_CH} (${store.location?.Ten_TP || store.Ma_TP})`, 
              value: store.Ma_CH 
            }))}
            selected={filter.stores}
            onChange={updateStores}
            placeholder="Chọn cửa hàng..."
          />
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Phân bố cửa hàng theo khu vực"
          description="Số lượng cửa hàng theo từng khu vực"
          type="bar"
          data={storeMetrics.storesByLocation}
          xKey="location"
          yKeys={[{ key: 'count', name: 'Số lượng', color: 'hsl(var(--chart-1))' }]}
        />
        <ChartCard
          title="Lượng hàng tồn kho theo cửa hàng"
          description="Tổng số lượng hàng tồn kho của mỗi cửa hàng"
          type="bar"
          data={storeMetrics.inventoryByStore}
          xKey="store"
          yKeys={[{ key: 'quantity', name: 'Số lượng', color: 'hsl(var(--chart-2))' }]}
        />
      </div>
      
      <ChartCard
        title="Chỉ số hiệu suất cửa hàng"
        description="So sánh tuổi của cửa hàng và lượng hàng tồn kho"
        type="bar"
        data={storeMetrics.performanceData}
        xKey="store"
        yKeys={[
          { key: 'inventory', name: 'Lượng hàng', color: 'hsl(var(--chart-3))' },
          { key: 'age', name: 'Tuổi (năm)', color: 'hsl(var(--chart-4))' }
        ]}
      />

      <DataTable
        columns={storeColumns}
        data={filteredData}
        searchPlaceholder="Tìm kiếm cửa hàng..."
      />
    </div>
  );
}