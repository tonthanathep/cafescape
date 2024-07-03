import { Howl } from "howler";
import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";
import { BlendType, CanvasType } from "../../(session)/player/playerType";
import createHowlInstance from "../../utils/createHowlInstance";
import { SoundSourcesType } from "../sources/soundSources";

export interface PlayerStore {
  currentCanvas: CanvasType;
  currentBlend: BlendType;
  currentCafeHowl: { id: number; howl: Howl }[];
  currentAmbiHowl: { id: number; howl: Howl }[];
  setBlend: (blend: BlendType) => void;
  addLayer: (layerType: "cafe" | "ambi", layer: SoundSourcesType) => void;
  deleteLayer: (layerType: "cafe" | "ambi", layerId: number) => void;
  setListenerPos: (x: number, z: number) => void;
  setCanvas: (
    canvasHeight: number,
    canvasWidth: number,
    listenerHeight: number,
    listenerWidth: number
  ) => void;
  setCafeSoundPos: (layerId: number, x: number, y: number) => void;
  setVolume: (layerType: "cafe" | "ambi", id: number, volume: number) => void;
  setBlendId: (blendId: string) => void;
}

//Clean and unloaded Howls instance before loading in new one
const stopAndUnloadHowls = (howlInstances: { id: number; howl: Howl }[]) => {
  howlInstances.forEach(({ howl }) => {
    howl.stop();
    howl.unload();
  });
};

//Handling creating Howl instance for each type of sounds based on renderType

const updateAmbiSoundPositions = (state: PlayerStore) => {
  state.currentAmbiHowl.forEach(({ id, howl }) => {
    const layer = state.currentCanvas.canvasAmbi.find(
      (layer) => layer.id === id
    );
    if (layer) {
      howl.pos(
        state.currentCanvas.canvasListener.x,
        layer.y,
        state.currentCanvas.canvasListener.z
      );
    }
  });
};

