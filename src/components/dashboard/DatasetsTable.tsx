import { FileText, CheckCircle, Loader2, Clock, XCircle, MoreHorizontal } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { Dataset } from '@/lib/mockData';
import { formatBytes, formatNumber, formatDate } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface DatasetsTableProps {
  datasets: Dataset[];
}

const statusConfig = {
  completed: {
    icon: CheckCircle,
    label: '완료',
    className: 'bg-status-connected/10 text-status-connected border-status-connected/30',
  },
  in_progress: {
    icon: Loader2,
    label: '진행중',
    className: 'bg-status-warning/10 text-status-warning border-status-warning/30',
  },
  pending: {
    icon: Clock,
    label: '대기중',
    className: 'bg-muted text-muted-foreground border-border',
  },
  failed: {
    icon: XCircle,
    label: '실패',
    className: 'bg-status-down/10 text-status-down border-status-down/30',
  },
};

export function DatasetsTable({ datasets }: DatasetsTableProps) {
  return (
    <div className="rounded-lg border border-border/50 bg-card card-elevated overflow-hidden">
      <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Datasets</h2>
            <p className="text-xs text-muted-foreground">Indexed documents and files</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          Upload New
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent">
            <TableHead className="text-muted-foreground">Document Name</TableHead>
            <TableHead className="text-muted-foreground text-right">Chunks</TableHead>
            <TableHead className="text-muted-foreground text-right">File Size</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Updated</TableHead>
            <TableHead className="w-10" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {datasets.map((dataset, index) => {
            const status = statusConfig[dataset.indexingStatus];
            const StatusIcon = status.icon;
            
            return (
              <TableRow
                key={dataset.id}
                className={cn(
                  'border-border/30 transition-colors hover:bg-surface-elevated',
                  'animate-fade-in'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-elevated">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="max-w-[200px]">
                      <p className="truncate font-medium text-foreground">
                        {dataset.documentName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Collection: {dataset.collectionId}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono text-foreground">
                  {formatNumber(dataset.chunkCount)}
                </TableCell>
                <TableCell className="text-right font-mono text-muted-foreground">
                  {formatBytes(dataset.fileSize)}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <Badge
                      variant="outline"
                      className={cn('font-medium', status.className)}
                    >
                      <StatusIcon
                        className={cn(
                          'mr-1 h-3 w-3',
                          dataset.indexingStatus === 'in_progress' && 'animate-spin'
                        )}
                      />
                      {status.label}
                    </Badge>
                    {dataset.indexingStatus === 'in_progress' && (
                      <Progress value={65} className="h-1 w-20" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDate(dataset.updatedAt)}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
