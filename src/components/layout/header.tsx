import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <div className="flex h-14 items-center justify-between border-b bg-background px-4 lg:px-6">
      <div>
        <Button variant="outline" size="sm">
          Today: {new Date().toLocaleDateString()}
        </Button>
      </div>
    </div>
  );
}