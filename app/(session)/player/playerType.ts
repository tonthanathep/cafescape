import { SoundSourcesType } from "../../data/sources/soundSources";

export interface listenerPos {
  //x,z horizontal y vertical
  x: number;
  z: number;
}

export interface BlendType {
  owner: any;
  id: number;
  created_at: string;
  name: string;
  cafeLayers: SoundSourcesType[];
  ambiLayers: SoundSourcesType[];
  listenerPos: listenerPos;
}

export interface canvasSoundLayer {
  name: string;
  id: number;
  x: number;
  y: number;
  z: number;
}

export interface CanvasType {
  canvasHeight: number;
  canvasWidth: number;
  listenerHeight: number;
  listenerWidth: number;
  canvasListener: listenerPos;
  canvasCafe: canvasSoundLayer[];
  canvasAmbi: canvasSoundLayer[];
}
