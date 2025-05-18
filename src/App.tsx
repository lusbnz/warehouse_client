import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/layout';
import { Dashboard } from '@/pages/dashboard/dashboard';
import { Inventory } from '@/pages/inventory/inventory';
import { Orders } from '@/pages/orders/orders';
import { Customers } from '@/pages/customers/customers';
import { Stores } from '@/pages/stores/stores';
import '@/App.css';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/stores" element={<Stores />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;