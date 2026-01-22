import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export function SummaryCard({ title, value, subtitle, icon, trend, className }: SummaryCardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border border-border/50 bg-card p-5',
        'card-elevated transition-all duration-300 hover:border-primary/30',
        className
      )}
    >
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
            {trend && (
              <span
                className={cn(
                  'text-xs font-medium',
                  trend.isPositive ? 'text-status-connected' : 'text-status-down'
                )}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
}
