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
const [style, setStyle] = useState("apa");
const [copied, setCopied] = useState(false);
const [sourceType, setSourceType] = useState("website");
const [publisher, setPublisher] = useState("");
const [journal, setJournal] = useState("");
const [volume, setVolume] = useState("");
const [issue, setIssue] = useState("");
const [pages, setPages] = useState("");
const [doi, setDoi] = useState("");
function formatInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => `${part.charAt(0).toUpperCase()}.`)
    .join(" ");
}

function handleGenerate() {

if (
  !title ||
  !givenName ||
  !surname ||
  !year
) {
  setCitation("");
  return;
}

if (sourceType === "website" && (!website || !url)) {
  setCitation("");
  return;
}

if (sourceType === "book" && !publisher) {
  setCitation("");
  return;
}
if (
  sourceType === "journal" &&
  (!journal || !volume || !issue || !pages)
) {
  setCitation("");
  return;
}
  const initials = formatInitials(givenName);

  switch (style) {
    case "apa":
  if (sourceType === "website") {
    setCitation(
      `${surname}, ${initials} (${year}). ${title}. ${website}. ${url}`
    );
  }

  if (sourceType === "book") {
    setCitation(
      `${surname}, ${initials} (${year}). ${title}. ${publisher}.`
    );
  }
  if (sourceType === "journal") {
  setCitation(
    `${surname}, ${initials} (${year}). ${title}. ${journal}, ${volume}(${issue}), ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`
  );
}

  break;

    case "mla":
  if (sourceType === "website") {
    setCitation(
      `${surname}, ${givenName}. "${title}." ${website}, ${year}, ${url}.`
    );
  }

  if (sourceType === "book") {
    setCitation(
      `${surname}, ${givenName}. ${title}. ${publisher}, ${year}.`
    );
  }
  if (sourceType === "journal") {
  setCitation(
    `${surname}, ${givenName}. "${title}." ${journal}, vol. ${volume}, no. ${issue}, ${year}, pp. ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`
  );
}
  break;

    case "ieee":
  if (sourceType === "website") {
    setCitation(
      `[1] ${initials} ${surname}, "${title}," ${website}, ${year}. Available: ${url}`
    );
  }

  if (sourceType === "book") {
    setCitation(
      `[1] ${initials} ${surname}, ${title}. ${publisher}, ${year}.`
    );
  }
  if (sourceType === "journal") {
  setCitation(
    `[1] ${initials} ${surname}, "${title}," ${journal}, vol. ${volume}, no. ${issue}, pp. ${pages}, ${year}.${doi ? ` doi: ${doi}` : ""}`
  );
}

  break;

 case "harvard":
  if (sourceType === "website") {
    setCitation(
      `${surname}, ${initials} ${year}. ${title}. ${website}. Available at: ${url}`
    );
  }

  if (sourceType === "book") {
    setCitation(
      `${surname}, ${initials} ${year}. ${title}. ${publisher}.`
    );
  }
  if (sourceType === "journal") {
  setCitation(
    `${surname}, ${initials} ${year}. ${title}. ${journal}, ${volume}(${issue}), pp.${pages}.${doi ? ` Available at: https://doi.org/${doi}` : ""}`
  );
}
  break;

    case "chicago":
  if (sourceType === "website") {
    setCitation(
      `${surname}, ${givenName}. ${year}. "${title}." ${website}. ${url}.`
    );
  }

  if (sourceType === "book") {
    setCitation(
      `${surname}, ${givenName}. ${year}. ${title}. ${publisher}.`
    );
  }
  if (sourceType === "journal") {
  setCitation(
    `${surname}, ${givenName}. ${year}. "${title}." ${journal} ${volume}, no. ${issue}: ${pages}.${doi ? ` https://doi.org/${doi}` : ""}`
  );
}

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
  setTitle("");
  setGivenName("");
  setSurname("");
  setWebsite("");
  setUrl("");
  setYear("");
  setPublisher("");
  setCitation("");
  setStyle("apa");
  setCopied(false);setJournal("");
  setVolume(""); 
  setIssue("");
  setPages("");
  setDoi("");
  setSourceType("website");
}
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
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
    Source Type
  </label>

  <select
    value={sourceType}
    onChange={(e) => setSourceType(e.target.value)}
    className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
  >
    <option value="website">Website</option>
    <option value="book">Book</option>
    <option value="journal">Journal</option>
  </select>
</div>

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

 {sourceType === "website" && (
  <>
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
  </>
)}
    {sourceType === "book" && (
  <div className="space-y-2">
    <label className="text-sm font-medium">
      Publisher
    </label>

    <input
      value={publisher}
      onChange={(e) => setPublisher(e.target.value)}
      placeholder="MIT Press"
      className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
    />
  </div>
)}
    {sourceType === "journal" && (
  <>
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Journal Name
      </label>

      <input
        value={journal}
        onChange={(e) => setJournal(e.target.value)}
        placeholder="Nature"
        className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Volume
        </label>

        <input
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          placeholder="25"
          className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          Issue
        </label>

        <input
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
          placeholder="3"
          className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
        />
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">
        Pages
      </label>

      <input
        value={pages}
        onChange={(e) => setPages(e.target.value)}
        placeholder="120-132"
        className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
      />
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">
        DOI (Optional)
      </label>

      <input
        value={doi}
        onChange={(e) => setDoi(e.target.value)}
        placeholder="10.1038/xxxxx"
        className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
      />
    </div>
  </>
)}

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
    disabled={!citation}
    className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
  >
     {copied ? "Copied ✓" : "Copy"}
  </button>
  <button
    onClick={handleClear}
    className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
    >
        Clear
    </button>
</div>
      </div>
  );
}

CitationGenerator.icon = GraduationCap;
