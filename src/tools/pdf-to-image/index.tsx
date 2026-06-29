import { FileImage } from 'lucide-react';

export default function PdfToImage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-12">
        <FileImage className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="mb-2 text-sm font-medium">Drop your PDF here</p>
        <p className="mb-4 text-xs text-muted-foreground">
          or click to browse
        </p>
        <input
          type="file"
          accept=".pdf"
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Select PDF
        </label>
      </div>

      <div className="rounded-lg border bg-muted/50 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Output images will appear here
        </p>
      </div>
    </div>
  );
}

PdfToImage.icon = FileImage;
