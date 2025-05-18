import {
  TimeData,
  ProductData,
  LocationData,
  CustomerData,
  StoreData,
  InventoryData,
  OrderData,
} from '@/types';

// Sample time data (3 years worth of dates)
export const times: TimeData[] = Array.from({ length: 1095 }, (_, i) => {
  const date = new Date(2022, 0, 1);
  date.setDate(date.getDate() + i);
  const month = date.getMonth() + 1;
  const quarter = Math.ceil(month / 3);
  const year = date.getFullYear();
  
  return {
    Date_key: date.toISOString().split('T')[0],
    Thang: month,
    Quy: quarter,
    Nam: year,
  };
});

// Sample locations
export const locations: LocationData[] = [
  { Ma_TP: 'HN', Ten_TP: 'Hà Nội', Bang: 'Miền Bắc' },
  { Ma_TP: 'HCM', Ten_TP: 'Hồ Chí Minh', Bang: 'Miền Nam' },
  { Ma_TP: 'DN', Ten_TP: 'Đà Nẵng', Bang: 'Miền Trung' },
  { Ma_TP: 'HP', Ten_TP: 'Hải Phòng', Bang: 'Miền Bắc' },
  { Ma_TP: 'CT', Ten_TP: 'Cần Thơ', Bang: 'Miền Nam' },
];

// Sample products
export const products: ProductData[] = [
  { Ma_MH: 'SP001', Mota: 'Áo thun nam', KichCo: 'M', TrongLuong: 200, Gia: 250000 },
  { Ma_MH: 'SP002', Mota: 'Áo sơ mi nữ', KichCo: 'S', TrongLuong: 180, Gia: 350000 },
  { Ma_MH: 'SP003', Mota: 'Quần jean nam', KichCo: 'L', TrongLuong: 500, Gia: 450000 },
  { Ma_MH: 'SP004', Mota: 'Đầm dạ hội', KichCo: 'M', TrongLuong: 400, Gia: 1250000 },
  { Ma_MH: 'SP005', Mota: 'Giày thể thao', KichCo: '42', TrongLuong: 700, Gia: 850000 },
  { Ma_MH: 'SP006', Mota: 'Túi xách nữ', KichCo: 'Standard', TrongLuong: 300, Gia: 950000 },
  { Ma_MH: 'SP007', Mota: 'Đồng hồ nam', KichCo: 'Standard', TrongLuong: 150, Gia: 2250000 },
  { Ma_MH: 'SP008', Mota: 'Kính mát', KichCo: 'Standard', TrongLuong: 50, Gia: 550000 },
  { Ma_MH: 'SP009', Mota: 'Vòng tay', KichCo: 'Standard', TrongLuong: 20, Gia: 350000 },
  { Ma_MH: 'SP010', Mota: 'Mũ thời trang', KichCo: 'Standard', TrongLuong: 100, Gia: 250000 },
];

// Sample customers
export const customers: CustomerData[] = [
  { Ma_KH: 'KH001', Ten_KH: 'Nguyễn Văn A', Loai_KH: 'VIP', Ma_TP: 'HN' },
  { Ma_KH: 'KH002', Ten_KH: 'Trần Thị B', Loai_KH: 'Thường', Ma_TP: 'HCM' },
  { Ma_KH: 'KH003', Ten_KH: 'Lê Văn C', Loai_KH: 'VIP', Ma_TP: 'DN' },
  { Ma_KH: 'KH004', Ten_KH: 'Phạm Thị D', Loai_KH: 'Thường', Ma_TP: 'HP' },
  { Ma_KH: 'KH005', Ten_KH: 'Hoàng Văn E', Loai_KH: 'VIP', Ma_TP: 'CT' },
  { Ma_KH: 'KH006', Ten_KH: 'Ngô Thị F', Loai_KH: 'Thường', Ma_TP: 'HN' },
  { Ma_KH: 'KH007', Ten_KH: 'Đỗ Văn G', Loai_KH: 'VIP', Ma_TP: 'HCM' },
  { Ma_KH: 'KH008', Ten_KH: 'Bùi Thị H', Loai_KH: 'Thường', Ma_TP: 'DN' },
  { Ma_KH: 'KH009', Ten_KH: 'Trương Văn I', Loai_KH: 'VIP', Ma_TP: 'HP' },
  { Ma_KH: 'KH010', Ten_KH: 'Mai Thị K', Loai_KH: 'Thường', Ma_TP: 'CT' },
];

// Sample stores
export const stores: StoreData[] = [
  { Ma_CH: 'CH001', Ma_TP: 'HN', SDT: '0123456789', NgayMoCua: '2020-01-01' },
  { Ma_CH: 'CH002', Ma_TP: 'HCM', SDT: '0123456790', NgayMoCua: '2020-02-15' },
  { Ma_CH: 'CH003', Ma_TP: 'DN', SDT: '0123456791', NgayMoCua: '2020-03-20' },
  { Ma_CH: 'CH004', Ma_TP: 'HP', SDT: '0123456792', NgayMoCua: '2020-05-10' },
  { Ma_CH: 'CH005', Ma_TP: 'CT', SDT: '0123456793', NgayMoCua: '2020-06-25' },
  { Ma_CH: 'CH006', Ma_TP: 'HN', SDT: '0123456794', NgayMoCua: '2021-01-15' },
  { Ma_CH: 'CH007', Ma_TP: 'HCM', SDT: '0123456795', NgayMoCua: '2021-03-05' },
  { Ma_CH: 'CH008', Ma_TP: 'DN', SDT: '0123456796', NgayMoCua: '2021-05-20' },
];

