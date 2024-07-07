import { PannerAttributes } from "howler";
import { cafeSounds } from "./cafeSounds";
import { natureSounds } from "./natureSounds";
import { staticSounds } from "./staticSounds";

export interface SoundSourcesType {
  id: number;
  name: string;
  desc: string;
  path: string;
  isOutside: boolean;
  renderType: "cafe" | "static" | "ambience" | "cluster";
  renderAttr?: { node: number; radius: number };
  soundType: "cafe" | "static" | "nature";
  vol: number;
  pos?: { x: number; y: number; z: number };
  orientation?: [number, number, number];
  pannerAttr?: PannerAttributes;
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
