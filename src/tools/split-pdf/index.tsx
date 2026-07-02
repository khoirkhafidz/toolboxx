import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Scissors, FileText } from "lucide-react";

export default function SplitPdf() {
const [pdfFile, setPdfFile] =
  useState<File | null>(null);

const [pageRange, setPageRange] =
  useState("");

const [splitPdf, setSplitPdf] =
  useState<ArrayBuffer | null>(null);

const [isSplitting, setIsSplitting] =
  useState(false);
const [pageCount, setPageCount] =
  useState(0);

const [error, setError] =
  useState("");
  async function handlePdfSelect(
  e: React.ChangeEvent<HTMLInputElement>
) {
  if (!e.target.files) return;

  const file = e.target.files[0];

  setPdfFile(file);
  setSplitPdf(null);
  setError("");

  const bytes = await file.arrayBuffer();

  const pdf = await PDFDocument.load(bytes);

  setPageCount(pdf.getPageCount());
}
function handleClear() {
  setPdfFile(null);
  setSplitPdf(null);
  setPageRange("");
  setPageCount(0);
  setError("");
  setIsSplitting(false);
}
async function handleSplit() {
  if (!pdfFile || !pageRange) return;

  setIsSplitting(true);

  try {
    setError("");

    const bytes = await pdfFile.arrayBuffer();

    const pdf = await PDFDocument.load(bytes);

    const pageIndexes: number[] = [];

const ranges = pageRange
  .split(",")
  .map((r) => r.trim());

for (const range of ranges) {

  if (range.includes("-")) {

    const [start, end] = range
      .split("-")
      .map((n) => Number(n.trim()));

    if (
      !start ||
      !end ||
      start < 1 ||
      end > pdf.getPageCount() ||
      start > end
    ) {
      setError("Invalid page range.");
      return;
    }

    for (let i = start; i <= end; i++) {
      pageIndexes.push(i - 1);
    }

  } else {

    const page = Number(range);

    if (
      !page ||
      page < 1 ||
      page > pdf.getPageCount()
    ) {
      setError("Invalid page.");
      return;
    }

    pageIndexes.push(page - 1);

  }

}
const output = await PDFDocument.create();

const pages = await output.copyPages(
  pdf,
  pageIndexes
);

pages.forEach((page) =>
  output.addPage(page)
);

    const result = await output.save();

    setSplitPdf(result.buffer as ArrayBuffer);

  } finally {
    setIsSplitting(false);
  }
}
function handleDownload() {
  if (!splitPdf) return;

const blob = new Blob(
  [splitPdf],
  {
    type: "application/pdf",
  }
);

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download =
  pdfFile?.name.replace(
    ".pdf",
    "-split.pdf"
  ) ?? "split.pdf";

  a.click();

  URL.revokeObjectURL(url);
}
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-12">
        {pdfFile ? (
  <>
    <FileText className="mb-4 h-16 w-16 text-primary" />

    <p className="mb-1 text-lg font-semibold">
      {pdfFile?.name}
    </p>
    <div className="mt-6 w-full max-w-xl space-y-2">
       <div className="mt-2 flex flex-col items-center text-sm text-muted-foreground">

  <p>
    {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
  </p>

  <p>
    {pageCount} page{pageCount !== 1 ? "s" : ""}
  </p>

</div>
    
</div>
  </>
) : (
  <>
    <FileText className="mb-4 h-12 w-12 text-muted-foreground" />

    <p className="mb-2 text-sm font-medium">
      Drop your PDF here
    </p>

    <p className="mb-4 text-xs text-muted-foreground">
      or click to browse
    </p>
  </>
)}
        <input
          type="file"
          accept=".pdf"
          onChange={handlePdfSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="mt-6 cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {pdfFile
  ? "Choose Another PDF"
  : "Select PDF Files"}
        </label>
        <div className="mt-6 flex w-full max-w-xs flex-col items-center gap-2">

  <label className="text-sm font-medium">
  Page Range
</label>

<p className="text-xs text-muted-foreground">
  Supports: 1-3,5,8-10
</p>

  <input
    value={pageRange}
    disabled={!pdfFile}
    onChange={(e) => setPageRange(e.target.value)}
    placeholder="e.g. 1-3,5,8-10"
    className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-center text-sm"
  />
  {error && (
  <p className="text-sm text-destructive">
    {error}
  </p>
)}

</div>
        <button
              onClick={handleSplit}
              disabled={
  !pdfFile ||
  !pageRange ||
  isSplitting
}
              className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
              {isSplitting ? "Splitting..." : "Split PDF"}
        </button>
        </div>

<div className="rounded-lg border bg-muted/50 p-6">

  {splitPdf? (
    <div className="space-y-4">

      <p className="text-center font-medium">
        PDF split successfully.
      </p>

    </div>
  ) : (
    <p className="text-center text-sm text-muted-foreground">
      Split PDF will appear here...
    </p>
  )}
</div>
<div className="flex flex-wrap justify-center gap-3">

  <button
    onClick={handleDownload}
    disabled={!splitPdf}
    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
  >
    Download PDF
  </button>

  <button
    onClick={handleClear}
    className="rounded-md border border-input bg-background px-4 py-2 text-sm hover:bg-accent"
  >
    Clear
  </button>

</div>
    </div>
  );
}

SplitPdf.icon = Scissors;
