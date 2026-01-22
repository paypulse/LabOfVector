import { Layers, Box, Activity, MoreHorizontal } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Collection } from '@/lib/mockData';
import { formatBytes, formatNumber, formatDate } from '@/lib/mockData';
import { cn } from '@/lib/utils';

interface CollectionsTableProps {
  collections: Collection[];
}

const statusBadgeVariants = {
  active: 'bg-status-connected/10 text-status-connected border-status-connected/30',
  indexing: 'bg-status-warning/10 text-status-warning border-status-warning/30',
  error: 'bg-status-down/10 text-status-down border-status-down/30',
};

export function CollectionsTable({ collections }: CollectionsTableProps) {
  return (
    <div className="rounded-lg border border-border/50 bg-card card-elevated overflow-hidden">
      <div className="flex items-center justify-between border-b border-border/50 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Layers className="h-4 w-4" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">Collections</h2>
            <p className="text-xs text-muted-foreground">Vector storage containers</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          View All
        </Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent">
            <TableHead className="text-muted-foreground">Collection Name</TableHead>
            <TableHead className="text-muted-foreground text-right">Vectors</TableHead>
            <TableHead className="text-muted-foreground text-right">Dimension</TableHead>
            <TableHead className="text-muted-foreground text-right">Size</TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Updated</TableHead>
            <TableHead className="w-10" />
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
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-surface-elevated">
                    <Box className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{collection.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {collection.metadata.model}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right font-mono text-foreground">
                {formatNumber(collection.vectorCount)}
              </TableCell>
              <TableCell className="text-right font-mono text-muted-foreground">
                {collection.dimension}
              </TableCell>
              <TableCell className="text-right font-mono text-foreground">
                {formatBytes(collection.sizeBytes)}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    'font-medium capitalize',
                    statusBadgeVariants[collection.status]
                  )}
                >
                  {collection.status === 'indexing' && (
                    <Activity className="mr-1 h-3 w-3 animate-pulse" />
                  )}
                  {collection.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(collection.updatedAt)}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
