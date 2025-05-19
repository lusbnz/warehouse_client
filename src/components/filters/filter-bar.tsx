import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FilterState } from '@/types';

interface FilterBarProps {
  filter: FilterState;
  onUpdateDateRange: (from?: Date, to?: Date) => void;
  onUpdateTimeGranularity: (granularity: 'day' | 'month' | 'quarter' | 'year') => void;
  onResetFilters: () => void;
  locationsFilter?: React.ReactNode;
  customersFilter?: React.ReactNode;
  productsFilter?: React.ReactNode;
  storesFilter?: React.ReactNode;
}

export function FilterBar({
  filter,
  onUpdateDateRange,
  onUpdateTimeGranularity,
  onResetFilters,
  locationsFilter,
  customersFilter,
  productsFilter,
  storesFilter,
}: FilterBarProps) {
  return (
    <div className="mb-6 space-y-4 rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onResetFilters}>
          <X className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Date Range</label>
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'justify-start text-left font-normal w-full',
                    !filter.dateRange.from && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filter.dateRange.from ? (
                    format(filter.dateRange.from, 'PP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filter.dateRange.from}
                  onSelect={(date) => onUpdateDateRange(date, filter.dateRange.to)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'justify-start text-left font-normal w-full',
                    !filter.dateRange.to && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filter.dateRange.to ? (
                    format(filter.dateRange.to, 'PP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filter.dateRange.to}
                  onSelect={(date) => onUpdateDateRange(filter.dateRange.from, date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Time Granularity</label>
          <Select
            value={filter.timeGranularity}
            onValueChange={(value) => 
              onUpdateTimeGranularity(value as 'day' | 'month' | 'quarter' | 'year')
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select granularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
              <SelectItem value="year">Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {locationsFilter && (
          <div>
            <label className="mb-1 block text-sm font-medium">Locations</label>
            {locationsFilter}
          </div>
        )}
        {customersFilter && (
          <div>
            <label className="mb-1 block text-sm font-medium">Customers</label>
            {customersFilter}
          </div>
        )}
        {productsFilter && (
          <div>
            <label className="mb-1 block text-sm font-medium">Products</label>
            {productsFilter}
          </div>
        )}
        {storesFilter && (
          <div>
            <label className="mb-1 block text-sm font-medium">Stores</label>
            {storesFilter}
          </div>
        )}
      </div>
    </div>
  );
}