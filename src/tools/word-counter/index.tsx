import { FileText } from 'lucide-react';

export default function WordCounter() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="input" className="text-sm font-medium">
          Your text
        </label>
        <textarea
          id="input"
          placeholder="Paste or type your text here..."
          className="min-h-[200px] w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="text-2xl font-semibold">0</div>
          <div className="text-sm text-muted-foreground">Words</div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="text-2xl font-semibold">0</div>
          <div className="text-sm text-muted-foreground">Characters</div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="text-2xl font-semibold">0</div>
          <div className="text-sm text-muted-foreground">Sentences</div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="text-2xl font-semibold">0</div>
          <div className="text-sm text-muted-foreground">Paragraphs</div>
        </div>
      </div>
    </div>
  );
}

WordCounter.icon = FileText;
