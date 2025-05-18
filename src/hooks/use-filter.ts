import { useState, useCallback } from 'react';
import { FilterState } from '@/types';

export const useFilter = () => {
  const [filter, setFilter] = useState<FilterState>({
    dateRange: {
      from: undefined,
      to: undefined,
    },
    locations: [],
    customers: [],
    products: [],
    stores: [],
    timeGranularity: 'month',
  });

  const updateDateRange = useCallback((from?: Date, to?: Date) => {
    setFilter(prev => ({
      ...prev,
      dateRange: {
        from,
        to,
      },
    }));
  }, []);

  const updateLocations = useCallback((locations: string[]) => {
    setFilter(prev => ({
      ...prev,
      locations,
    }));
  }, []);

  const updateCustomers = useCallback((customers: string[]) => {
    setFilter(prev => ({
      ...prev,
      customers,
    }));
  }, []);

  const updateProducts = useCallback((products: string[]) => {
    setFilter(prev => ({
      ...prev,
      products,
    }));
  }, []);

  const updateStores = useCallback((stores: string[]) => {
    setFilter(prev => ({
      ...prev,
      stores,
    }));
  }, []);

  const updateTimeGranularity = useCallback(
    (timeGranularity: 'day' | 'month' | 'quarter' | 'year') => {
      setFilter(prev => ({
        ...prev,
        timeGranularity,
      }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilter({
      dateRange: {
        from: undefined,
        to: undefined,
      },
      locations: [],
      customers: [],
      products: [],
      stores: [],
      timeGranularity: 'month',
    });
  }, []);

  return {
    filter,
    updateDateRange,
    updateLocations,
    updateCustomers,
    updateProducts,
    updateStores,
    updateTimeGranularity,
    resetFilters,
  };
};