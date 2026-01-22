import { FileText, Database, Layers, HardDrive, Clock, Server } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { ConnectionCard } from '@/components/dashboard/ConnectionCard';
import { CollectionsTable } from '@/components/dashboard/CollectionsTable';
import { DatasetsTable } from '@/components/dashboard/DatasetsTable';
import { HealthPanel } from '@/components/dashboard/HealthPanel';
import {
  mockSummary,
  mockConnections,
  mockCollections,
  mockDatasets,
  formatBytes,
  formatNumber,
  getRelativeTime,
} from '@/lib/mockData';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Ambient glow effect */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -top-20 right-1/4 h-60 w-60 rounded-full bg-primary/5 blur-[80px]" />
      </div>

      <Header lastUpdated={getRelativeTime(mockSummary.lastIndexingTime)} />

      <main className="relative mx-auto max-w-7xl space-y-6 p-6">
        {/* Summary Cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="Total Documents"
            value={formatNumber(mockSummary.totalDocuments)}
            subtitle="Indexed files"
            icon={<FileText className="h-5 w-5" />}
            trend={{ value: '+12', isPositive: true }}
          />
          <SummaryCard
            title="Total Vectors"
            value={formatNumber(mockSummary.totalVectors)}
            subtitle="Across all collections"
            icon={<Layers className="h-5 w-5" />}
            trend={{ value: '+5.2K', isPositive: true }}
          />
          <SummaryCard
            title="Storage Used"
            value={formatBytes(mockSummary.usedStorageBytes)}
            subtitle="Vector storage"
            icon={<HardDrive className="h-5 w-5" />}
          />
          <SummaryCard
            title="Connected DBs"
            value={`${mockSummary.connectedDatabases}/${mockConnections.length}`}
            subtitle="Active connections"
            icon={<Database className="h-5 w-5" />}
          />
        </section>

        {/* Connections + Health Grid */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <Server className="h-4 w-4 text-primary" />
              <h2 className="font-semibold text-foreground">Vector DB Connections</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {mockConnections.map((connection) => (
                <ConnectionCard key={connection.id} connection={connection} />
              ))}
            </div>
          </div>
          <div>
            <HealthPanel />
          </div>
        </section>

        {/* Collections Table */}
        <section>
          <CollectionsTable collections={mockCollections} />
        </section>

        {/* Datasets Table */}
        <section>
          <DatasetsTable datasets={mockDatasets} />
        </section>

        {/* Footer info */}
        <footer className="flex items-center justify-between border-t border-border/50 pt-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5" />
            <span>Last indexing: {getRelativeTime(mockSummary.lastIndexingTime)}</span>
          </div>
          <span>Vector Control Plane v0.1.0 • Local Environment</span>
        </footer>
      </main>
    </div>
  );
};

export default Index;
