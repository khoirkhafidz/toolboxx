import { useState } from 'react';
import { Braces } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  function handleFormat() {
   if (!input.trim()) {
    setOutput('');
    setError('');
    return;
  }
  try {
    const parsed = JSON.parse(input);
    setOutput(JSON.stringify(parsed, null, 2));
    setError('');
  } catch (err) {
    setOutput('');
    setError(err instanceof Error ? err.message : 'Invalid JSON');
  }
}
  function handleMinify() {
  try {
    const parsed = JSON.parse(input);
    setOutput(JSON.stringify(parsed));
    setError('');
  } catch (err) {
    setOutput('');
    setError(err instanceof Error ? err.message : 'Invalid JSON');
  }
}
  async function handleCopy() {
  if (!output) return;

  await navigator.clipboard.writeText(output);
}
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="json-input" className="text-sm font-medium">
            Input JSON
          </label>
          <textarea
             id="json-input"
             value={input}
             onChange={(e) => setInput(e.target.value)}
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
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
            className="min-h-[300px] w-full rounded-lg border border-input bg-muted/50 px-4 py-3 font-mono text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleFormat} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Format
        </button>
        <button onClick={handleMinify} className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
          Minify
        </button>
        <button onClick={handleCopy} className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
          Copy
        </button>
        {error && (
        <p className="text-sm text-destructive">
        {error}
        </p>
        )}
      </div>
    </div>
  );
}

JsonFormatter.icon = Braces;
