import { existsSync, readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";

export const HERO_PACK_SRC = "/qurt/pack-front.png";

export type IntroProduct = {
  fileName: string;
  src: string;
  isQurt: boolean;
};

export type IntroAssets = {
  enabled: boolean;
  introItems: IntroProduct[];
  heroPackSrc: string;
  productFiles: string[];
  qurtFiles: string[];
  selectedQurtFile: string | null;
  ignoredQurtFiles: string[];
  ignoredProductFiles: string[];
};

const emptyAssets = (): IntroAssets => ({
  enabled: false,
  introItems: [],
  heroPackSrc: HERO_PACK_SRC,
  productFiles: [],
  qurtFiles: [],
  selectedQurtFile: null,
  ignoredQurtFiles: [],
  ignoredProductFiles: [],
});

const toPublicSrc = (fileName: string) => `/intro/${encodeURIComponent(fileName)}`;

export function readIntroAssets(): IntroAssets {
  const introDirectory = join(process.cwd(), "public", "intro");
  if (!existsSync(introDirectory)) return emptyAssets();

  let files: string[];
  try {
    files = readdirSync(introDirectory, { withFileTypes: true })
      .filter((entry) => entry.isFile() && [".webp", ".png", ".jpg", ".jpeg"].includes(extname(entry.name).toLowerCase()))
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right, "ru", { numeric: true, sensitivity: "base" }));
  } catch {
    return emptyAssets();
  }

  const qurtFiles = files.filter((fileName) => /(qurt|kurt|курт)/i.test(fileName));
  const productFiles = files.filter((fileName) => !qurtFiles.includes(fileName));
  const heroFileName = basename(HERO_PACK_SRC);
  const selectedQurtFile = qurtFiles.find((fileName) => fileName.toLowerCase() === heroFileName.toLowerCase()) ?? qurtFiles[0] ?? null;
  const ignoredQurtFiles = selectedQurtFile ? qurtFiles.filter((fileName) => fileName !== selectedQurtFile) : [];

  if (files.length < 4) {
    return {
      ...emptyAssets(),
      productFiles,
      qurtFiles,
      selectedQurtFile,
      ignoredQurtFiles,
    };
  }

  const heroPackSrc = selectedQurtFile ? toPublicSrc(selectedQurtFile) : HERO_PACK_SRC;
  const candidateItems: IntroProduct[] = [
    { fileName: selectedQurtFile ?? heroFileName, src: heroPackSrc, isQurt: true },
    ...productFiles.slice(0, 8).map((fileName) => ({ fileName, src: toPublicSrc(fileName), isQurt: false })),
  ];
  const enabled = files.length >= 4 && candidateItems.length >= 4;

  return {
    enabled,
    introItems: enabled ? candidateItems : [],
    heroPackSrc: enabled ? heroPackSrc : HERO_PACK_SRC,
    productFiles,
    qurtFiles,
    selectedQurtFile,
    ignoredQurtFiles,
    ignoredProductFiles: productFiles.slice(8),
  };
}