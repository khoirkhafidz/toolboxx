import { useState } from "react";
import { ImageUp, X } from "lucide-react";

export default function ImageUpscaler() {
const [image, setImage] = useState<File | null>(null);

const [upscaledImage, setUpscaledImage] =
  useState<Blob | null>(null);

const [isUpscaling, setIsUpscaling] =
  useState(false);

const [scale, setScale] =
  useState<2 | 4>(4);
const [previewUrl, setPreviewUrl] = useState("");
const [resultUrl, setResultUrl] = useState("");
const [originalSize, setOriginalSize] = useState<{
  width: number;
  height: number;
} | null>(null);

const [resultSize, setResultSize] = useState<{
  width: number;
  height: number;
} | null>(null);


function handleImageSelect(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];

  if (!file) return;

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  if (resultUrl) {
    URL.revokeObjectURL(resultUrl);
  }

  setImage(file);

  setPreviewUrl(URL.createObjectURL(file));

  setUpscaledImage(null);

  setResultUrl("");

  setOriginalSize(null);

  setResultSize(null);
}
function handleClear() {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  if (resultUrl) {
    URL.revokeObjectURL(resultUrl);
  }

  setImage(null);

  setUpscaledImage(null);

  setIsUpscaling(false);

  setPreviewUrl("");

  setResultUrl("");

  setOriginalSize(null);

  setResultSize(null);
}
function handleRemove() {
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  if (resultUrl) {
    URL.revokeObjectURL(resultUrl);
  }

  setImage(null);

  setUpscaledImage(null);

  setPreviewUrl("");

  setResultUrl("");

  setOriginalSize(null);

  setResultSize(null);
}
function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / 1024 / 1024).toFixed(2)} MB`;
}
async function handleUpscale() {
  if (!image) return;

  setIsUpscaling(true);

  try {
    const img = new Image();

    img.src = URL.createObjectURL(image);

    await img.decode();

    setOriginalSize({
      width: img.width,
      height: img.height,
    });

    const canvas =
      document.createElement("canvas");

    canvas.width = img.width * scale;

    canvas.height = img.height * scale;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;

    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      img,
      0,
      0,
      canvas.width,
      canvas.height
    );

    setResultSize({
      width: canvas.width,
      height: canvas.height,
    });

    const blob =
      await new Promise<Blob | null>(
        (resolve) =>
          canvas.toBlob(
            resolve,
            image.type || "image/png",
            1
          )
      );

    if (!blob) return;

    setUpscaledImage(blob);

    if (resultUrl) {
  URL.revokeObjectURL(resultUrl);
}

setResultUrl(URL.createObjectURL(blob));

    URL.revokeObjectURL(img.src);

  } finally {
    setIsUpscaling(false);
  }
}
function handleDownload() {
  if (!upscaledImage) return;

const blob = new Blob(
  [upscaledImage],
  {
    type: "image/png",
  }
);

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  const extension =
image?.type.includes("jpeg")
? "jpg"
: image?.type.includes("webp")
? "webp"
: "png";

a.download =
`upscaled-image-${scale}x.${extension}`;

  a.click();

  URL.revokeObjectURL(url);
}
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-12">
        {image ? (
  <>
    <ImageUp className="mb-4 h-16 w-16 text-primary" />

    <p className="mb-1 text-lg font-semibold">
      {image.name} Image selected
    </p>
    <div className="mt-6 w-full max-w-xl">

  <div className="flex items-center justify-between rounded-lg border bg-background p-3">

    <div>

      <p className="font-medium">
        {image.name}
      </p>

      <p className="text-xs text-muted-foreground">
        {formatFileSize(image.size)}
      </p>

    </div>

    <button
      onClick={handleRemove}
      className="rounded p-1 hover:bg-accent"
    >
      <X className="h-4 w-4" />
    </button>

  </div>
 {previewUrl && (
    <img
      src={previewUrl}
      alt="Preview"
      className="
mt-4
max-h-72
w-full
rounded-lg
border
bg-background
object-contain"
    />
  )}

</div>
  </>
) : (
  <>
    <ImageUp className="mb-4 h-12 w-12 text-muted-foreground" />

    <p className="mb-2 text-sm font-medium">
      Drop your image here
    </p>

    <p className="mb-4 text-xs text-muted-foreground">
      or click to browse
    </p>
  </>
)}

        <input
  id="file-upload"
  type="file"
  accept="image/*"
  onChange={handleImageSelect}
  className="hidden"
/>
        <label
          htmlFor="file-upload"
          className="mt-6 cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {image
  ? "Change Image"
  : "Select Image"}
        </label>
        <div className="mt-6 space-y-2">

  <p className="text-sm font-medium">
    Upscale Factor
  </p>

  <div className="flex gap-2">

    <button
      onClick={() => setScale(2)}
  className={`rounded-md border px-4 py-2 text-sm transition-all duration-150 ease-out ${
    scale === 2
      ? "bg-primary text-primary-foreground"
      : "bg-background hover:bg-accent hover:border-primary/40"
  }`}
    >
      2×
    </button>

    <button
      onClick={() => setScale(4)}
  className={`rounded-md border px-4 py-2 text-sm transition-all duration-150 ease-out ${
    scale === 4
      ? "bg-primary text-primary-foreground"
      : "bg-background hover:bg-accent hover:border-primary/40"
  }`}
    >
      4×
    </button>

  </div>

</div>
        <button
              onClick={handleUpscale}
              disabled={!image || isUpscaling}
              className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
              {isUpscaling
  ? "Upscaling..."
  : "Upscale Image"}
        </button>
        </div>
      

<div className="rounded-lg border bg-muted/50 p-6">

  {upscaledImage ? (
  <div className="space-y-4">

    <img
      src={resultUrl}
      alt="Upscaled"
      className="mx-auto max-h-80 rounded-lg border object-contain"
    />

    <p className="text-center font-medium">
      Image upscaled successfully.
    </p>
    {originalSize && resultSize && (
  <div className="space-y-1 text-center text-sm text-muted-foreground">

    <p>
      Original:
      {" "}
      {originalSize.width}
      ×
      {originalSize.height}
    </p>

    <p>
      Upscaled:
      {" "}
      {resultSize.width}
      ×
      {resultSize.height}
    </p>

  </div>
)}

  </div>
) : (
  <p className="text-center text-sm text-muted-foreground">
    Upscaled image will appear here...
  </p>
)}
</div>
<div className="flex flex-wrap justify-center gap-3">

  <button
    onClick={handleDownload}
    disabled={!upscaledImage}
    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
  >
    Download Image
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

ImageUpscaler.icon = ImageUp;
