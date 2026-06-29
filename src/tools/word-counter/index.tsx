import { useMemo, useState } from 'react';
import { FileText } from 'lucide-react';

export default function WordCounter() {
  const [text, setText] = useState('');
  const stats = useMemo(() => {
  const trimmed = text.trim();

  const words = trimmed ? trimmed.split(/\s+/).length : 0;

  const characters = text.length;

  const sentences = trimmed
    ? trimmed.split(/[.!?]+/).filter(Boolean).length
    : 0;

  const paragraphs = trimmed
    ? trimmed.split(/\n\s*\n/).filter(Boolean).length
    : 0;

  return {
    words,
    characters,
    sentences,
    paragraphs,
  };
}, [text]);
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="input" className="text-sm font-medium">
          Your text
        </label>
        <textarea
          id="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here..."
          className="min-h-[200px] w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="text-2xl font-semibold">{stats.words}</div>
          <div className="text-sm text-muted-foreground">Words</div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="text-2xl font-semibold">{stats.characters}</div>
          <div className="text-sm text-muted-foreground">Characters</div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="text-2xl font-semibold">{stats.sentences}</div>
          <div className="text-sm text-muted-foreground">Sentences</div>
        </div>
        <div className="rounded-lg border bg-muted/50 p-4">
          <div className="text-2xl font-semibold">{stats.paragraphs}</div>
          <div className="text-sm text-muted-foreground">Paragraphs</div>
        </div>
      </div>
    </div>
  );
}

WordCounter.icon = FileText;
