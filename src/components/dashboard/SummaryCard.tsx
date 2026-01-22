import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  badge?: string;
  badgeColor?: 'primary' | 'success' | 'warning' | 'destructive';
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

const badgeColors = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-[hsl(var(--status-connected))]/10 text-[hsl(var(--status-connected))]',
  warning: 'bg-[hsl(var(--status-warning))]/10 text-[hsl(var(--status-warning))]',
  destructive: 'bg-destructive/10 text-destructive',
};

export function SummaryCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  badge, 
  badgeColor = 'primary',
  trend, 
  className 
}: SummaryCardProps) {
  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border/50 bg-card p-6',
        'transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5',
        className
      )}
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          {badge && (
            <span className={cn(
              'px-2.5 py-1 rounded-full text-xs font-semibold',
              badgeColors[badgeColor]
            )}>
              {badge}
            </span>
          )}
        </div>

        {/* Value */}
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
            {trend && (
              <span
                className={cn(
                  'text-xs font-semibold flex items-center gap-0.5',
                  trend.isPositive ? 'text-[hsl(var(--status-connected))]' : 'text-destructive'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
