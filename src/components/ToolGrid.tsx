import type { ToolConfig } from '@/types';
import { ToolCard } from './ToolCard';

interface ToolGridProps {
  tools: ToolConfig[];
}

export function ToolGrid({ tools }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="rounded-xl border bg-muted/50 p-12 text-center">
        <p className="text-muted-foreground">No tools found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
