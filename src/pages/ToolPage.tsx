import { useParams, Navigate } from 'react-router-dom';
import { PageLayout, ToolLayout } from '@/layouts';
import { getToolById } from '@/config/tools';
import { Suspense, lazy } from "react";
import type { ComponentType } from "react";

export default function ToolPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const tool = toolId ? getToolById(toolId) : undefined;

  if (!tool) {
    return <Navigate to="/" replace />;
  }

  const ToolComponent = lazy(tool.componentLoader) as ComponentType;

  return (
    <PageLayout>
      <ToolLayout tool={tool}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          }
        >
          <ToolComponent />
        </Suspense>
      </ToolLayout>
    </PageLayout>
  );
}
