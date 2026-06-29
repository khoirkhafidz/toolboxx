import { useState, useMemo } from 'react';
import { PageLayout } from '@/layouts';
import { SearchBar, CategoryFilter, ToolGrid } from '@/components';
import { toolConfigs, getCategoryInfo, searchTools, getPopularTools } from '@/config/tools';
import type { ToolCategory } from '@/types';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | null>(null);
  const categories = useMemo(() => getCategoryInfo(), []);
  const popularTools = useMemo(() => getPopularTools(), []);

  const filteredTools = useMemo(() => {
    let tools = searchQuery ? searchTools(searchQuery) : toolConfigs;
    if (selectedCategory) {
      tools = tools.filter((tool) => tool.category === selectedCategory);
    }
    return tools;
  }, [searchQuery, selectedCategory]);

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="mb-12 space-y-4 text-center">
          <h1 className="text-4xl font-bold">Toolbox</h1>
          <p className="text-lg text-muted-foreground">
            Free online tools that work entirely in your browser.
            <br />
            Fast. Private. No uploads.
          </p>
        </div>

        <div className="mx-auto mb-10 max-w-2xl">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {!searchQuery && (
          <section className="mb-10">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Popular Tools
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {popularTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <a
                    key={tool.id}
                    href={tool.route}
                    className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{tool.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {tool.category}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        )}

        <section className="mb-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Categories
          </h2>
          <CategoryFilter
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {searchQuery ? 'Results' : selectedCategory ? 'Tools' : 'All Tools'}
          </h2>
          <ToolGrid tools={filteredTools} />
        </section>
      </div>
    </PageLayout>
  );
}
