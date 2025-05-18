import React from 'react';
import { FilterBar } from '@/components/filters/filter-bar';
import { useFilter } from '@/hooks/use-filter';
import { DataTable } from '@/components/data-table/data-table';
import { inventoryColumns } from '@/components/data-table/columns';
import { processedInventory, locations, products, stores } from '@/lib/mock-data';
import { MultiSelect } from '@/components/filters/multi-select';
import { ChartCard } from '@/components/dashboard/chart-card';

export function Inventory() {
  const {
    filter,
    updateDateRange,
    updateLocations,
    updateProducts,
    updateStores,
    updateTimeGranularity,
    resetFilters,
  } = useFilter();
  
  // Filter inventory data based on current filters
  const filteredData = React.useMemo(() => {
    return processedInventory.filter(item => {
      // Date range filter
      if (filter.dateRange.from && new Date(item.Date_key) < filter.dateRange.from) {
        return false;
      }
      if (filter.dateRange.to && new Date(item.Date_key) > filter.dateRange.to) {
        return false;
      }
      
      // Locations filter
      if (filter.locations.length > 0 && !filter.locations.includes(item.Ma_TP)) {
        return false;
      }
      
      // Products filter
      if (filter.products.length > 0 && !filter.products.includes(item.Ma_MH)) {
        return false;
      }
      
      // Stores filter
      if (filter.stores.length > 0 && !filter.stores.includes(item.Ma_CH)) {
        return false;
      }
      
      return true;
    });
  }, [filter]);
  
  // Create summary data for charts
  const inventoryByStore = React.useMemo(() => {
    const summary = new Map();
    filteredData.forEach(item => {
      const storeId = item.Ma_CH;
      const qty = item.So_luong_nhap;
      
      if (summary.has(storeId)) {
        summary.set(storeId, summary.get(storeId) + qty);
      } else {
        summary.set(storeId, qty);
      }
    });
    
    const storeSummary = Array.from(summary.entries()).map(([store, quantity]) => {
      const storeData = stores.find(s => s.Ma_CH === store);
      const storeName = storeData ? `${storeData.Ma_CH}` : store;
      return {
        store: storeName,
        quantity,
      };
    }).sort((a, b) => b.quantity - a.quantity);
    
    return storeSummary;
  }, [filteredData]);
  
  const inventoryByProduct = React.useMemo(() => {
    const summary = new Map();
    filteredData.forEach(item => {
      const productId = item.Ma_MH;
      const qty = item.So_luong_nhap;
      
      if (summary.has(productId)) {
        summary.set(productId, summary.get(productId) + qty);
      } else {
        summary.set(productId, qty);
      }
    });
    
    const productSummary = Array.from(summary.entries()).map(([product, quantity]) => {
      const productData = products.find(p => p.Ma_MH === product);
      const productName = productData ? productData.Mota : product;
      return {
        product: productName,
        quantity,
      };
    }).sort((a, b) => b.quantity - a.quantity);
    
    return productSummary.slice(0, 10);
  }, [filteredData]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Kho hàng</h1>
        <p className="text-muted-foreground">
          Quản lý thông tin nhập kho và phân tích lượng hàng tồn kho.
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
        productsFilter={
          <MultiSelect
            options={products.map(prod => ({ label: prod.Mota, value: prod.Ma_MH }))}
            selected={filter.products}
            onChange={updateProducts}
            placeholder="Chọn sản phẩm..."
          />
        }
        storesFilter={
          <MultiSelect
            options={stores.map(store => ({ label: store.Ma_CH, value: store.Ma_CH }))}
            selected={filter.stores}
            onChange={updateStores}
            placeholder="Chọn cửa hàng..."
          />
        }
      />

      <div className="grid gap-6 md:grid-cols-2">
        <ChartCard
          title="Lượng hàng nhập theo cửa hàng"
          description="Tổng số lượng hàng nhập theo từng cửa hàng"
          type="bar"
          data={inventoryByStore}
          xKey="store"
          yKeys={[{ key: 'quantity', name: 'Số lượng', color: 'hsl(var(--chart-1))' }]}
        />
        <ChartCard
          title="Top 10 sản phẩm nhập nhiều nhất"
          description="Sản phẩm có số lượng nhập kho cao nhất"
          type="bar"
          data={inventoryByProduct}
          xKey="product"
          yKeys={[{ key: 'quantity', name: 'Số lượng', color: 'hsl(var(--chart-2))' }]}
        />
      </div>

      <DataTable
        columns={inventoryColumns}
        data={filteredData}
        searchPlaceholder="Tìm kiếm thông tin nhập kho..."
      />
    </div>
  );
}