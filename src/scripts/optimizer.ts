import fg from "fast-glob";
import fs from "fs";
import path from "path";
import sharp from "sharp"; // Sharp eklendi
import { pathsToOptimize } from "./optimizer.config";

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".JPG"];

(async () => {
  const files = await fg(pathsToOptimize, { dot: false, onlyFiles: true });

  // 1. Optimize edilecek dosyaları seç
  const filesToConvert = files
    .filter((file) => EXTENSIONS.includes(path.extname(file)))
    .filter((file) => {
      const dir = path.dirname(file);
      const baseName = path
        .basename(file)
        .replace(/\.(jpg|jpeg|png|JPG)$/i, ".webp");
      const webpPath = path.join(dir, "webp", baseName);
      return !fs.existsSync(webpPath);
    });

  // 2. Artık karşılığı olmayan .webp dosyalarını bul ve sil
  const webpFiles = await fg("src/assets/**/webp/*.webp", {
    dot: false,
    onlyFiles: true,
  });

  webpFiles.forEach((webpFile) => {
    const baseName = path.basename(webpFile, ".webp");
    const originalDir = path.resolve(path.dirname(webpFile), "..");

    const hasSource = EXTENSIONS.some((ext) =>
      fs.existsSync(path.join(originalDir, baseName + ext)),
    );

    if (!hasSource) {
      fs.unlinkSync(webpFile);
      console.log("🧹 Silindi:", path.relative(process.cwd(), webpFile));
    }
  });

  // 3. Yeni optimize edilecek dosyaları işle
  if (filesToConvert.length === 0) {
    console.log("✅ Tüm dosyalar zaten optimize edilmiş.");
    process.exit(0);
  }

  for (const file of filesToConvert) {
    const dir = path.dirname(file);
    const baseName = path
      .basename(file)
      .replace(/\.(jpg|jpeg|png|JPG)$/i, ".webp");
    const outputDir = path.join(dir, "webp");

    // webp/ klasörü yoksa oluştur
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    const outputPath = path.join(outputDir, baseName);

    console.log(
      "📦",
      path.basename(file),
      "→",
      path.relative(process.cwd(), outputPath),
    );

    await sharp(file)
      .rotate() // EXIF orientation'a göre düzeltir
      .resize({ width: 1280 }) // boyutu sabitler
      .webp({ quality: 75 })
      .toFile(outputPath);
  }

  console.log("🎉 Optimize işlemi tamamlandı (EXIF düzeltme dahil).");
})();
