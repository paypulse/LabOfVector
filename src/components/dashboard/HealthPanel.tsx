import { Activity, Server, HardDrive, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HealthMetric {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
  icon: typeof Activity;
}

const metrics: HealthMetric[] = [
  { label: 'API Latency', value: '12ms', status: 'good', icon: Clock },
  { label: 'Memory', value: '2.4 GB', status: 'warning', icon: Server },
  { label: 'Disk Usage', value: '67%', status: 'good', icon: HardDrive },
  { label: 'Connections', value: '3/4', status: 'good', icon: Activity },
];

const statusColors = {
  good: 'text-status-connected',
  warning: 'text-status-warning',
  critical: 'text-status-down',
};

export function HealthPanel() {
  return (
    <div className="rounded-lg border border-border/50 bg-card card-elevated p-5">
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-4 w-4 text-primary" />
        <h3 className="font-semibold text-foreground">System Health</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="flex items-center gap-3 rounded-lg bg-surface-elevated p-3"
            >
              <Icon className={cn('h-4 w-4', statusColors[metric.status])} />
              <div>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className={cn('font-mono text-sm font-medium', statusColors[metric.status])}>
                  {metric.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
