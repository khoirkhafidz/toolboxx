import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { ToolConfig } from '@/types';

interface ToolLayoutProps {
  tool: ToolConfig;
  children: React.ReactNode;
}

export function ToolLayout({ tool, children }: ToolLayoutProps) {
  const Icon = tool.icon;

  return (
    <div className="container py-8">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to tools
      </Link>

      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{tool.title}</h1>
            <p className="text-muted-foreground">{tool.description}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6">{children}</div>
    </div>
  );
}
