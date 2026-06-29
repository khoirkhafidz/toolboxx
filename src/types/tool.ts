import type { LucideIcon } from 'lucide-react';

export type ToolCategory =
  | 'pdf'
  | 'image'
  | 'text'
  | 'developer'
  | 'ai'
  | 'utilities'
  | 'design';

export interface ToolConfig {
  id: string;
  title: string;
  description: string;
  category: ToolCategory;
  tags: string[];
  icon: LucideIcon;
  route: string;
  componentLoader: () => Promise<{ default: React.ComponentType }>;
  popular?: boolean;
}

export interface CategoryInfo {
  id: ToolCategory;
  label: string;
  count: number;
}
