import { useState } from 'react';
import { QrCode } from "lucide-react";
import QRCode from "qrcode";

export default function QrCodeGenerator() {
const [text, setText] = useState("");
const [size, setSize] = useState(256);
const [qrImage, setQrImage] = useState("");
const [format, setFormat] =
  useState("png");
const [isGenerating, setIsGenerating] =
  useState(false);
async function handleGenerate() {
  if (!text) return;

  setIsGenerating(true);

  try {
    if (format === "png") {

  const url =
    await QRCode.toDataURL(text, {
      width: size,
      margin: 2,
    });

  setQrImage(url);

} else {

  const svg =
  await QRCode.toString(text, {
    type: "svg",
    width: size,
    margin: 2,
  });

setQrImage(svg);

}

  } finally {
    setIsGenerating(false);
  }
}
function handleDownload() {
  if (!qrImage) return;

  const a = document.createElement("a");

  if (format === "png") {

    a.href = qrImage;

    a.download = "qr-code.png";

  } else {

    const blob = new Blob(
      [qrImage],
      {
        type: "image/svg+xml",
      }
    );

    a.href =
      URL.createObjectURL(blob);

    a.download = "qr-code.svg";

  }

  a.click();

  if (format === "svg") {
    URL.revokeObjectURL(a.href);
  }
}
function handleClear() {
  setText("");
  setSize(256);
  setQrImage("");
  setIsGenerating(false);
  setFormat("png");
}
  return (
  <div className="space-y-6">

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">

        <div className="space-y-2">
    <div className="space-y-2">
        <label className="text-sm font-medium">
          Text/URL
        </label>

        <textarea
          rows={5}
          value={text}
onChange={(e) => {
  setText(e.target.value);
  setQrImage("");
}}
          placeholder="https://example.com"
          className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
        />

      </div>
  <div className="space-y-2">
        <label className="text-sm font-medium">
                Size
        </label>
            <select
        value={size}
        onChange={(e) => {
  setSize(Number(e.target.value));
  setQrImage("");
}}
            className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
            >
            <option value={128}>
            128 px
            </option>
            <option value={256}>
            256 px
            </option>
            <option value={512}>
                512 px
            </option>
            <option value={1024}>
                1024 px
            </option>
        </select>
    </div>
    <div className="space-y-2">

  <label className="text-sm font-medium">
    Format
  </label>

  <select
    value={format}
    onChange={(e) => {
  setFormat(e.target.value);
  setQrImage("");
}}
    className="w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm"
  >
    <option value="png">PNG</option>
    <option value="svg">SVG</option>
  </select>

</div>
</div>


    <div className="space-y-2">
        
      </div>
      </div>

<div className="space-y-2">

  <label className="text-sm font-medium">
    QR Code Preview
  </label>

  <div className="rounded-lg border bg-muted/50 p-6">

    <div className="flex min-h-[250px] items-center justify-center">

      {qrImage ? (

        format === "png" ? (

          <img
            src={qrImage}
            alt="QR Code"
            className="max-h-64 max-w-full rounded-lg"
          />

        ) : (

          <div
  className="flex items-center justify-center [&_svg]:h-64 [&_svg]:w-64 [&_svg]:max-w-full"
  dangerouslySetInnerHTML={{
    __html: qrImage,
  }}
/>

        )

      ) : (

        <p className="text-sm text-muted-foreground">
          QR code will appear here...
        </p>

      )}

    </div>

    {qrImage && (
      <p className="mt-4 text-center text-xs text-muted-foreground">
        {format.toUpperCase()} • {size}px
      </p>
    )}

  </div>

</div>

    </div>

    <div className="flex flex-wrap gap-3">

      <button
        onClick={handleGenerate}
        disabled={isGenerating || !text}
  className="w-[calc(50%-0.375rem)] sm:w-auto rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
        {isGenerating
? "Generating..."
: "Generate QR"}
      </button>
      <button
onClick={handleDownload}
disabled={!qrImage}
className="w-[calc(50%-0.375rem)] sm:w-auto rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
>
{format === "png"
  ? "Download PNG"
  : "Download SVG"}
</button>


      <button
        onClick={handleClear}
        className="mx-auto w-[calc(50%-0.375rem)] sm:mx-0 sm:w-auto rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      >
        Clear
      </button>
    </div>

  </div>
);
}

QrCodeGenerator.icon = QrCode;