import { Database, Cloud, Server, Zap } from 'lucide-react';
import type { VectorDBConnection } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface ConnectionCardProps {
  connection: VectorDBConnection;
}

const engineIcons: Record<VectorDBConnection['engine'], typeof Database> = {
  chroma: Database,
  weaviate: Database,
  milvus: Database,
  pinecone: Cloud,
};

const engineColors: Record<VectorDBConnection['engine'], string> = {
  chroma: 'text-orange-400',
  weaviate: 'text-green-400',
  milvus: 'text-blue-400',
  pinecone: 'text-purple-400',
};

const statusConfig = {
  connected: {
    label: 'Connected',
    dotClass: 'status-dot-connected',
    textClass: 'text-status-connected',
  },
  warning: {
    label: 'Warning',
    dotClass: 'status-dot-warning',
    textClass: 'text-status-warning',
  },
  down: {
    label: 'Down',
    dotClass: 'status-dot-down',
    textClass: 'text-status-down',
  },
};

export function ConnectionCard({ connection }: ConnectionCardProps) {
  const Icon = engineIcons[connection.engine];
  const status = statusConfig[connection.status];

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-lg border border-border/50 bg-card p-4',
        'card-elevated transition-all duration-300',
        connection.status === 'connected' && 'hover:border-status-connected/30',
        connection.status === 'warning' && 'hover:border-status-warning/30',
        connection.status === 'down' && 'hover:border-status-down/30 opacity-60'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-lg bg-surface-elevated',
              engineColors[connection.engine]
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{connection.name}</h3>
            <p className="text-xs text-muted-foreground capitalize">
              {connection.engine} • {connection.location === 'docker' ? 'Docker' : connection.location === 'local' ? 'Local' : 'Cloud'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={status.dotClass} />
          <span className={cn('text-xs font-medium', status.textClass)}>
            {status.label}
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Endpoint</span>
          <code className="rounded bg-surface-elevated px-2 py-0.5 font-mono text-xs text-foreground">
            {connection.endpoint}
          </code>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Version</span>
          <span className="text-foreground">{connection.version}</span>
        </div>
        {connection.status !== 'down' && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Latency</span>
            <span className={cn(
              'flex items-center gap-1',
              connection.latency < 20 ? 'text-status-connected' : 
              connection.latency < 50 ? 'text-status-warning' : 'text-status-down'
            )}>
              <Zap className="h-3 w-3" />
              {connection.latency}ms
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
