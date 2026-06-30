import { useState } from "react";
import { FileImage } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc =
  new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();

export default function PdfToImage() {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [images, setImages] = useState<
  {
    page: number;
    url: string;
  }[]
>([]);
  const [isConverting, setIsConverting] = useState(false);
  function handlePdfSelect(
  e: React.ChangeEvent<HTMLInputElement>
) {
  if (!e.target.files) return;

  setPdfFile(e.target.files[0]);
}
  async function handleConvert() {
  if (!pdfFile) return;

  setIsConverting(true);

  try {
    const arrayBuffer = await pdfFile.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

   const output: {
  page: number;
  url: string;
}[] = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);

      const viewport = page.getViewport({
        scale: 2,
      });

      const canvas = document.createElement("canvas");

      const context = canvas.getContext("2d");

      if (!context) continue;

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvas,
        canvasContext: context,
        viewport,
      }).promise;

      output.push({
  page: pageNumber,
  url: canvas.toDataURL("image/png"),
});
    }

    setImages(output);
  } finally {
    setIsConverting(false);
  }
}
  async function handleDownloadAll() {
    const confirmed = window.confirm(
      `This PDF contains ${images.length} page${images.length > 1 ? "s" : ""}.\n\nYour browser will download ${images.length} PNG image${images.length > 1 ? "s" : ""}.\n\nContinue?`
    );

  if (!confirmed) return;
  if (!pdfFile || images.length === 0) return;

  for (const image of images) {
    const a = document.createElement("a");

    a.href = image.url;

    a.download = `${pdfFile.name.replace(
      /\.pdf$/i,
      ""
    )}-page-${image.page}.png`;

    a.click();

    await new Promise((resolve) => setTimeout(resolve, 150));
  }
}
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-12">
        {pdfFile ? (
  <>
    <FileImage className="mb-4 h-16 w-16 text-primary" />

    <p className="mb-1 text-lg font-semibold">
      {pdfFile.name}
    </p>

    <p className="mb-4 text-sm text-muted-foreground">
      {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
    </p>
  </>
) : (
  <>
    <FileImage className="mb-4 h-12 w-12 text-muted-foreground" />

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
          className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {pdfFile ? "Choose Another PDF" : "Select PDF"}
        </label>
        <button
              onClick={handleConvert}
              disabled={!pdfFile || isConverting}
              className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
              {isConverting ? "Converting..." : "Convert to Images"}
        </button>
      </div>

      <div className="rounded-lg border bg-muted/50 p-6">
  {images.length === 0 ? (
    <p className="text-center text-sm text-muted-foreground">
      Output images will appear here
    </p>
  ) : (
    <>
    <div className="mb-6 flex justify-center">
      <button
        onClick={handleDownloadAll}
        className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Download All
      </button>
    </div>    
    <div className="grid gap-6 md:grid-cols-2">
      {images.map((image) => (
        <div
          key={image.page}
          className="space-y-4 rounded-lg border bg-background p-4"
        >
          <img
            src={image.url}
            alt={`Page ${image.page}`}
            className="w-full rounded-lg border"
          />

          <p className="text-center font-semibold">
            Page {image.page}
          </p>

          <button
            onClick={() => {
              const a = document.createElement("a");

              a.href = image.url;

              a.download = `${pdfFile?.name.replace(".pdf", "")}-page-${image.page}.png`;

              a.click();
            }}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Download
          </button>
        </div>
      ))}
    </div>
    </>
  )}
</div>
    </div>
  );
}

PdfToImage.icon = FileImage;
