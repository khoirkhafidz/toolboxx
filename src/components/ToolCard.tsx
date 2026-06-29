import { Link } from 'react-router-dom';
import type { ToolConfig } from '@/types';

interface ToolCardProps {
  tool: ToolConfig;
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <Link
      to={tool.route}
      className="group flex flex-col gap-3 rounded-xl border bg-card p-5 transition-colors hover:border-primary/50 hover:bg-muted/50"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-medium">{tool.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}
