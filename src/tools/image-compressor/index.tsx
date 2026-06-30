import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { ImageDown } from 'lucide-react';

export default function ImageCompressor() {
  const [images, setImages] = useState<File[]>([]);
  const [compressedImages, setCompressedImages] = useState<File[]>([]);
  const [quality, setQuality] = useState(80);
  const [isCompressing, setIsCompressing] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [compressedPreviewUrls, setCompressedPreviewUrls] = useState<string[]>([]);
  function handleImageSelect(
  e: React.ChangeEvent<HTMLInputElement>
  ) {
  if (!e.target.files) return;

  const files = Array.from(e.target.files);

  setImages(files);
  setCompressedImages([]);

  setPreviewUrls(
    files.map((file) => URL.createObjectURL(file))
  );

  setCompressedPreviewUrls([]);
  }
  async function handleCompress() {
  if (images.length === 0) return;

  setIsCompressing(true);

  try {
    const result: File[] = [];

    for (const image of images) {
      const compressed = await imageCompression(image, {
        initialQuality: quality / 100,
        useWebWorker: true,
      });

      result.push(compressed);
    }

    setCompressedImages(result);
    setCompressedPreviewUrls(
      result.map((file) => URL.createObjectURL(file))
    );
  } finally {
    setIsCompressing(false);
  }
}
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-12">

  {previewUrls.length > 0 ? (
    <>
      <img
        src={previewUrls[0]}
        alt="Preview"
        className="mb-4 h-48 max-w-full rounded-lg object-contain"
      />

      <p className="mb-1 font-medium">
        {images[0].name}
      </p>

      <p className="mb-4 text-sm text-muted-foreground">
        {(images[0].size / 1024).toFixed(1)} KB
      </p>
    </>
  ) : (
    <>
      <ImageDown className="mb-4 h-12 w-12 text-muted-foreground" />

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
    onChange={handleImageSelect}
    className="hidden"
    id="image-upload"
  />

  <label
    htmlFor="image-upload"
    className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
  >
    {previewUrls.length > 0 ? "Choose Another Image" : "Select Images"}
  </label>

</div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="quality" className="text-sm font-medium">
            Quality
          </label>
          <span className="text-sm text-muted-foreground">{quality}%</span>
        </div>
        <input
          type="range"
          id="quality"
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          min="10"
          max="100"
          defaultValue="80"
          className="w-full"
        />
      </div>
      <button
    onClick={handleCompress}
    disabled={isCompressing}
    className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
    {isCompressing ? "Compressing..." : "Compress"}
      </button>

     <div className="rounded-lg border bg-muted/50 p-6">
  {compressedImages.length === 0 ? (
    <p className="text-center text-sm text-muted-foreground">
      Compressed images will appear here
    </p>
  ) : (
    compressedImages.map((image, index) => {
      const originalSize = images[index].size;
      const compressedSize = image.size;

      const saved = (
        ((originalSize - compressedSize) / originalSize) *
        100
      ).toFixed(1);

      return (
        <div
          key={image.name}
          className="space-y-4 rounded-lg border bg-background p-5"
        >
          <img
            src={compressedPreviewUrls[index]}
            alt={image.name}
            className="mx-auto h-40 rounded-lg object-contain"
          />

          <p className="text-center font-semibold">
            {image.name}
          </p>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">
                Original
              </p>

              <p className="font-medium">
                {(originalSize / 1024).toFixed(1)} KB
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Compressed
              </p>

              <p className="font-medium">
                {(compressedSize / 1024).toFixed(1)} KB
              </p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                Saved
              </p>

              <p className="font-semibold text-green-600">
                {Number(saved) > 0
                  ? `${saved}%`
                  : "Already optimized"}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const url = URL.createObjectURL(image);

              const a = document.createElement("a");

              a.href = url;
              a.download = image.name;

              a.click();

              URL.revokeObjectURL(url);
            }}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Download
          </button>
        </div>
      );
    })
  )}
</div>

</div>
);
}
ImageCompressor.icon = ImageDown;
