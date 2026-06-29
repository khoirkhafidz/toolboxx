import { Braces } from 'lucide-react';

export default function JsonFormatter() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="json-input" className="text-sm font-medium">
            Input JSON
          </label>
          <textarea
            id="json-input"
            placeholder='{"paste": "your json here"}'
            className="min-h-[300px] w-full rounded-lg border border-input bg-transparent px-4 py-3 font-mono text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="json-output" className="text-sm font-medium">
            Formatted Output
          </label>
          <textarea
            id="json-output"
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="min-h-[300px] w-full rounded-lg border border-input bg-muted/50 px-4 py-3 font-mono text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Format
        </button>
        <button className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
          Minify
        </button>
        <button className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
          Copy
        </button>
      </div>
    </div>
  );
}

JsonFormatter.icon = Braces;
