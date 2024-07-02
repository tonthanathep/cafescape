import { cafeSounds } from "./cafeSounds";
import { staticSounds } from "./staticSounds";
import { natureSounds } from "./natureSounds";

interface SoundSourcesType {
  id: number;
  name: string;
  desc: string;
  path: string;
  isOutside: boolean;
  renderType: "cafe" | "static" | "ambience" | "cluster";
  soundType: "cafe" | "static" | "nature";
  vol: number;
  pos: { x: number; y: number; z: number };
  orientation: [number, number, number];
  pannerAttr: {};
}

const mergeSounds = (sounds: any[]): SoundSourcesType[] => {
  return sounds.map((sound, index) => ({
    ...sound,
    id: index + 1,
  }));
};

const soundSources = mergeSounds([
  ...cafeSounds,
  ...staticSounds,
  ...natureSounds,
]);

export default soundSources;
