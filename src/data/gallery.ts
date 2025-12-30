// Webp formatındaki tüm resimleri otomatik (eager) olarak çek
const imageModules = import.meta.glob<{ default: string }>(
  "/src/assets/images/gallery/webp/*.webp",
  { eager: true },
);

export type galleryItem = {
  id: number;
  img: string;
  title: string;
};

// Çekilen objeyi işleyip export edilecek datayı oluştur
export const galleryData: galleryItem[] = Object.entries(imageModules).map(
  ([path, module], index) => {
    // Dosya adından başlık oluşturma (Opsiyonel: cem-altun-01.webp -> CEM ALTUN 01)
    const fileName = path.split("/").pop()?.replace(".webp", "") || "";
    const formattedTitle = fileName.replace(/-/g, " ").toUpperCase();

    return {
      id: index + 1,
      img: module.default, // Vite tarafından işlenmiş gerçek URL
      title: formattedTitle,
    };
  },
);
