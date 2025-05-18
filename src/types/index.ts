export interface TimeData {
  Date_key: string;
  Thang: number;
  Quy: number;
  Nam: number;
}

export interface ProductData {
  Ma_MH: string;
  Mota: string;
  KichCo: string;
  TrongLuong: number;
  Gia: number;
}

export interface LocationData {
  Ma_TP: string;
  Ten_TP: string;
  Bang: string;
}

export interface CustomerData {
  Ma_KH: string;
  Ten_KH: string;
  Loai_KH: string;
  Ma_TP: string;
  location?: LocationData;
}

export interface StoreData {
  Ma_CH: string;
  Ma_TP: string;
  SDT: string;
  NgayMoCua: string;
  location?: LocationData;
}

export interface InventoryData {
  Date_key: string;
  Ma_CH: string;
  Ma_MH: string;
  Ma_TP: string;
  So_luong_nhap: number;
  product?: ProductData;
  store?: StoreData;
  time?: TimeData;
}

export interface OrderData {
  Date_key: string;
  Ma_KH: string;
  Ma_MH: string;
  Ma_TP: string;
  So_luong_tong_tien: number;
  customer?: CustomerData;
  product?: ProductData;
  time?: TimeData;
}

export interface FilterState {
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  locations: string[];
  customers: string[];
  products: string[];
  stores: string[];
  timeGranularity: 'day' | 'month' | 'quarter' | 'year';
}

export interface DashboardSummary {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  totalStores: number;
  salesByTime: {
    label: string;
    sales: number;
  }[];
  salesByLocation: {
    location: string;
    sales: number;
  }[];
  topProducts: {
    product: string;
    sales: number;
  }[];
  topCustomers: {
    customer: string;
    sales: number;
  }[];
}