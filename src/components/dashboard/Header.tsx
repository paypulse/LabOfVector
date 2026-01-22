import { Database, RefreshCw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  lastUpdated: string;
  onAddClick?: () => void;
}

export function Header({ lastUpdated, onAddClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 glow-effect">
            <Database className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              Vector DB Control Plane
            </h1>
            <p className="text-xs text-muted-foreground">
              멀티 Vector Database 통합 관리
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--status-connected))] animate-pulse" />
            마지막 동기화: {lastUpdated}
          </span>
          <Button variant="outline" size="sm" className="h-9">
            <RefreshCw className="h-4 w-4 mr-1.5" />
            새로고침
          </Button>
          <Button size="sm" className="h-9 bg-primary text-primary-foreground hover:bg-primary/90" onClick={onAddClick}>
            <Plus className="h-4 w-4 mr-1.5" />
            Vector DB 추가
          </Button>
        </div>
      </div>
    </header>
  );
}
