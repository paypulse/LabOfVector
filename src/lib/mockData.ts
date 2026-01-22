// Mock data for Vector DB Control Plane

export interface VectorDBConnection {
  id: string;
  name: string;
  engine: 'chroma' | 'weaviate' | 'milvus' | 'pinecone';
  endpoint: string;
  location: 'local' | 'docker' | 'cloud';
  status: 'connected' | 'warning' | 'down';
  version: string;
  latency: number; // ms
}

export interface Collection {
  id: string;
  name: string;
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
    name: 'Local Chroma',
    engine: 'chroma',
    endpoint: 'http://localhost:8000',
    location: 'docker',
    status: 'connected',
    version: '0.4.22',
    latency: 12,
  },
  {
    id: '2',
    name: 'Dev Weaviate',
    engine: 'weaviate',
    endpoint: 'http://localhost:8080',
    location: 'docker',
    status: 'connected',
    version: '1.24.1',
    latency: 8,
  },
  {
    id: '3',
    name: 'Test Milvus',
    engine: 'milvus',
    endpoint: 'http://localhost:19530',
    location: 'docker',
    status: 'warning',
    version: '2.3.5',
    latency: 45,
  },
  {
    id: '4',
    name: 'Cloud Pinecone',
    engine: 'pinecone',
    endpoint: 'https://xxx.pinecone.io',
    location: 'cloud',
    status: 'down',
    version: '2.0',
    latency: 0,
  },
];

export const mockCollections: Collection[] = [
  {
    id: '1',
    name: 'product_embeddings',
    vectorCount: 125430,
    dimension: 1536,
    metadata: { model: 'text-embedding-ada-002', source: 'products_db' },
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-20T14:22:00Z',
    status: 'active',
    sizeBytes: 384000000,
  },
  {
    id: '2',
    name: 'document_chunks',
    vectorCount: 89234,
    dimension: 768,
    metadata: { model: 'sentence-transformers', source: 'documents' },
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-22T09:15:00Z',
    status: 'active',
    sizeBytes: 210000000,
  },
  {
    id: '3',
    name: 'user_queries',
    vectorCount: 45678,
    dimension: 384,
    metadata: { model: 'all-MiniLM-L6-v2', source: 'query_logs' },
    createdAt: '2024-01-18T16:45:00Z',
    updatedAt: '2024-01-22T11:30:00Z',
    status: 'indexing',
    sizeBytes: 52000000,
  },
  {
    id: '4',
    name: 'knowledge_base',
    vectorCount: 234567,
    dimension: 1536,
    metadata: { model: 'text-embedding-3-small', source: 'wiki_export' },
    createdAt: '2024-01-05T12:00:00Z',
    updatedAt: '2024-01-21T18:00:00Z',
    status: 'active',
    sizeBytes: 720000000,
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
  usedStorageBytes: 1366000000,
  lastIndexingTime: '2024-01-22T11:30:00Z',
  connectedDatabases: 3,
  totalCollections: 4,
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
