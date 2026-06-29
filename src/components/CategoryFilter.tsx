import { cx } from 'class-variance-authority';
import type { ToolCategory, CategoryInfo } from '@/types';

interface CategoryFilterProps {
  categories: CategoryInfo[];
  selected: ToolCategory | null;
  onSelect: (category: ToolCategory | null) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={cx(
          'rounded-full border px-4 py-1.5 text-sm transition-colors',
          selected === null
            ? 'border-primary bg-primary text-primary-foreground'
            : 'bg-muted hover:bg-muted/80'
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={cx(
            'rounded-full border px-4 py-1.5 text-sm transition-colors',
            selected === category.id
              ? 'border-primary bg-primary text-primary-foreground'
              : 'bg-muted hover:bg-muted/80'
          )}
        >
          {category.label} ({category.count})
        </button>
      ))}
    </div>
  );
}
