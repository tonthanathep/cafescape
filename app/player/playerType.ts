import { soundSourcesType } from "../components/BlendPlayer/soundSources";

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
  cafeLayers: soundSourcesType[];
  ambiLayers: soundSourcesType[];
  listenerPos: listenerPos;
}

export interface canvasSoundLayer {
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
