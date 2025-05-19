import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Store,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'Inventory',
    href: '/inventory',
    icon: <Package className="h-5 w-5" />,
  },
  {
    title: 'Orders',
    href: '/orders',
    icon: <ShoppingCart className="h-5 w-5" />,
  },
  {
    title: 'Customers',
    href: '/customers',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Stores',
    href: '/stores',
    icon: <Store className="h-5 w-5" />,
  },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div
      className={cn(
        'flex h-screen flex-col border-r bg-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-14 items-center border-b px-3">
        {!collapsed && (
          <h1 className="text-lg font-semibold">KhoDuLieu Admin</h1>
        )}
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            
            return collapsed ? (
              <TooltipProvider key={index}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-md',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      {item.icon}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.title}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <Link
                key={index}
                to={item.href}
                className={cn(
                  'flex h-10 items-center gap-3 rounded-md px-3',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto border-t p-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="mb-2 w-full justify-start"
        >
          {collapsed ? (
            <span className="sr-only">Expand</span>
          ) : (
            <span>Collapse</span>
          )}
        </Button>
      </div>
    </div>
  );
}