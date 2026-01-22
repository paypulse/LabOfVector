// Mock data for Vector DB Control Plane

export interface VectorDBConnection {
  id: string;
  name: string;
  engine: 'chroma' | 'weaviate' | 'milvus' | 'pinecone' | 'qdrant';
  endpoint: string;
  location: 'local' | 'docker' | 'cloud';
  status: 'connected' | 'warning' | 'down';
  version: string;
  latency: number; // ms
  collections: number;
  totalVectors: number;
  storageUsed: string;
}

export interface Collection {
  id: string;
  name: string;
  connectionId: string;
  vectorCount: number;
  dimension: number;
  metadata: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'indexing' | 'error';
  sizeBytes: number;
}

export interface Dataset {
  id: string;
  documentName: string;
  chunkCount: number;
  fileSize: number; // bytes
  indexingStatus: 'completed' | 'in_progress' | 'pending' | 'failed';
  collectionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Summary {
  totalDocuments: number;
  totalChunks: number;
  totalVectors: number;
  usedStorageBytes: number;
  lastIndexingTime: string;
  connectedDatabases: number;
  totalCollections: number;
}

export const mockConnections: VectorDBConnection[] = [
  {
    id: '1',
    name: 'Local Dev ChromaDB',
    engine: 'chroma',
    endpoint: 'localhost:8000',
    location: 'docker',
    status: 'connected',
    version: '0.4.22',
    latency: 12,
    collections: 4,
    totalVectors: 125430,
    storageUsed: '1.2 GB',
  },
  {
    id: '2',
    name: 'Docker Weaviate',
    engine: 'weaviate',
    endpoint: 'localhost:8080',
    location: 'docker',
    status: 'connected',
    version: '1.24.1',
    latency: 18,
    collections: 2,
    totalVectors: 89234,
    storageUsed: '890 MB',
  },
  {
    id: '3',
    name: 'Production Pinecone',
    engine: 'pinecone',
    endpoint: 'us-east-1.pinecone.io',
    location: 'cloud',
    status: 'connected',
    version: '2024.1',
    latency: 145,
    collections: 8,
    totalVectors: 234567,
    storageUsed: '3.4 GB',
  },
  {
    id: '4',
    name: 'Local Milvus Test',
    engine: 'milvus',
    endpoint: 'localhost:19530',
    location: 'docker',
    status: 'down',
    version: '-',
    latency: 0,
    collections: 0,
    totalVectors: 0,
    storageUsed: '-',
  },
  {
    id: '5',
    name: 'Qdrant Cloud Cluster',
    engine: 'qdrant',
    endpoint: 'xyz-cluster.qdrant.io',
    location: 'cloud',
    status: 'warning',
    version: '1.7.4',
    latency: 98,
    collections: 3,
    totalVectors: 45678,
    storageUsed: '1.1 GB',
  },
];

export const mockCollections: Collection[] = [
  {
    id: '1',
    connectionId: '1',
    name: 'product_embeddings',
    vectorCount: 52430,
    dimension: 1536,
    metadata: { model: 'text-embedding-ada-002', source: 'products_db' },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:22:00Z',
    status: 'active',
    sizeBytes: 384000000,
  },
  {
    id: '2',
    connectionId: '1',
    name: 'customer_reviews',
    vectorCount: 41000,
    dimension: 1536,
    metadata: { model: 'text-embedding-ada-002', source: 'reviews' },
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-22T09:15:00Z',
    status: 'active',
    sizeBytes: 210000000,
  },
  {
    id: '3',
    connectionId: '1',
    name: 'technical_docs',
    vectorCount: 22000,
    dimension: 768,
    metadata: { model: 'sentence-transformers', source: 'docs' },
    createdAt: '2024-01-18T16:45:00Z',
    updatedAt: '2024-01-22T11:30:00Z',
    status: 'indexing',
    sizeBytes: 52000000,
  },
  {
    id: '4',
    connectionId: '1',
    name: 'faq_database',
    vectorCount: 10000,
    dimension: 1536,
    metadata: { model: 'text-embedding-3-small', source: 'faq' },
    createdAt: '2024-01-05T12:00:00Z',
    updatedAt: '2024-01-21T18:00:00Z',
    status: 'active',
    sizeBytes: 50000000,
  },
  {
    id: '5',
    connectionId: '2',
    name: 'articles',
    vectorCount: 52100,
    dimension: 768,
    metadata: { model: 'sentence-transformers', source: 'articles' },
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-21T12:00:00Z',
    status: 'active',
    sizeBytes: 320000000,
  },
  {
    id: '6',
    connectionId: '2',
    name: 'knowledge_base',
    vectorCount: 37134,
    dimension: 768,
    metadata: { model: 'sentence-transformers', source: 'wiki' },
    createdAt: '2024-01-08T14:00:00Z',
    updatedAt: '2024-01-20T16:00:00Z',
    status: 'active',
    sizeBytes: 270000000,
  },
  {
    id: '7',
    connectionId: '3',
    name: 'embeddings_prod',
    vectorCount: 180000,
    dimension: 1536,
    metadata: { model: 'text-embedding-3-large', source: 'production' },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-22T10:00:00Z',
    status: 'active',
    sizeBytes: 2100000000,
  },
  {
    id: '8',
    connectionId: '3',
    name: 'semantic_search',
    vectorCount: 54567,
    dimension: 1536,
    metadata: { model: 'text-embedding-3-large', source: 'search' },
    createdAt: '2024-01-03T08:00:00Z',
    updatedAt: '2024-01-22T08:00:00Z',
    status: 'active',
    sizeBytes: 1300000000,
  },
  {
    id: '9',
    connectionId: '5',
    name: 'image_vectors',
    vectorCount: 32000,
    dimension: 512,
    metadata: { model: 'clip-vit-base', source: 'images' },
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-21T14:00:00Z',
    status: 'active',
    sizeBytes: 780000000,
  },
  {
    id: '10',
    connectionId: '5',
    name: 'text_embeddings',
    vectorCount: 13678,
    dimension: 768,
    metadata: { model: 'all-MiniLM-L6-v2', source: 'text' },
    createdAt: '2024-01-14T12:00:00Z',
    updatedAt: '2024-01-22T06:00:00Z',
    status: 'indexing',
    sizeBytes: 320000000,
  },
];

export const mockDatasets: Dataset[] = [
  {
    id: '1',
    documentName: 'product_catalog_2024.json',
    chunkCount: 15420,
    fileSize: 45000000,
    indexingStatus: 'completed',
    collectionId: '1',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T11:45:00Z',
  },
  {
    id: '2',
    documentName: 'technical_docs_v3.pdf',
    chunkCount: 8934,
    fileSize: 12000000,
    indexingStatus: 'completed',
    collectionId: '2',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T09:30:00Z',
  },
  {
    id: '3',
    documentName: 'user_manual_korean.md',
    chunkCount: 2341,
    fileSize: 3500000,
    indexingStatus: 'in_progress',
    collectionId: '3',
    createdAt: '2024-01-22T10:00:00Z',
    updatedAt: '2024-01-22T10:15:00Z',
  },
  {
    id: '4',
    documentName: 'api_reference.yaml',
    chunkCount: 1256,
    fileSize: 890000,
    indexingStatus: 'pending',
    collectionId: '2',
    createdAt: '2024-01-22T11:00:00Z',
    updatedAt: '2024-01-22T11:00:00Z',
  },
  {
    id: '5',
    documentName: 'legacy_data_import.csv',
    chunkCount: 0,
    fileSize: 78000000,
    indexingStatus: 'failed',
    collectionId: '4',
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-01-20T14:05:00Z',
  },
];

export const mockSummary: Summary = {
  totalDocuments: 156,
  totalChunks: 494909,
  totalVectors: 494909,
  usedStorageBytes: 5786000000,
  lastIndexingTime: '2024-01-22T11:30:00Z',
  connectedDatabases: 4,
  totalCollections: 17,
};

// Utility functions
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return '방금 전';
  if (diffMins < 60) return `${diffMins}분 전`;
  if (diffHours < 24) return `${diffHours}시간 전`;
  return `${diffDays}일 전`;
}

export function getCollectionsByConnection(connectionId: string): Collection[] {
  return mockCollections.filter(c => c.connectionId === connectionId);
}
