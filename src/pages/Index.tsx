import { useState } from 'react';
import { FileText, Database, Layers, HardDrive, Server, CheckCircle } from 'lucide-react';
import { Header } from '@/components/dashboard/Header';
import { SummaryCard } from '@/components/dashboard/SummaryCard';
import { ConnectionCard } from '@/components/dashboard/ConnectionCard';
import { CollectionDetailPanel, NoSelectionPanel, DisconnectedPanel } from '@/components/dashboard/CollectionDetailPanel';
import { HealthPanel } from '@/components/dashboard/HealthPanel';
import { AddConnectionModal } from '@/components/dashboard/AddConnectionModal';
import {
  mockConnections,
  formatBytes,
  formatNumber,
  getRelativeTime,
  getCollectionsByConnection,
} from '@/lib/mockData';

const Index = () => {
  const [selectedDBId, setSelectedDBId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const selectedDB = mockConnections.find((c) => c.id === selectedDBId);
  const selectedCollections = selectedDBId ? getCollectionsByConnection(selectedDBId) : [];
  
  const connectedDBs = mockConnections.filter((db) => db.status === 'connected');
  const totalStats = {
    totalVectors: connectedDBs.reduce((sum, db) => sum + db.totalVectors, 0),
    totalCollections: connectedDBs.reduce((sum, db) => sum + db.collections, 0),
    totalStorage: connectedDBs.reduce((sum, db) => {
      const match = db.storageUsed.match(/([\d.]+)\s*(GB|MB)/);
      if (!match) return sum;
      const value = parseFloat(match[1]);
      const unit = match[2];
      return sum + (unit === 'GB' ? value * 1024 * 1024 * 1024 : value * 1024 * 1024);
    }, 0),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Ambient glow effect */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -top-20 right-1/3 h-72 w-72 rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <Header 
        lastUpdated={getRelativeTime(new Date().toISOString())} 
        onAddClick={() => setShowAddModal(true)}
      />

      <main className="relative mx-auto max-w-7xl space-y-8 p-6">
        {/* Summary Cards */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            title="등록된 Vector DB"
            value={mockConnections.length.toString()}
            subtitle="Local + Cloud"
            icon={<Server className="h-6 w-6" />}
            badge="엔진"
            badgeColor="primary"
          />
          <SummaryCard
            title="활성 연결"
            value={connectedDBs.length.toString()}
            subtitle="Connected"
            icon={<CheckCircle className="h-6 w-6" />}
            badge="연결"
            badgeColor="success"
          />
          <SummaryCard
            title="전체 컬렉션"
            value={totalStats.totalCollections.toString()}
            subtitle="Across all DBs"
            icon={<Database className="h-6 w-6" />}
            badge="컬렉션"
            badgeColor="primary"
          />
          <SummaryCard
            title="총 벡터 수"
            value={formatNumber(totalStats.totalVectors)}
            subtitle="Total indexed vectors"
            icon={<Layers className="h-6 w-6" />}
            badge="벡터"
            badgeColor="warning"
          />
        </section>

        {/* Vector DB Connections */}
        <section>
          <div className="mb-5 flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Vector DB 연결 목록</h2>
            <span className="ml-2 text-sm text-muted-foreground">
              ({mockConnections.length}개 등록됨)
            </span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockConnections.map((connection) => (
              <ConnectionCard
                key={connection.id}
                connection={connection}
                isSelected={selectedDBId === connection.id}
                onClick={() => setSelectedDBId(connection.id)}
              />
            ))}
          </div>
        </section>

        {/* Collection Detail Panel */}
        <section>
          {!selectedDB ? (
            <NoSelectionPanel />
          ) : selectedDB.status === 'down' ? (
            <DisconnectedPanel connection={selectedDB} />
          ) : (
            <CollectionDetailPanel
              connection={selectedDB}
              collections={selectedCollections}
            />
          )}
        </section>

        {/* Health Panel - Now full width at bottom */}
        <section>
          <HealthPanel />
        </section>
      </main>

      {/* Add Connection Modal */}
      <AddConnectionModal open={showAddModal} onOpenChange={setShowAddModal} />
    </div>
  );
};

export default Index;
