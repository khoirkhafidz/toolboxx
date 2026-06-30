import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { FileImage, X } from 'lucide-react';


export default function ImageToPdf() {
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const [isConverting, setIsConverting] = useState(false);
    function handleImageSelect(
  e: React.ChangeEvent<HTMLInputElement>
) {
  if (!e.target.files) return;

  const files = Array.from(e.target.files);

  setImages((prev) => [
  ...prev,
  ...files,
]);

  setPreviewUrls((prev) => [
  ...prev,
  ...files.map((file) =>
    URL.createObjectURL(file)
  ),
]);
  setPdfBlob(null);
}
    function removeImage(index: number) {
  setImages((prev) =>
    prev.filter((_, i) => i !== index)
  );

  setPreviewUrls((prev) => {
    URL.revokeObjectURL(prev[index]);

    return prev.filter((_, i) => i !== index);
  });

  setPdfBlob(null);
}
    async function handleConvert() {
  if (images.length === 0) return;

  setIsConverting(true);

  try {
    const pdf = new jsPDF();

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      const imageUrl = URL.createObjectURL(image);

      const img = new Image();

      await new Promise<void>((resolve) => {
        img.onload = () => resolve();

        img.src = imageUrl;
      });

      if (i > 0) {
        pdf.addPage();
      }

      const pageWidth = pdf.internal.pageSize.getWidth();
const pageHeight = pdf.internal.pageSize.getHeight();

const imgWidth = img.width;
const imgHeight = img.height;

// Hitung rasio agar gambar tidak gepeng
const ratio = Math.min(
  pageWidth / imgWidth,
  pageHeight / imgHeight
);

const width = imgWidth * ratio;
const height = imgHeight * ratio;

// Posisi di tengah halaman
const x = (pageWidth - width) / 2;
const y = (pageHeight - height) / 2;

pdf.addImage(
  img,
  image.type === "image/png" ? "PNG" : "JPEG",
  x,
  y,
  width,
  height
);

      URL.revokeObjectURL(imageUrl);
    }

    setPdfBlob(pdf.output("blob"));
  } finally {
    setIsConverting(false);
  }
}
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-12">
        {images.length > 0 ? (
<>
  <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3">
    {previewUrls.map((url, index) => (
      <div
        key={index}
        className="relative rounded-lg border bg-background p-2"
      >
        <button
          onClick={() => removeImage(index)}
          className="absolute right-2 top-2 rounded-full bg-background p-1 shadow hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <img
          src={url}
          alt={images[index].name}
          className="h-32 w-full rounded object-cover"
        />

        <p className="mt-2 truncate text-sm font-medium">
          {images[index].name}
        </p>
      </div>
    ))}
  </div>
</>
) : (
  <>
    <FileImage className="mb-4 h-12 w-12 text-muted-foreground" />

    <p className="mb-2 text-sm font-medium">
      Drop your images here
    </p>

    <p className="mb-4 text-xs text-muted-foreground">
      PNG, JPG, WEBP supported
    </p>
  </>
)}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="mt-6 cursor-pointer rounded-md bg-primary px-4 py-2 text-center font-medium text-primary-foreground hover:bg-primary/90"
        >
          {images.length > 0
         ? "Add More Images"
         : "Select Images"}
        </label>
        <button
            onClick={handleConvert}
            disabled={images.length === 0 || isConverting}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
            {isConverting
            ? "Converting..."
            : "Convert to PDF"}
        </button>
      </div>

     <div className="rounded-lg border bg-muted/50 p-6 text-center">
  {pdfBlob ? (
    <>
      <p className="mb-4 text-center text-sm text-green-600">
        ✓ PDF generated successfully
      </p>

      <button
        onClick={() => {
          const url = URL.createObjectURL(pdfBlob);

          const a = document.createElement("a");

          a.href = url;
          a.download = "converted.pdf";

          a.click();

          URL.revokeObjectURL(url);
        }}
        className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Download PDF
      </button>
    </>
  ) : (
    <p className="text-sm text-muted-foreground">
      Generated PDF will appear here
    </p>
  )}
</div>
    </div>
  );
}

ImageToPdf.icon = FileImage;
