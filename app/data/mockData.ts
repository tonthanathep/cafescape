// data/mockData.ts

export const blends = [
  {
    uid: 1,
    created: 1632873600000,
    name: "Blend One",
    cafeLayers: [
      {
        id: 1,
        name: "Cafe Layer 1",
        path: "path/to/sound1",
        pos: { x: 0, y: 0 },
        vol: 1,
      },
      {
        id: 2,
        name: "Cafe Layer 2",
        path: "path/to/sound2",
        pos: { x: 10, y: 10 },
        vol: 1,
      },
    ],
    ambiLayers: [
      {
        id: 2,
        name: "Ambi Layer 1",
        path: "path/to/sound3",
        pos: { x: 20, y: 20 },
        vol: 1,
      },
      {
        id: 1,
        name: "Ambi Layer 2",
        path: "path/to/sound4",
        pos: { x: 30, y: 30 },
        vol: 1,
      },
    ],
    listenerPos: { x: 0, y: 0, z: 0 },
  },
  // Add more blends as needed
];
