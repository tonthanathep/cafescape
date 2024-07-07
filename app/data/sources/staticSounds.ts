import { SoundSourcesType } from "./soundSources";

type SoundLibrary = Omit<SoundSourcesType, "id">;

export const staticSounds: Array<SoundLibrary> = [
  {
    name: "Brown Noise",
    desc: "Soothing static brown noise",
    path: "https://nmbeyfxpmhmxwjbzmcod.supabase.co/storage/v1/object/public/sounds/static/static_brownnoise.mp3",
    isOutside: false,
    renderType: "static",
    soundType: "static",
    vol: 0.5,
  },
  {
    name: "Fan Noise",
    desc: "Calming static fan noise",
    path: "https://nmbeyfxpmhmxwjbzmcod.supabase.co/storage/v1/object/public/sounds/static/static_fannoise.mp3",
    isOutside: false,
    renderType: "static",
    soundType: "static",
    vol: 0.5,
  },
  {
    name: "Grey Noise",
    desc: "Relaxing static grey noise",
    path: "https://nmbeyfxpmhmxwjbzmcod.supabase.co/storage/v1/object/public/sounds/static/static_greynoise.mp3",
    isOutside: false,
    renderType: "static",
    soundType: "static",
    vol: 0.5,
  },
  {
    name: "Pink Noise",
    desc: "Gentle static pink noise",
    path: "https://nmbeyfxpmhmxwjbzmcod.supabase.co/storage/v1/object/public/sounds/static/static_pinknoise.mp3",
    isOutside: false,
    renderType: "static",
    soundType: "static",
    vol: 0.5,
  },
];
