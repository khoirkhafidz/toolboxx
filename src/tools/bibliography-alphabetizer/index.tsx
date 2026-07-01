import { useState } from "react";
import { GraduationCap } from "lucide-react";

export default function BibliographyAlphabetizer() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [ignoreNumbering, setIgnoreNumbering] = useState(true);
  const [ascending, setAscending] = useState(true);
  const [copied, setCopied] = useState(false);
function handleSort() {
  const sorted = input
    .split("\n")
    .map((line) =>
      ignoreNumbering
        ? line.replace(/^\[?\d+[\]\.)]?\s*/, "").trim()
        : line.trim()
    )
    .filter(Boolean)
    .sort((a, b) =>
      a.localeCompare(b, undefined, {
        sensitivity: "base",
      })
    );

  if (!ascending) {
    sorted.reverse();
  }

  setOutput(sorted.join("\n"));
}
  async function handleCopy() {
  if (!output) return;

  await navigator.clipboard.writeText(output);
  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
}
    function handleClear() {
  setInput("");
  setOutput("");
  setCopied(false);
}
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="json-input" className="text-sm font-medium">
            Paste Bibliography
          </label>
          <textarea
             id="json-input"
             value={input}
             onChange={(e) => setInput(e.target.value)}
             placeholder="Paste your bibliography here..."
            className="min-h-[300px] w-full rounded-lg border border-input bg-transparent px-4 py-3 font-mono text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="json-output" className="text-sm font-medium">
            Sorted Bibliography
          </label>
          <textarea
            id="json-output"
            value={output}
            readOnly
            placeholder="Sorted bibliography will appear here..."
            className="min-h-[300px] w-full rounded-lg border border-input bg-muted/50 px-4 py-3 font-mono text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

    <div className="flex flex-wrap items-center gap-4">

  <div className="flex items-center gap-2">
    <input
      type="checkbox"
      checked={ignoreNumbering}
      onChange={(e) =>
        setIgnoreNumbering(e.target.checked)
      }
    />

    <label className="text-sm">
      Ignore numbering
    </label>
  </div>

  <button
    onClick={() => setAscending(!ascending)}
    className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent"
  >
    {ascending ? "A → Z" : "Z → A"}
  </button>

</div>

      <div className="flex gap-3">
        <button onClick={handleSort} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Sort
        </button>
       <button
  onClick={handleCopy}
  disabled={!output}
  className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
>
  {copied ? "Copied ✓" : "Copy"}
</button>
        <button onClick={handleClear} className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
          Clear
        </button>
      </div>
    </div>
  );
}

BibliographyAlphabetizer.icon = GraduationCap;