const usePlayerStore = create<PlayerStore>((set) => ({
  currentBlend: {
    id: "",
    created_at: "",
    name: "My Blend",
    owner: undefined,
    cafeLayers: [],
    ambiLayers: [],
    listenerPos: { x: 0, y: 0, z: 0 },
    layerType: { isCafe: false, isNoise: false },
  },
  currentCanvas: {
    canvasHeight: 0,
    canvasWidth: 0,
    listenerHeight: 0,
    listenerWidth: 0,
    canvasListener: { x: 0, y: 0, z: 0 },
    canvasCafe: [],
    canvasAmbi: [],
  },
  currentCafeHowl: [],
  currentAmbiHowl: [],

  setBlend: (blend) =>
    set((state) => {
      console.log("Setting Blend: ", blend.name);
      stopAndUnloadHowls(state.currentCafeHowl);
      stopAndUnloadHowls(state.currentAmbiHowl);

      // Translate Listener Position
      const listenerX = Math.round(
        (blend.listenerPos.x / 100) * state.currentCanvas.canvasWidth -
          state.currentCanvas.listenerWidth / 2
      );

      const listenerZ = Math.round(
        (blend.listenerPos.z / 100) * state.currentCanvas.canvasHeight -
          state.currentCanvas.listenerHeight / 2
      );

      Howler.pos(listenerX, listenerZ, 0);

      // Translate Save Data to Canvas Data & Create New Cafe Howl
      const newCafeData = blend.cafeLayers.map((layer) => {
        const newHowl = createHowlInstance(layer, state);
        const canvasX = Math.round(
          (layer.pos.x! / 100) * state.currentCanvas.canvasWidth -
            state.currentCanvas.listenerWidth / 2
        );

        const canvasZ = Math.round(
          (layer.pos.z! / 100) * state.currentCanvas.canvasHeight -
            state.currentCanvas.listenerHeight / 2
        );

        return {
          canvasLayer: {
            name: layer.name,
            id: layer.id,
            x: canvasX,
            y: layer.pos.y,
            z: canvasZ,
          },
          howl: {
            id: layer.id,
            howl: newHowl,
          },
        };
      });

      // const newCafeCanvas = newCafeData.map((data) => data.canvasLayer);
      const newCafeCanvas = newCafeData.map((data) => data.canvasLayer);
      const newCafeHowls = newCafeData.map((data) => data.howl);

      // Translate Save Data for Ambience Layer
      const newAmbiData = blend.ambiLayers.map((layer) => {
        console.log("Translate Ambi Layers");

        const newHowl = createHowlInstance(layer, state);

        return {
          howl: {
            id: layer.id,
            howl: newHowl,
          },
        };
      });

      const newAmbiHowls = newAmbiData.map((data) => data.howl);

      return {
        currentBlend: {
          ...state.currentBlend,
          ...blend,
        },
        currentCanvas: {
          ...state.currentCanvas,
          canvasCafe: newCafeCanvas,
          canvasListener: {
            x: listenerX,
            z: listenerZ,
          },
        },
        currentCafeHowl: newCafeHowls,
        currentAmbiHowl: newAmbiHowls,
      };
    }),
  addLayer: (layerType, layer) =>
    set((state) => {
      // Add New Sound Instance
      const newHowl = createHowlInstance(layer, state);

      const canvasX = Math.round(
        (layer.pos.x! / 100) * state.currentCanvas.canvasWidth -
          state.currentCanvas.listenerWidth / 2
      );

      const canvasZ = Math.round(
        (layer.pos.z! / 100) * state.currentCanvas.canvasHeight -
          state.currentCanvas.listenerHeight / 2
      );

      return {
        currentBlend: {
          ...state.currentBlend,
          cafeLayers:
            layerType === "cafe"
              ? [...state.currentBlend.cafeLayers, layer]
              : state.currentBlend.cafeLayers,
          ambiLayers:
            layerType === "ambi"
              ? [...state.currentBlend.ambiLayers, layer]
              : state.currentBlend.ambiLayers,
        },
        currentCanvas: {
          ...state.currentCanvas,
          canvasCafe:
            layerType === "cafe"
              ? [
                  ...state.currentCanvas.canvasCafe,
                  {
                    name: layer.name,
                    id: layer.id,
                    x: canvasX,
                    y: layer.pos.y,
                    z: canvasZ,
                  },
                ]
              : state.currentCanvas.canvasCafe,
        },
        currentCafeHowl:
          layerType === "cafe"
            ? [...state.currentCafeHowl, { id: layer.id, howl: newHowl }]
            : state.currentCafeHowl,
        currentAmbiHowl:
          layerType === "ambi"
            ? [...state.currentAmbiHowl, { id: layer.id, howl: newHowl }]
            : state.currentAmbiHowl,
      };
    }),
  deleteLayer: (layerType, layerId) =>
    set((state) => {
      // Handle Howl instances removal
      const howlInstances =
        layerType === "cafe" ? state.currentCafeHowl : state.currentAmbiHowl;
      const remainingHowls = howlInstances.filter(
        (howl) => howl.id !== layerId
      );
      const removedHowl = howlInstances.find(
        (howl) => howl.id === layerId
      )?.howl;

      if (removedHowl) {
        removedHowl.stop();
        removedHowl.unload();
      }

      return {
        currentBlend: {
          ...state.currentBlend,
          cafeLayers:
            layerType === "cafe"
              ? state.currentBlend.cafeLayers.filter(
                  (layer) => layer.id !== layerId
                )
              : state.currentBlend.cafeLayers,
          ambiLayers:
            layerType === "ambi"
              ? state.currentBlend.ambiLayers.filter(
                  (layer) => layer.id !== layerId
                )
              : state.currentBlend.ambiLayers,
        },
        currentCafeHowl:
          layerType === "cafe" ? remainingHowls : state.currentCafeHowl,
        currentAmbiHowl:
          layerType === "ambi" ? remainingHowls : state.currentAmbiHowl,
        currentCanvas: {
          ...state.currentCanvas,
          canvasCafe:
            layerType === "cafe"
              ? state.currentCanvas.canvasCafe.filter(
                  (layer) => layer.id !== layerId
                )
              : state.currentCanvas.canvasCafe,
          canvasAmbi:
            layerType === "ambi"
              ? state.currentCanvas.canvasAmbi.filter(
                  (layer) => layer.id !== layerId
                )
              : state.currentCanvas.canvasAmbi,
        },
      };
    }),
  setListenerPos: (x, z) =>
    set((state) => {
      updateAmbiSoundPositions(state);
      const updateCanvasAmbi = state.currentCanvas.canvasAmbi.map((layer) => {
        return {
          id: layer.id,
          x: x,
          y: layer.y,
          z: z,
        };
      });
      return {
        currentCanvas: {
          ...state.currentCanvas,
          canvasListener: { x, y: 0, z },
        },
        currentBlend: {
          ...state.currentBlend,
          listenerPos: {
            x: Math.round(
              ((x + state.currentCanvas.listenerWidth / 2) /
                state.currentCanvas.canvasWidth) *
                100
            ),
            z: Math.round(
              ((z + state.currentCanvas.listenerHeight / 2) /
                state.currentCanvas.canvasHeight) *
                100
            ),
            y: 0,
          },
        },
      };
    }),
  setCafeSoundPos: (layerId, x, y) =>
    set((state) => ({
      currentCanvas: {
        ...state.currentCanvas,
        canvasCafe: state.currentCanvas.canvasCafe.map((layer) =>
          layer.id === layerId ? { ...layer, x, y } : layer
        ),
      },
    })),
  setCanvas: (canvasHeight, canvasWidth, listenerHeight, listenerWidth) =>
    set((state) => {
      console.log("Canvas: New Canvas Set");

      return {
        currentCanvas: {
          ...state.currentCanvas,
          canvasHeight: canvasHeight,
          canvasWidth: canvasWidth,
          listenerWidth: listenerWidth,
          listenerHeight: listenerHeight,
        },
      };
    }),
  setVolume: (layerType, id, volume) =>
    set((state) => {
      const howlInstances =
        layerType === "cafe" ? state.currentCafeHowl : state.currentAmbiHowl;
      const howlInstance = howlInstances.find((howl) => howl.id === id)?.howl;
      if (howlInstance) {
        howlInstance.volume(volume);
      }

      return {
        currentBlend: {
          ...state.currentBlend,
          cafeLayers:
            layerType === "cafe"
              ? state.currentBlend.cafeLayers.map((layer) =>
                  layer.id === id ? { ...layer, vol: volume } : layer
                )
              : state.currentBlend.cafeLayers,
          ambiLayers:
            layerType === "ambi"
              ? state.currentBlend.ambiLayers.map((layer) =>
                  layer.id === id ? { ...layer, vol: volume } : layer
                )
              : state.currentBlend.ambiLayers,
        },
      };
    }),
  setBlendId: (blendId) =>
    set((state) => {
      return {
        currentBlend: {
          ...state.currentBlend,
          id: blendId,
        },
      };
    }),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("playerStore", usePlayerStore);
}

export default usePlayerStore;