// Generate inventory data
export const inventory: InventoryData[] = [];
for (let i = 0; i < 500; i++) {
  const randomTimeIndex = Math.floor(Math.random() * times.length);
  const randomStoreIndex = Math.floor(Math.random() * stores.length);
  const randomProductIndex = Math.floor(Math.random() * products.length);
  const storeLocation = stores[randomStoreIndex].Ma_TP;
  
  inventory.push({
    Date_key: times[randomTimeIndex].Date_key,
    Ma_CH: stores[randomStoreIndex].Ma_CH,
    Ma_MH: products[randomProductIndex].Ma_MH,
    Ma_TP: storeLocation,
    So_luong_nhap: Math.floor(Math.random() * 50) + 1,
  });
}

// Generate order data
export const orders: OrderData[] = [];
for (let i = 0; i < 1000; i++) {
  const randomTimeIndex = Math.floor(Math.random() * times.length);
  const randomCustomerIndex = Math.floor(Math.random() * customers.length);
  const randomProductIndex = Math.floor(Math.random() * products.length);
  const customerLocation = customers[randomCustomerIndex].Ma_TP;
  const productPrice = products[randomProductIndex].Gia;
  const quantity = Math.floor(Math.random() * 5) + 1;
  
  orders.push({
    Date_key: times[randomTimeIndex].Date_key,
    Ma_KH: customers[randomCustomerIndex].Ma_KH,
    Ma_MH: products[randomProductIndex].Ma_MH,
    Ma_TP: customerLocation,
    So_luong_tong_tien: quantity * productPrice,
  });
}

// Process data relationships (this simulates the JOIN operations that would happen in a real database)
export const processedOrders = orders.map(order => {
  const customer = customers.find(c => c.Ma_KH === order.Ma_KH);
  const product = products.find(p => p.Ma_MH === order.Ma_MH);
  const time = times.find(t => t.Date_key === order.Date_key);
  
  return {
    ...order,
    customer,
    product,
    time,
  };
});

export const processedInventory = inventory.map(inv => {
  const product = products.find(p => p.Ma_MH === inv.Ma_MH);
  const store = stores.find(s => s.Ma_CH === inv.Ma_CH);
  const time = times.find(t => t.Date_key === inv.Date_key);
  
  return {
    ...inv,
    product,
    store,
    time,
  };
});

export const processedCustomers = customers.map(customer => {
  const location = locations.find(l => l.Ma_TP === customer.Ma_TP);
  
  return {
    ...customer,
    location,
  };
});

export const processedStores = stores.map(store => {
  const location = locations.find(l => l.Ma_TP === store.Ma_TP);
  
  return {
    ...store,
    location,
  };
});

// Calculate dashboard summary
export const getDashboardSummary = () => {
  const totalSales = processedOrders.reduce((sum, order) => sum + order.So_luong_tong_tien, 0);
  const totalOrders = processedOrders.length;
  const totalCustomers = new Set(processedOrders.map(order => order.Ma_KH)).size;
  const totalProducts = products.length;
  const totalStores = stores.length;

  // Sales by time (by month for the most recent year)
  const currentYear = new Date().getFullYear();
  const salesByTime = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    const monthOrders = processedOrders.filter(
      order => order.time && order.time.Nam === currentYear && order.time.Thang === month
    );
    const sales = monthOrders.reduce((sum, order) => sum + order.So_luong_tong_tien, 0);
    
    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    return {
      label: monthNames[i],
      sales,
    };
  });

  // Sales by location
  const salesByLocation = locations.map(location => {
    const locationOrders = processedOrders.filter(order => order.Ma_TP === location.Ma_TP);
    const sales = locationOrders.reduce((sum, order) => sum + order.So_luong_tong_tien, 0);
    
    return {
      location: location.Ten_TP,
      sales,
    };
  });

  // Top products
  const topProducts = products.map(product => {
    const productOrders = processedOrders.filter(order => order.Ma_MH === product.Ma_MH);
    const sales = productOrders.reduce((sum, order) => sum + order.So_luong_tong_tien, 0);
    
    return {
      product: product.Mota,
      sales,
    };
  }).sort((a, b) => b.sales - a.sales).slice(0, 5);

  // Top customers
  const topCustomers = customers.map(customer => {
    const customerOrders = processedOrders.filter(order => order.Ma_KH === customer.Ma_KH);
    const sales = customerOrders.reduce((sum, order) => sum + order.So_luong_tong_tien, 0);
    
    return {
      customer: customer.Ten_KH,
      sales,
    };
  }).sort((a, b) => b.sales - a.sales).slice(0, 5);

  return {
    totalSales,
    totalOrders,
    totalCustomers,
    totalProducts,
    totalStores,
    salesByTime,
    salesByLocation,
    topProducts,
    topCustomers,
  };
};