import { useState } from 'react';
import { GraduationCap } from 'lucide-react';

export default function DoiToCitation() {
const [doi, setDoi] = useState("");
const [metadata, setMetadata] = useState<any>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [copied, setCopied] = useState(false);
const [style, setStyle] = useState("apa");
const [citation, setCitation] = useState("");
const [showMetadata, setShowMetadata] = useState(false);

  async function handleFetch() {
  if (!doi) return;

  setLoading(true);
  setCitation("");
  setError("");

  try {
    const response = await fetch(
      `https://api.crossref.org/works/${doi}`
    );

    if (!response.ok) {
      throw new Error("DOI not found");
    }

    const data = await response.json();

    setMetadata(data.message);
    setShowMetadata(true);
  } catch {
    setMetadata(null);
    setError("DOI not found or unavailable.");
  } finally {
    setLoading(false);
  }
}
    function formatAuthors() {
  if (!metadata?.author) return "";

  return metadata.author
    .map((author: any) => {
      const initials = author.given
        ?.split(" ")
        .map((n: string) => `${n[0]}.`)
        .join(" ");

      return `${author.family}, ${initials}`;
    })
    .join(", ");
}
    function handleGenerate() {
  if (!metadata) return;

const authors = formatAuthors();

const title = metadata.title?.[0] ?? "";
const journal = metadata["container-title"]?.[0] ?? "";
const year =
  metadata.published?.["date-parts"]?.[0]?.[0] ?? "";

const volume = metadata.volume
  ? `vol. ${metadata.volume}`
  : "";

const issue = metadata.issue
  ? `no. ${metadata.issue}`
  : "";

const pages = metadata.page
  ? `pp. ${metadata.page}`
  : "";

const doiUrl = metadata.DOI
  ? `https://doi.org/${metadata.DOI}`
  : "";
  const details = [
  volume,
  issue,
  pages,
]
  .filter(Boolean)
  .join(", ");

const detailsText = details
  ? `${details}.`
  : "";
const detailsWithComma = details
  ? `${details},`
  : "";

switch (style) {
  case "apa":
    setCitation(
      `${authors} (${year}). ${title}. ${journal}. ${detailsText} ${doiUrl}`
    );
    break;

  case "mla":
    setCitation(
      `${authors}. "${title}." ${journal}, ${detailsWithComma} ${year}. ${doiUrl}`
    );
    break;

  case "ieee":
    setCitation(
      `${authors}, "${title}," ${journal}, ${detailsWithComma} ${year}. ${doiUrl}`
    );
    break;

  case "harvard":
    setCitation(
      `${authors} (${year}) '${title}', ${journal}, ${details}. Available at: ${doiUrl}`
    );
    break;

  case "chicago":
    setCitation(
      `${authors}. ${year}. "${title}." ${journal}. ${detailsText} ${doiUrl}`
    );
    break;

  default:
    setCitation("");
}
}

  async function handleCopy() {
  if (!citation) return;

  await navigator.clipboard.writeText(citation);

  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
}
function handleClear() {
  setDoi("");
  setMetadata(null);
  setCitation("");
  setError("");
  setCopied(false);
  setShowMetadata(false);
}
  return (
  <div className="space-y-6">

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">

        <div className="space-y-2">
  <label className="text-sm font-medium">
    Citation Style
  </label>

  <select
    value={style}
    onChange={(e) => setStyle(e.target.value)}
    className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
  >
    <option value="apa">APA 7</option>
    <option value="mla">MLA 9</option>
    <option value="ieee">IEEE</option>
    <option value="harvard">Harvard</option>
    <option value="chicago">Chicago</option>
  </select>
</div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          DOI
        </label>

        <input
          value={doi}
          onChange={(e) => {
  setDoi(e.target.value);
  setMetadata(null);
  setCitation("");
}}
          placeholder="10.1038/s41586-020-2649-2"
          className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
        />

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}
      </div>

<div className="space-y-2">

  <button
    type="button"
    onClick={() => setShowMetadata(!showMetadata)}
    className="flex w-full items-center justify-between rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent"
  >
    <span>Metadata Preview</span>

    <span>
      {showMetadata ? "▲" : "▼"}
    </span>
  </button>

{showMetadata && (
  <div className="rounded-lg border bg-muted/50 p-4 space-y-3">

    <div>
      <p className="text-xs text-muted-foreground">
        Title
      </p>
      <p>{metadata?.title?.[0] || "-"}</p>
    </div>

    <div>
      <p className="text-xs text-muted-foreground">
        Author
      </p>
      <p>
        {metadata?.author
          ?.map((a: any) => `${a.given} ${a.family}`)
          .join(", ") || "-"}
      </p>
    </div>

    <div>
      <p className="text-xs text-muted-foreground">
        Journal
      </p>
      <p>{metadata?.["container-title"]?.[0] || "-"}</p>
    </div>

    <div>
      <p className="text-xs text-muted-foreground">
        Year
      </p>
      <p>
        {metadata?.published?.["date-parts"]?.[0]?.[0] || "-"}
      </p>
    </div>

  </div>
)}
      </div>
      </div>
      <div className="space-y-2">

  <label className="text-sm font-medium">
    Generated Citation
  </label>

  <textarea
    value={citation}
    readOnly
    placeholder="Generated citation will appear here..."
    className="min-h-[300px] w-full rounded-lg border border-input bg-muted/50 px-4 py-3 text-sm placeholder:text-muted-foreground"
  />

</div>

    </div>

    <div className="flex flex-wrap gap-3">

      <button
        onClick={handleFetch}
        disabled={loading || !doi}
  className="w-[calc(50%-0.375rem)] sm:w-auto rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
        {loading
  ? "Fetching..."
  : metadata
  ? "✓ Metadata Fetched"
  : "Fetch Metadata"}
      </button>

      <button
        onClick={handleGenerate}
        disabled={!metadata}
        className="w-[calc(50%-0.375rem)] sm:w-auto rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
        Generate Citation
      </button>

      <button
        onClick={handleCopy}
        disabled={!citation}
        className="w-[calc(50%-0.375rem)] sm:w-auto rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {copied ? "Copied ✓" : "Copy"}
      </button>

      <button
        onClick={handleClear}
        className="w-[calc(50%-0.375rem)] sm:w-auto rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      >
        Clear
      </button>

    </div>

  </div>
);
}

DoiToCitation.icon = GraduationCap;