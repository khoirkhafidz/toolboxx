import { ImageDown } from 'lucide-react';

export default function ImageCompressor() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-12">
        <ImageDown className="mb-4 h-12 w-12 text-muted-foreground" />
        <p className="mb-2 text-sm font-medium">Drop your images here</p>
        <p className="mb-4 text-xs text-muted-foreground">
          PNG, JPG, WEBP supported
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Select Images
        </label>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="quality" className="text-sm font-medium">
            Quality
          </label>
          <span className="text-sm text-muted-foreground">80%</span>
        </div>
        <input
          type="range"
          id="quality"
          min="10"
          max="100"
          defaultValue="80"
          className="w-full"
        />
      </div>

      <div className="rounded-lg border bg-muted/50 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Compressed images will appear here
        </p>
      </div>
    </div>
  );
}

ImageCompressor.icon = ImageDown;
