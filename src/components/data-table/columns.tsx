import { ColumnDef } from '@tanstack/react-table';
import { CustomerData, OrderData, ProductData, StoreData, InventoryData } from '@/types';

// Customer Columns
export const customerColumns: ColumnDef<CustomerData>[] = [
  {
    accessorKey: 'Ma_KH',
    header: 'Customer ID',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("Ma_KH")}</div>
    ),
  },
  {
    accessorKey: 'Ten_KH',
    header: 'Customer Name',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("Ten_KH")}</div>
    ),
  },
  {
    accessorKey: 'Loai_KH',
    header: 'Customer Type',
    cell: ({ row }) => {
      const type = row.getValue('Loai_KH') as string;
      return (
        <div className="flex items-center justify-left">
          <span
            className={`mr-2 h-2 w-2 rounded-full ${
              type === 'VIP' ? 'bg-amber-500' : 'bg-neutral-500'
            }`}
          />
          {type}
        </div>
      );
    },
  },
  {
    accessorKey: 'location.Ten_TP',
    header: 'City',
  },
  {
    accessorKey: 'location.Bang',
    header: 'Region',
  },
];

// Product Columns
export const productColumns: ColumnDef<ProductData>[] = [
  {
    accessorKey: 'Ma_MH',
    header: 'Product ID',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("Ma_MH")}</div>
    ),
  },
  {
    accessorKey: 'Mota',
    header: 'Description',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("Mota")}</div>
    ),
  },
  {
    accessorKey: 'KichCo',
    header: 'Size',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("KichCo")}</div>
    ),
  },
  {
    accessorKey: 'TrongLuong',
    header: 'Weight (g)',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("TrongLuong")}</div>
    ),
  },
  {
    accessorKey: 'Gia',
    header: 'Price',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('Gia'));
      const formatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(amount);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
];

// Store Columns
export const storeColumns: ColumnDef<StoreData>[] = [
  {
    accessorKey: 'Ma_CH',
    header: 'Store ID',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("Ma_CH")}</div>
    ),
  },
  {
    accessorKey: 'location.Ten_TP',
    header: 'City',
  },
  {
    accessorKey: 'location.Bang',
    header: 'Region',
  },
  {
    accessorKey: 'SDT',
    header: 'Phone',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("SDT")}</div>
    ),
  },
  {
    accessorKey: 'NgayMoCua',
    header: 'Opening Date',
    cell: ({ row }) => {
      const date = row.getValue('NgayMoCua') as string;
      return new Date(date).toLocaleDateString();
    },
  },
];

// Order Columns
export const orderColumns: ColumnDef<OrderData>[] = [
  {
    accessorKey: 'Date_key',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('Date_key') as string;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    accessorKey: 'customer.Ten_KH',
    header: 'Customer',
  },
  {
    accessorKey: 'product.Mota',
    header: 'Product',
  },
  {
    accessorKey: 'Ma_TP',
    header: 'Location',
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("Ma_TP")}</div>
    ),
  },
  {
    accessorKey: 'So_luong_tong_tien',
    header: 'Total',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('So_luong_tong_tien'));
      const formatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(amount);
      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
];

// Inventory Columns
export const inventoryColumns: ColumnDef<InventoryData>[] = [
  {
    accessorKey: 'Date_key',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('Date_key') as string;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    accessorKey: 'store.Ma_CH',
    header: 'Store',
  },
  {
    accessorKey: 'product.Mota',
    header: 'Product',
  },
  {
    accessorKey: 'product.KichCo',
    header: 'Size',
  },
  {
    accessorKey: 'So_luong_nhap',
    header: 'Quantity',
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue('So_luong_nhap')}</div>;
    },
  },
];