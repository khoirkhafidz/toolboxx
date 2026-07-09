import { useState } from "react";
import { GraduationCap } from "lucide-react";

export default function AcademicTextCleaner() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [preserveParagraphs, setPreserveParagraphs] = useState(true);
  const [removeExtraSpaces, setRemoveExtraSpaces] = useState(true);
  const [fixHyphenation, setFixHyphenation] = useState(true);
  const [removeFooters, setRemoveFooters] = useState(true);
  const [copied, setCopied] = useState(false);
function handleClean() {
  let text = input;

  if (!text) {
    setOutput("");
    return;
  }

  // ========================================================
  // 0. REMOVE FOOTERS, HEADERS, & DOI
  // ========================================================
  if (removeFooters) {
    text = text.replace(/https?:\/\/(dx\.)?doi\.org\/[^\s]+/gi, "");
    text = text.replace(/https?:\/\/[^\s]+/gi, ""); 
    text = text.replace(/(©|Copyright|All\s+rights\s+reserved).*?\d{4}/gi, "");
    text = text.replace(/Huawei\s*Technologies\s*Co\.,\s*Ltd\..*?Technology,?/gi, "");
    text = text.replace(/^(Fig\.|Figure|Table)\s+\d+.*$/gim, "");
    text = text.replace(/^\d+\s+\d*\s*A\s+General\s+Introduction.*/gim, "");
    text = text.replace(/^Kata\s*kunci\s*:.*/gim, ""); 
  }

  // 1. FIX HYPHENATION
  if (fixHyphenation) {
    text = text.replace(/(\w)-\s*\n\s*(\w)/g, "$1$2");
  }

  // 2. HAPUS NOMOR HALAMAN TUNGGAL
  text = text.replace(/\n\s*(Page\s+)?\d+\s*\n/gi, "\n");

  // ========================================================
  // 3. PRESERVE PARAGRAPHS (Arsitektur V8 - Anti-Cerai Kalimat)
  // ========================================================
  if (preserveParagraphs) {
    // Langkah A: Amankan double enter asli bawaan teks copas
    text = text.replace(/\n\s*\n/g, "___PARAGRAF_BREAK___");
    
    // Langkah B: Amankan paragraf menjorok (Indentasi spasi)
    text = text.replace(/\n {2,}([A-Za-z])/g, "___PARAGRAF_BREAK___$1");

    // Langkah C: 🔥 TWEAK PROTEKSI HURUF KAPITAL (Lebih Selektif)
    // Hanya pecah jika ada tanda titik/tanya/seru (.?!) di ujung baris, 
    // LALU diikuti enter dan Huruf Kapital yang diikuti oleh huruf kecil (Menandakan kata reguler, bukan singkatan/kode)
    text = text.replace(/([.?!)]+)\s*\n\s*([A-Z][a-z])/g, "$1___PARAGRAF_BREAK___$2");

    // Langkah D: LOCK SUB-BAB GLOBAL (e.g., "1.1", "3. Spatial")
    text = text.replace(/\n\s*(\d+(\.\d+)*\.?\s+[A-Z][^\n]*)/gi, "___PARAGRAF_BREAK___$1___PARAGRAF_BREAK___");
    
    // Langkah E: LOCK LIST HURUF/ANGKA/BULLET (e.g., "(a) ", "• ")
    text = text.replace(/\n\s*(\([a-zA-Z0-9]+\)\s+[A-Za-z0-9][^\n]*)/gi, "___PARAGRAF_BREAK___$1___PARAGRAF_BREAK___");
    text = text.replace(/\n\s*([•▪\-*]\s+[A-Za-z0-9][^\n]*)/gi, "___PARAGRAF_BREAK___$1___PARAGRAF_BREAK___");

    // Langkah F: Sikat semua sisa enter tunggal (\n) sisa patahan PDF menjadi spasi biasa!
    // Di sini kata "masih dihuni" yang patah enter tunggal bakal otomatis gandengan lagi.
    text = text.replace(/\n/g, " ");
    
    // Langkah G: Kembalikan semua tanda penanda menjadi double enter asli (\n\n)
    text = text.replace(/___PARAGRAF_BREAK___/g, "\n\n");
    
    // Langkah H: Bersihkan double enter berlebih di paling awal/akhir teks
    text = text.replace(/^(\s*\n)+/g, "");
    
  } else {
    text = text.replace(/\n/g, " ");
  }

  // ========================================================
  // 4. REMOVE EXTRA SPACES
  // ========================================================
  if (removeExtraSpaces) {
    text = text.replace(/[ \t]+/g, " ");
    text = text.replace(/ +\n/g, "\n").replace(/\n +/g, "\n");
    text = text.replace(/\n{3,}/g, "\n\n");
  }

  // 5. SET OUTPUT AKHIR
  text = text.trim();
  setOutput(text);
}
  async function handleCopy() {
  if (!output) return;

  await navigator.clipboard.writeText(output);
  setCopied(true);

  setTimeout(() => {
    setCopied(false);
  }, 2000);
}
    function handleClear() {
  setInput("");
  setOutput("");
  setCopied(false);
}
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="json-input" className="text-sm font-medium">
            Paste Text
          </label>
          <textarea
             id="json-input"
             value={input}
             onChange={(e) => setInput(e.target.value)}
             placeholder="Paste copied text from PDFs, journals, research papers, or e-books here..."
            className="min-h-[380px] w-full rounded-lg border border-input bg-transparent px-4 py-3 font-sans text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="json-output" className="text-sm font-medium">
            Cleaned Text
          </label>
          <textarea
            id="json-output"
            value={output}
            readOnly
            placeholder="Cleaned text will appear here..."
            className="min-h-[380px] w-full rounded-lg border border-input bg-muted/50 px-4 py-3 font-sans text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

    <div className="flex flex-wrap gap-5">

  <label className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      checked={preserveParagraphs}
      onChange={(e) =>
        setPreserveParagraphs(e.target.checked)
      }
    />
    Keep paragraphs
  </label>

  <label className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      checked={removeExtraSpaces}
      onChange={(e) =>
        setRemoveExtraSpaces(e.target.checked)
      }
    />
    Remove extra spaces
  </label>

  <label className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      checked={fixHyphenation}
      onChange={(e) =>
        setFixHyphenation(e.target.checked)
      }
    />
    Fix split words
  </label>
  <label className="flex items-center gap-2 text-sm">
    <input
      type="checkbox"
      checked={removeFooters}
      onChange={(e) => setRemoveFooters(e.target.checked)
      }
    />
    <span>Remove Footers & DOI</span>
  </label>

</div>
      <div className="rounded-lg border border-border bg-muted/40 p-4 space-y-4">
  <div>
    <h3 className="text-sm font-medium">💡 Best Results</h3>
    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
      <li>Copy one page at a time for the best results.</li>
      <li>Works best with single-column PDFs.</li>
      <li>Two-column layouts, tables, and scanned PDFs may require manual editing.</li>
    </ul>
  </div>

  <div className="border-t border-border pt-4">
    <h3 className="text-sm font-medium">⚠️ Disclaimer</h3>
    <p className="mt-2 text-sm text-muted-foreground leading-6">
      This tool is intended to speed up text cleanup, but it cannot guarantee perfect results. Always compare the cleaned text with the original document before using it.
    </p>
  </div>
</div>

      <div className="flex gap-3">
        <button onClick={handleClean} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Clean Text
        </button>
       <button
  onClick={handleCopy}
  disabled={!output}
  className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
>
  {copied ? "Copied ✓" : "Copy"}
</button>
        <button onClick={handleClear} className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
          Clear
        </button>
      </div>
    </div>
  );
}

AcademicTextCleaner.icon = GraduationCap;
