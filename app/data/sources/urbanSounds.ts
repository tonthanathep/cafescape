import { SoundSourcesType } from "./soundSources";

type SoundLibrary = Omit<SoundSourcesType, "id">;

export const urbanSounds: Array<SoundLibrary> = [
  {
    name: "City Streets",
    desc: "x",
    path: "/sounds/birds.mp3",
    isOutside: true,
    renderType: "ambience",
    soundType: "urban",
    vol: 1.0,
    pos: { x: 0, y: 0, z: 0 },
    orientation: [0, 0, 0],
    pannerAttr: {
      panningModel: "HRTF",
      distanceModel: "inverse",
      refDistance: 1,
      maxDistance: 1000,
      rolloffFactor: 1,
      coneInnerAngle: 360,
      coneOuterAngle: 0,
      coneOuterGain: 0,
    },
  },
  {
    name: "City Streets",
    desc: "x",
    path: "/sounds/birds.mp3",
    isOutside: true,
    renderType: "ambience",
    soundType: "urban",
    vol: 1.0,
    pos: { x: 0, y: 0, z: 0 },
    orientation: [0, 0, 0],
    pannerAttr: {
      panningModel: "HRTF",
      distanceModel: "inverse",
      refDistance: 1,
      maxDistance: 1000,
      rolloffFactor: 1,
      coneInnerAngle: 360,
      coneOuterAngle: 0,
      coneOuterGain: 0,
    },
  },
];
