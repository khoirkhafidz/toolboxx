import { useState } from 'react';
import { GraduationCap } from 'lucide-react';

export default function CitationGenerator() {
const [title, setTitle] = useState('');
const [givenName, setGivenName] = useState('');
const [surname, setSurname] = useState('');
const [website, setWebsite] = useState('');
const [url, setUrl] = useState('');
const [year, setYear] = useState('');
const [citation, setCitation] = useState('');
function formatInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => `${part.charAt(0).toUpperCase()}.`)
    .join(" ");
}

function handleGenerate() {
  if (!title || !givenName || !surname || !website || !url || !year) {
    setCitation('');
    return;
  }

  const initials = formatInitials(givenName);

  setCitation(
  `${surname}, ${initials} (${year}). ${title}. ${website}. ${url}`
);
}
  async function handleCopy() {
  if (!citation) return;

  await navigator.clipboard.writeText(citation);
}
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">

  <div className="space-y-2">
    <label className="text-sm font-medium">
      Title
    </label>

    <input
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="The Future of Animation"
      className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
    />
  </div>

<div className="space-y-2">
  <label className="text-sm font-medium">
    Given Name(s)
  </label>

  <input
    value={givenName}
    onChange={(e) => setGivenName(e.target.value)}
    placeholder="John Michael"
    className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
  />
</div>
    <div className="space-y-2">
  <label className="text-sm font-medium">
    Surname
  </label>

  <input
    value={surname}
    onChange={(e) => setSurname(e.target.value)}
    placeholder="Sebastian"
    className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
  />
</div>

  <div className="space-y-2">
    <label className="text-sm font-medium">
      Website
    </label>

    <input
      value={website}
      onChange={(e) => setWebsite(e.target.value)}
      placeholder="Shueisha"
      className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
    />
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium">
      URL
    </label>

    <input
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="https://example.com"
      className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
    />
  </div>

  <div className="space-y-2">
    <label className="text-sm font-medium">
      Publication Year
    </label>

    <input
      value={year}
      onChange={(e) => setYear(e.target.value)}
      placeholder="2026"
      className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
    />
  </div>

</div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Generated Citation
          </label>
          <textarea
            id="json-output"
            value={citation}
            readOnly
            placeholder="Your citation will appear here..."
            className="min-h-[300px] w-full rounded-lg border border-input bg-muted/50 px-4 py-3 font-mono text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

<div className="flex gap-3">
  <button
    onClick={handleGenerate}
    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
  >
    Generate Citation
  </button>

  <button
    onClick={handleCopy}
    className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
  >
    Copy
  </button>
</div>
      </div>
  );
}

CitationGenerator.icon = GraduationCap;
