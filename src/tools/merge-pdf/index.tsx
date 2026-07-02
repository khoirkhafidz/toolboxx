import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Files, X } from "lucide-react";

export default function MergePdf() {
const [files, setFiles] = useState<File[]>([]);
const [mergedPdf, setMergedPdf] = useState<ArrayBuffer | null>(null);
const [isMerging, setIsMerging] = useState(false);
  function handlePdfSelect(
  e: React.ChangeEvent<HTMLInputElement>
) {
  if (!e.target.files) return;

  setFiles((prev) => [
  ...prev,
  ...Array.from(e.target.files!),
]);

  setMergedPdf(null);
}
function handleClear() {
  setFiles([]);
  setMergedPdf(null);
  setIsMerging(false);
}
function handleRemove(index: number) {
  setFiles((prev) =>
    prev.filter((_, i) => i !== index)
  );

  setMergedPdf(null);
}
function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}
async function handleMerge() {
  if (files.length === 0) return;

  setIsMerging(true);

  try {
    const merged = await PDFDocument.create();

    for (const file of files) {
      const bytes = await file.arrayBuffer();

      const pdf = await PDFDocument.load(bytes);

      const pages = await merged.copyPages(
        pdf,
        pdf.getPageIndices()
      );

      pages.forEach((page) =>
        merged.addPage(page)
      );
    }

   const mergedBytes = await merged.save();

setMergedPdf(mergedBytes.buffer as ArrayBuffer);
  } finally {
    setIsMerging(false);
  }
}
function handleDownload() {
  if (!mergedPdf) return;

const blob = new Blob(
  [mergedPdf],
  {
    type: "application/pdf",
  }
);

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "merged.pdf";

  a.click();

  URL.revokeObjectURL(url);
}
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-12">
        {files.length > 0 ? (
  <>
    <Files className="mb-4 h-16 w-16 text-primary" />

    <p className="mb-1 text-lg font-semibold">
      {files.length} PDF selected
    </p>
    <div className="mt-6 w-full max-w-xl space-y-2">

  {files.map((file, index) => (
    <div
      key={index}
      className="flex items-center justify-between rounded-lg border bg-background p-3"
    >
      <div>

        <p className="font-medium">
          {file.name}
        </p>

        <p className="text-xs text-muted-foreground">
          {formatFileSize(file.size)}
        </p>

      </div>

      <button
        onClick={() => handleRemove(index)}
        className="rounded p-1 hover:bg-accent"
      >
        <X className="h-4 w-4" />
      </button>

    </div>
  ))}

</div>
  </>
) : (
  <>
    <Files className="mb-4 h-12 w-12 text-muted-foreground" />

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
          multiple
          accept=".pdf"
          onChange={handlePdfSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="mt-6 cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {files.length > 0
  ? "Add More PDF"
  : "Select PDF Files"}
        </label>
        <button
              onClick={handleMerge}
              disabled={!files.length || isMerging}
              className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
              {isMerging ? "Merging..." : "Merge PDF"}
        </button>
        </div>
      

<div className="rounded-lg border bg-muted/50 p-6">

  {mergedPdf ? (
    <div className="space-y-4">

      <p className="text-center font-medium">
        {files.length} PDF files merged successfully.
      </p>

    </div>
  ) : (
    <p className="text-center text-sm text-muted-foreground">
      Merged PDF will appear here...
    </p>
  )}
</div>
<div className="flex flex-wrap justify-center gap-3">

  <button
    onClick={handleDownload}
    disabled={!mergedPdf}
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

MergePdf.icon = Files;
