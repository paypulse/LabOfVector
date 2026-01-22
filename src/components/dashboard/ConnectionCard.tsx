import { Database, Cloud, Monitor, Zap, CheckCircle, XCircle, AlertCircle, Settings, Trash2 } from 'lucide-react';
import type { VectorDBConnection } from '@/lib/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ConnectionCardProps {
  connection: VectorDBConnection;
  isSelected?: boolean;
  onClick?: () => void;
}

const engineColors: Record<VectorDBConnection['engine'], { bg: string; text: string; glow: string }> = {
  chroma: { bg: 'bg-orange-500/20', text: 'text-orange-400', glow: 'shadow-orange-500/20' },
  weaviate: { bg: 'bg-green-500/20', text: 'text-green-400', glow: 'shadow-green-500/20' },
  milvus: { bg: 'bg-blue-500/20', text: 'text-blue-400', glow: 'shadow-blue-500/20' },
  pinecone: { bg: 'bg-purple-500/20', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  qdrant: { bg: 'bg-rose-500/20', text: 'text-rose-400', glow: 'shadow-rose-500/20' },
};

const statusConfig = {
  connected: {
    icon: CheckCircle,
    label: 'Connected',
    dotClass: 'status-dot-connected',
    textClass: 'text-[hsl(var(--status-connected))]',
  },
  warning: {
    icon: AlertCircle,
    label: 'Warning',
    dotClass: 'status-dot-warning',
    textClass: 'text-[hsl(var(--status-warning))]',
  },
  down: {
    icon: XCircle,
    label: 'Disconnected',
    dotClass: 'status-dot-down',
    textClass: 'text-[hsl(var(--status-down))]',
  },
};

export function ConnectionCard({ connection, isSelected, onClick }: ConnectionCardProps) {
  const colors = engineColors[connection.engine];
  const status = statusConfig[connection.status];
  const StatusIcon = status.icon;

  return (
    <button
      onClick={onClick}
      className={cn(
        'group relative w-full overflow-hidden rounded-xl border-2 p-5 text-left',
        'transition-all duration-300',
        'bg-card hover:bg-surface-elevated',
        isSelected
          ? 'border-primary/50 shadow-lg shadow-primary/10'
          : 'border-border/50 hover:border-border',
        connection.status === 'down' && 'opacity-60'
      )}
    >
      {/* Selection indicator glow */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
      )}
      
      {/* Header */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-lg',
              colors.bg,
              colors.text
            )}
          >
            <Database className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              {connection.location === 'cloud' ? (
                <Cloud className="h-3.5 w-3.5 text-primary" />
              ) : (
                <Monitor className="h-3.5 w-3.5 text-muted-foreground" />
              )}
              <span className={cn('text-xs font-bold uppercase tracking-wider', colors.text)}>
                {connection.engine}
              </span>
            </div>
            <h3 className="font-semibold text-foreground text-base leading-tight">
              {connection.name}
            </h3>
          </div>
        </div>
        <StatusIcon className={cn('h-5 w-5', status.textClass)} />
      </div>

      {/* Details */}
      <div className="relative space-y-2.5 border-t border-border/50 pt-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">타입</span>
          <span className={cn(
            'px-2 py-0.5 rounded text-xs font-medium',
            connection.location === 'cloud' 
              ? 'bg-primary/10 text-primary' 
              : 'bg-muted text-muted-foreground'
          )}>
            {connection.location === 'cloud' ? 'Cloud' : 'Local Docker'}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Endpoint</span>
          <code className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-foreground max-w-[180px] truncate">
            {connection.endpoint}
          </code>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">버전</span>
          <span className="text-foreground font-medium">{connection.version}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">응답시간</span>
          <span className={cn(
            'flex items-center gap-1 font-medium',
            connection.status === 'down' ? 'text-muted-foreground' :
            connection.latency < 30 ? 'text-[hsl(var(--status-connected))]' : 
            connection.latency < 100 ? 'text-[hsl(var(--status-warning))]' : 'text-[hsl(var(--status-down))]'
          )}>
            {connection.status !== 'down' && <Zap className="h-3 w-3" />}
            {connection.status === 'down' ? '-' : `${connection.latency}ms`}
          </span>
        </div>

        {connection.status !== 'down' && (
          <>
            <div className="border-t border-border/30 pt-2.5 mt-2.5" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">컬렉션</span>
              <span className="font-bold text-primary">{connection.collections}개</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">벡터</span>
              <span className="font-bold text-foreground">{connection.totalVectors.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">용량</span>
              <span className="font-bold text-[hsl(var(--status-connected))]">{connection.storageUsed}</span>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="relative flex gap-2 mt-4 pt-4 border-t border-border/50">
        <Button
          variant="secondary"
          size="sm"
          className="flex-1 h-8 text-xs"
          onClick={(e) => e.stopPropagation()}
        >
          <Settings className="h-3 w-3 mr-1.5" />
          설정
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
          onClick={(e) => e.stopPropagation()}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </button>
  );
}
