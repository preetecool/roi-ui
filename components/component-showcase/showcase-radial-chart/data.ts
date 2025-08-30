import { getTopInstrumentalSongs } from "@/data/instrumental-songs-2025";

const top30InstrumentalSongs2025 = getTopInstrumentalSongs(30);

export const songChartData = top30InstrumentalSongs2025.map((song) => ({
  category: song.label || song.title,
  value: song.streams,
}));
