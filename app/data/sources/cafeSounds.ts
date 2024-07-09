import { SoundSourcesType } from "./soundSources";

type SoundLibrary = Omit<SoundSourcesType, "id">;

export const cafeSounds: Array<SoundLibrary> = [
  {
    name: "Coffee Machine",
    desc: "The familiar sound of a coffee machine brewing",
    path: "https://nmbeyfxpmhmxwjbzmcod.supabase.co/storage/v1/object/public/sounds/cafe/cafe_coffeemaking.mp3",
    isOutside: false,
    renderType: "cafe",
    soundType: "cafe",
    vol: 1.0,
    pos: { x: 35, y: 0, z: 30 },
    orientation: [0, 0, 0],
    pannerAttr: {},
  },
  {
    name: "Keyboard Typing",
    desc: "The rhythmic tapping of keyboard keys",
    path: "https://nmbeyfxpmhmxwjbzmcod.supabase.co/storage/v1/object/public/sounds/cafe/cafe_keyboard.mp3",
    isOutside: false,
    renderType: "cafe",
    soundType: "cafe",
    vol: 1.0,
    pos: { x: 30, y: 0, z: 63 },
    orientation: [0, 0, 0],
    pannerAttr: {},
  },
  {
    name: "Preparing for Exam",
    desc: "Student preparing for their exam in a cafe",
    path: "https://nmbeyfxpmhmxwjbzmcod.supabase.co/storage/v1/object/public/sounds/cafe/cafe_study.mp3?t=2024-07-08T04%3A37%3A52.475Z",
    isOutside: false,
    renderType: "cafe",
    soundType: "cafe",
    vol: 1.0,
    pos: { x: 58, y: 0, z: 68 },
    orientation: [0, 0, 0],
    pannerAttr: {},
  },
];
