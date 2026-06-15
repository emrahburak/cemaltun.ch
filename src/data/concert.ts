export interface ConcertVideo {
  id: string;
  embedId: string;
  title: string;
  descriptionKey: string;
}

export const concertVideos: ConcertVideo[] = [
  {
    id: "sleep-with-piano-cello",
    embedId: "W0mjfzPP17I",
    title: "Sleep with Piano & Cello",
    descriptionKey: "videos.sleep_with_piano_cello"
  },
  {
    id: "yuksek-yuksek-beyond-home",
    embedId: "Cl41Vk8jcWE",
    title: "Yüksek Yüksek – Beyond Home",
    descriptionKey: "videos.yuksek_yuksek"
  },
  {
    id: "live-performance",
    embedId: "SNj59A6lHTM",
    title: "Live Performance",
    descriptionKey: "videos.live_performance"
  },
  {
    id: "izmir-marsi",
    embedId: "8z5NGX3eTNE",
    title: "İzmir Marşı | Epic Philharmonic Orchestra Arrangement",
    descriptionKey: "videos.izmir_marsi"
  },
  {
    id: "breath-between-shadows",
    embedId: "sjsClCtRifA",
    title: "Breath Between Shadows",
    descriptionKey: "videos.breath_between_shadows"
  }
];
