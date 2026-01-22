import { Database, Layers, Activity, CheckCircle, Plus, Cloud, Monitor, XCircle, RefreshCw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { VectorDBConnection, Collection } from '@/lib/mockData';
import { formatBytes, formatNumber } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface CollectionDetailPanelProps {
  connection: VectorDBConnection;
  collections: Collection[];
}

const statusBadgeVariants = {
  active: 'bg-[hsl(var(--status-connected))]/10 text-[hsl(var(--status-connected))] border-[hsl(var(--status-connected))]/30',
  indexing: 'bg-[hsl(var(--status-warning))]/10 text-[hsl(var(--status-warning))] border-[hsl(var(--status-warning))]/30',
  error: 'bg-destructive/10 text-destructive border-destructive/30',
};

export function CollectionDetailPanel({ connection, collections }: CollectionDetailPanelProps) {
  const totalVectors = collections.reduce((sum, c) => sum + c.vectorCount, 0);

  return (
    <div className="rounded-xl border border-border/50 bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 px-6 py-5 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-foreground">{connection.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              {connection.location === 'cloud' ? (
                <span className="flex items-center gap-1 text-xs text-primary">
                  <Cloud className="h-3 w-3" />
                  Cloud
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Monitor className="h-3 w-3" />
                  Local Docker
                </span>
              )}
              <span className="text-xs text-muted-foreground">
                {connection.engine.toUpperCase()} v{connection.version}
              </span>
            </div>
          </div>
        </div>
        <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-1.5" />
          새 컬렉션
        </Button>
      </div>

      {/* Table */}
      {collections.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-muted-foreground font-semibold">컬렉션명</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">벡터 수</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">차원</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-right">용량</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-center">상태</TableHead>
                <TableHead className="text-muted-foreground font-semibold text-center">작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {collections.map((collection, index) => (
                <TableRow
                  key={collection.id}
                  className={cn(
                    'border-border/30 transition-colors hover:bg-surface-elevated',
                    'animate-fade-in'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                        <Layers className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{collection.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {collection.metadata.model}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-foreground">
                    {formatNumber(collection.vectorCount)}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-muted-foreground">
                    {collection.dimension}
                  </TableCell>
                  <TableCell className="text-right font-mono text-sm text-foreground">
                    {formatBytes(collection.sizeBytes)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={cn(
                        'font-semibold',
                        statusBadgeVariants[collection.status]
                      )}
                    >
                      {collection.status === 'active' && (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      )}
                      {collection.status === 'indexing' && (
                        <Activity className="mr-1 h-3 w-3 animate-pulse" />
                      )}
                      {collection.status === 'active' ? '완료' : collection.status === 'indexing' ? '진행중' : '오류'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10"
                    >
                      상세보기
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Footer */}
          <div className="flex justify-between items-center px-6 py-4 border-t border-border/50 bg-muted/30">
            <span className="text-sm text-muted-foreground">
              총 <strong className="text-foreground">{collections.length}개</strong> 컬렉션
            </span>
            <span className="text-sm text-muted-foreground">
              전체 벡터: <strong className="text-foreground">{totalVectors.toLocaleString()}</strong>
            </span>
          </div>
        </>
      ) : (
        <div className="text-center py-16 text-muted-foreground">
          <Database className="h-14 w-14 mx-auto mb-4 opacity-30" />
          <p className="font-medium">이 Vector DB에는 아직 컬렉션이 없습니다.</p>
        </div>
      )}
    </div>
  );
}

export function NoSelectionPanel() {
  return (
    <div className="rounded-xl border-2 border-dashed border-border/50 bg-muted/20 p-12 text-center">
      <Database className="h-16 w-16 mx-auto mb-5 text-muted-foreground/50" />
      <h3 className="text-lg font-bold text-foreground mb-2">Vector DB를 선택하세요</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        위 목록에서 Vector DB를 클릭하면 해당 DB의 컬렉션과 상세 정보를 확인할 수 있습니다.
      </p>
    </div>
  );
}

export function DisconnectedPanel({ connection }: { connection: VectorDBConnection }) {
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-12 text-center">
      <XCircle className="h-16 w-16 mx-auto mb-5 text-destructive/70" />
      <h3 className="text-lg font-bold text-foreground mb-2">연결할 수 없습니다</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        <strong>{connection.name}</strong>에 연결할 수 없습니다. 서버 상태를 확인해주세요.
      </p>
      <Button variant="destructive" size="lg">
        <RefreshCw className="h-4 w-4 mr-2" />
        재연결 시도
      </Button>
    </div>
  );
}
