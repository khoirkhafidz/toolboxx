import {
  FileText,
  FileImage,
  Braces,
  ImageDown,
  Scissors,
  GraduationCap,
  QrCode,
  ImageUp,
} from 'lucide-react';
import type { ToolConfig, ToolCategory, CategoryInfo } from '@/types';

export const toolConfigs: ToolConfig[] = [
  {
    id: 'word-counter',
    title: 'Word Counter',
    description:
      'Count words, characters, sentences, and paragraphs in your text instantly.',
    category: 'text',
    tags: ['text', 'words', 'counter', 'writing'],
    icon: FileText,
    route: '/tools/word-counter',
    componentLoader: () => import('@/tools/word-counter'),
    popular: false,
  },
  {
    id: 'pdf-to-image',
    title: 'PDF to Image',
    description:
      'Convert PDF pages to high-quality images. All processing done locally.',
    category: 'pdf',
    tags: ['pdf', 'image', 'convert', 'extract'],
    icon: FileImage,
    route: '/tools/pdf-to-image',
    componentLoader: () => import('@/tools/pdf-to-image'),
    popular: true,
  },
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Format, validate, and beautify your JSON data with ease.',
    category: 'developer',
    tags: ['json', 'format', 'validate', 'developer', 'code'],
    icon: Braces,
    route: '/tools/json-formatter',
    componentLoader: () => import('@/tools/json-formatter'),
    popular: false,
  },
  {
    id: 'image-compressor',
    title: 'Image Compressor',
    description:
      'Compress images without losing quality. Your files stay on your device.',
    category: 'image',
    tags: ['image', 'compress', 'optimize', 'reduce'],
    icon: ImageDown,
    route: '/tools/image-compressor',
    componentLoader: () => import('@/tools/image-compressor'),
    popular: true,
  },
  {
  id: 'image-to-pdf',
  title: 'Image to PDF',
  description:
    'Convert JPG, PNG, and WEBP images into a single PDF. Your files stay on your device.',
  category: 'image',
  tags: ['image', 'pdf', 'convert', 'jpg', 'png', 'webp'],
  icon: FileImage,
  route: '/tools/image-to-pdf',
  componentLoader: () => import('@/tools/image-to-pdf'),
  popular: true,
  },
  {
  id: 'citation-generator',
  title: 'Citation Generator',
  description: 'Generate APA, MLA, IEEE, and Chicago citations.',
  category: 'academic',
  tags: ['citation', 'apa', 'mla', 'ieee'],
  icon: FileText,
  route: '/tools/citation-generator',
  componentLoader: () => import('@/tools/citation-generator'),
  popular: true,
  },
  {
  id: "bibliography-alphabetizer",
  title: "Bibliography Alphabetizer",
  description:
    "Sort bibliography or reference lists alphabetically in seconds.",
  category: "academic",
  tags: [
    "bibliography",
    "reference",
    "citation",
    "sort",
    "alphabet"
  ],
  icon: GraduationCap,
  route: "/tools/bibliography-alphabetizer",
  componentLoader: () =>
    import("@/tools/bibliography-alphabetizer"),
  popular: true,
},
  {
  id: "doi-to-citation",
  title: "DOI to Citation",
  description:
    "Generate citations from a DOI using Crossref metadata.",
  category: "academic",
  tags: [
    "doi",
    "citation",
    "crossref",
    "journal",
    "academic"
  ],
  icon: GraduationCap,
  route: "/tools/doi-to-citation",
  componentLoader: () => import("@/tools/doi-to-citation"),
  popular: true,
},
{
  id: "merge-pdf",
  title: "Merge PDF",
  description:
    "Merge multiple PDF files into a single document.",
  category: "pdf",
  tags: [
    "pdf",
    "merge",
    "combine",
    "document"
  ],
  icon: FileImage,
  route: "/tools/merge-pdf",
  componentLoader: () => import("@/tools/merge-pdf"),
  popular: true,
},
{
  id: "split-pdf",
  title: "Split PDF",
  description:
    "Extract a page range from a PDF into a new PDF file.",
  category: "pdf",
  tags: [
    "pdf",
    "split",
    "extract",
    "page",
    "pages"
  ],
  icon: Scissors,
  route: "/tools/split-pdf",
  componentLoader: () =>
    import("@/tools/split-pdf"),
  popular: true,
},
{
  id: "qr-code-generator",
  title: "QR Code Generator",
  description:
    "Generate QR codes from text or URLs instantly.",
  category: "utilities",
  tags: [
    "qr",
    "qrcode",
    "generator",
    "url",
    "text"
  ],
  icon: QrCode,
  route: "/tools/qr-code-generator",
  componentLoader: () =>
    import("@/tools/qr-code-generator"),
  popular: true,
},
{
  id: "image-upscaler",
  title: "Image Upscaler",
  description:
    "Resize images up to 2× or 4× directly in your browser using high-quality interpolation.",
  category: "image",
  tags: [
    "image",
    "upscale",
    "upscaler",
    "ai",
    "enhance",
    "resolution",
    "photo"
  ],
  icon: ImageUp,
  route: "/tools/image-upscaler",
  componentLoader: () =>
    import("@/tools/image-upscaler"),
  popular: false,
},
{
  id: "academic-text-cleaner",
  title: "Academic Text Cleaner",
  description:
    "Clean copied text from PDFs, journals, research papers, and e-books while preserving paragraphs.",
  category: "academic",
  tags: [
    "academic",
    "text",
    "cleaner",
    "pdf",
    "journal",
    "research",
    "ebook",
    "formatting",
    "copy",
    "paste",
    "paragraph"
  ],
  icon: GraduationCap,
  route: "/tools/academic-text-cleaner",
  componentLoader: () =>
    import("@/tools/academic-text-cleaner"),
  popular: true,
},
];

export const categoryLabels: Record<ToolCategory, string> = {
  pdf: 'PDF',
  image: 'Image',
  text: 'Text',
  developer: 'Developer',
  ai: 'AI',
  utilities: 'Utilities',
  design: 'Design',
  academic: 'Academic',
};

export const getCategoryInfo = (): CategoryInfo[] => {
  const counts: Record<ToolCategory, number> = {
    pdf: 0,
    image: 0,
    text: 0,
    developer: 0,
    ai: 0,
    utilities: 0,
    design: 0,
    academic: 0,
  };

  toolConfigs.forEach((tool) => {
    counts[tool.category]++;
  });

  return Object.entries(counts)
    .filter(([_, count]) => count > 0)
    .map(([id, count]) => ({
      id: id as ToolCategory,
      label: categoryLabels[id as ToolCategory],
      count,
    }));
};

export const getPopularTools = (): ToolConfig[] =>
  toolConfigs.filter((tool) => tool.popular);

export const getToolById = (id: string): ToolConfig | undefined =>
  toolConfigs.find((tool) => tool.id === id);

export const searchTools = (query: string): ToolConfig[] => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return toolConfigs;

  return toolConfigs.filter(
    (tool) =>
      tool.title.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getToolsByCategory = (category: ToolCategory): ToolConfig[] =>
  toolConfigs.filter((tool) => tool.category === category);
