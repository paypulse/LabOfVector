import { Activity, Server, HardDrive, Clock, Cpu, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HealthMetric {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  icon: typeof Activity;
  detail?: string;
}

const metrics: HealthMetric[] = [
  { label: 'API Latency', value: '12ms', status: 'good', icon: Clock, detail: 'Average response time' },
  { label: 'Memory Usage', value: '2.4 GB', status: 'warning', icon: Server, detail: '60% of 4GB' },
  { label: 'Disk Usage', value: '67%', status: 'good', icon: HardDrive, detail: '34 GB free' },
  { label: 'Active Connections', value: '4/5', status: 'good', icon: Wifi, detail: '1 DB offline' },
  { label: 'CPU Load', value: '23%', status: 'good', icon: Cpu, detail: 'Low utilization' },
  { label: 'Index Operations', value: '2', status: 'warning', icon: Activity, detail: 'In progress' },
];

const statusColors = {
  good: {
    text: 'text-[hsl(var(--status-connected))]',
    bg: 'bg-[hsl(var(--status-connected))]/10',
    dot: 'bg-[hsl(var(--status-connected))]',
  },
  warning: {
    text: 'text-[hsl(var(--status-warning))]',
    bg: 'bg-[hsl(var(--status-warning))]/10',
    dot: 'bg-[hsl(var(--status-warning))]',
  },
  critical: {
    text: 'text-destructive',
    bg: 'bg-destructive/10',
    dot: 'bg-destructive',
  },
};

export function HealthPanel() {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-6">
      <div className="mb-5 flex items-center gap-2">
        <Activity className="h-5 w-5 text-primary" />
        <h3 className="font-bold text-lg text-foreground">System Health</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const colors = statusColors[metric.status];
          return (
            <div
              key={metric.label}
              className={cn(
                'flex flex-col gap-3 rounded-xl p-4 transition-all',
                colors.bg,
                'hover:scale-105'
              )}
            >
              <div className="flex items-center justify-between">
                <Icon className={cn('h-5 w-5', colors.text)} />
                <span className={cn('h-2 w-2 rounded-full animate-pulse', colors.dot)} />
              </div>
              <div>
                <p className={cn('font-mono text-xl font-bold', colors.text)}>
                  {metric.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
                {metric.detail && (
                  <p className="text-xs text-muted-foreground/70 mt-0.5">{metric.detail}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
