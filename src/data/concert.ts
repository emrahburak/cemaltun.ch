export interface ConcertVideo {
  id: string;
  embedId: string;
  title: string;
  description: string;
}

export const concertVideos: ConcertVideo[] = [
  {
    id: "sleep-with-piano-cello",
    embedId: "W0mjfzPP17I",
    title: "Sleep with Piano & Cello",
    description:
      "Composed by Cem Altun. A tender space where the heart can soften, the mind can slow down, and the night can feel a little less heavy. A companion for sleepless hours, for silent feelings, and for anyone searching for comfort in the dark."
  },
  {
    id: "yuksek-yuksek-beyond-home",
    embedId: "Cl41Vk8jcWE",
    title: "Yüksek Yüksek – Beyond Home",
    description:
      "A powerful orchestral reimagining of the traditional Anatolian folk song. This cinematic symphonic arrangement transforms a story of longing, distance, and memory into a deeply emotional concert hall experience."
  },
  {
    id: "live-performance",
    embedId: "SNj59A6lHTM",
    title: "Live Performance",
    description:
      "An intimate live performance showcasing original compositions and arrangements."
  }
];
