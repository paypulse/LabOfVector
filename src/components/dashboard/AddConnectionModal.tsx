import { useState } from 'react';
import { Database, Cloud, Monitor, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface AddConnectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const engines = [
  { value: 'chroma', label: 'ChromaDB', color: 'text-orange-400' },
  { value: 'weaviate', label: 'Weaviate', color: 'text-green-400' },
  { value: 'milvus', label: 'Milvus', color: 'text-blue-400' },
  { value: 'pinecone', label: 'Pinecone', color: 'text-purple-400' },
  { value: 'qdrant', label: 'Qdrant', color: 'text-rose-400' },
];

export function AddConnectionModal({ open, onOpenChange }: AddConnectionModalProps) {
  const [locationType, setLocationType] = useState<'local' | 'cloud'>('local');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Database className="h-5 w-5 text-primary" />
            새 Vector DB 추가
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Local Docker 또는 Cloud Vector DB를 연결합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-4">
          {/* Engine Select */}
          <div className="space-y-2">
            <Label className="text-foreground">엔진 선택</Label>
            <Select defaultValue="chroma">
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Vector DB 엔진을 선택하세요" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {engines.map((engine) => (
                  <SelectItem key={engine.value} value={engine.value}>
                    <span className={cn('font-medium', engine.color)}>{engine.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Connection Name */}
          <div className="space-y-2">
            <Label className="text-foreground">연결 이름</Label>
            <Input
              placeholder="예: Production ChromaDB"
              className="bg-background border-border"
            />
          </div>

          {/* Location Type */}
          <div className="space-y-2">
            <Label className="text-foreground">타입</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLocationType('local')}
                className={cn(
                  'flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all',
                  locationType === 'local'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-background text-muted-foreground hover:border-muted-foreground'
                )}
              >
                <Monitor className="h-4 w-4" />
                <span className="font-medium">Local Docker</span>
              </button>
              <button
                onClick={() => setLocationType('cloud')}
                className={cn(
                  'flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all',
                  locationType === 'cloud'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-background text-muted-foreground hover:border-muted-foreground'
                )}
              >
                <Cloud className="h-4 w-4" />
                <span className="font-medium">Cloud</span>
              </button>
            </div>
          </div>

          {/* Endpoint */}
          <div className="space-y-2">
            <Label className="text-foreground">Endpoint</Label>
            <Input
              placeholder={locationType === 'local' ? 'localhost:8000' : 'us-east-1.example.io'}
              className="bg-background border-border font-mono text-sm"
            />
          </div>

          {/* API Key (Cloud only) */}
          {locationType === 'cloud' && (
            <div className="space-y-2">
              <Label className="text-foreground">API Key</Label>
              <Input
                type="password"
                placeholder="sk-xxxxx..."
                className="bg-background border-border font-mono text-sm"
              />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>
          <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            연결 추가
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
