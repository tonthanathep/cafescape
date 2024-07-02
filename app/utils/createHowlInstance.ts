// createHowlInstance.ts

import { PlayerStore } from "../player/store";
import { Howl } from "howler";
import { createLowPass } from "./createSoundFilter";
import { soundSourcesType } from "../components/BlendPlayer/soundSources";

interface SpriteMap {
  [key: string]: [number, number, boolean];
}

const createHowlInstance = (layer: soundSourcesType, state: PlayerStore) => {
  console.log("Creating Howl Instance for: ", layer.name);
  console.log("Sound Type: ", layer.renderType);

  const percentToPixel = () => {
    const canvasX = Math.round(
      (layer.pos.x! / 100) * state.currentCanvas.canvasWidth -
        state.currentCanvas.listenerWidth / 2
    );

    const canvasZ = Math.round(
      (layer.pos.z! / 100) * state.currentCanvas.canvasHeight -
        state.currentCanvas.listenerHeight / 2
    );

    return {
      x: canvasX,
      z: canvasZ,
    };
  };

  const randomizeCluster = (nodes: number) => {
    const positions = [];
    const sprite: SpriteMap = {};

    for (let i = 0; i < nodes; i++) {
      const x = (Math.random() - 0.5) * state.currentCanvas.canvasWidth;
      const z = 1 + (Math.random() - 0.5) * 0.5;
      const y = (Math.random() - 0.5) * state.currentCanvas.canvasHeight;

      positions.push({ x, y, z });
      sprite[`sound${i}`] = [0, 50000, true];
    }

    return { positions, sprite };
  };

  const positionCircleSounds = (nodes: number, radius: number) => {
    const positions = [];
    const sprite: SpriteMap = {};
    const angleIncrement = 360 / nodes;

    const centerX = state.currentCanvas.canvasWidth / 2;
    const centerZ = state.currentCanvas.canvasHeight / 2;

    for (let i = 0; i < nodes; i++) {
      const angle = i * angleIncrement;
      const radians = angle * (Math.PI / 180);

      const x = centerX + radius * Math.cos(radians);
      const z = centerZ + radius * Math.sin(radians);
      const y = layer.pos.y;

      positions.push({ x, y, z });
      sprite[`sound${i}`] = [0, 100000, true];
    }

    return { positions, sprite };
  };

  const randomInterval = (howl: Howl) => {
    const minInterval = 4 * 60 * 1000;
    const maxInterval = 10 * 60 * 1000;

    const playSound = () => {
      howl.play();
      const interval =
        Math.random() * (maxInterval - minInterval) + minInterval;
      setTimeout(playSound, interval);
    };

    playSound();
  };

  switch (layer.renderType) {
    case "cafe": {
      const NewHowl = new Howl({
        src: [layer.path],
        autoplay: true,
        onload: function () {
          console.log(layer.id + ":" + layer.name + ": loaded");
        },
        onplay: function () {
          console.log(layer.id + ":" + layer.name + ": played");
        },
        onstop: function () {
          console.log(layer.id + ":" + layer.name + ": stopped");
        },
      });

      NewHowl.once("load", () => {
        const position = percentToPixel();
        NewHowl.pos(position.x, layer.pos.y, position.z);
        NewHowl.orientation(0, 0, 0);
        randomInterval(NewHowl);
      });
      return NewHowl;
    }

    case "ambience": {
      const { positions, sprite } = positionCircleSounds(5, 100);
      console.log("Cluster Positions: ", positions);

      const NewHowl = new Howl({
        src: [layer.path],
        sprite: sprite,
        loop: true,
        onload: function () {
          console.log(layer.id + ":" + layer.name + ": loaded");
        },
        onplay: function (id) {
          console.log(layer.id + ":" + layer.name + ": played");
        },
        onstop: function (id) {
          console.log(layer.id + ":" + layer.name + ": stopped");
        },
      });

      NewHowl.once("load", () => {
        createLowPass(NewHowl);
        positions.forEach((position, index) => {
          const spriteName = `sound${index}`;
          const soundId = NewHowl.play(spriteName);
          NewHowl.pos(position.x, position.y, position.z, soundId);
          NewHowl.orientation(
            layer.orientation[0],
            layer.orientation[1],
            layer.orientation[2],
            soundId
          );
          console.log(
            `Sound ID: ${soundId}, Position: (${position.x}, ${position.y}, ${position.z})`
          );
        });
      });

      return NewHowl;
    }

    case "static": {
      const NewHowl = new Howl({
        src: [layer.path],
        autoplay: true,
        onload: function () {
          console.log(layer.id + ":" + layer.name + ": loaded");
        },
        onplay: function () {
          console.log(layer.id + ":" + layer.name + ": played");
        },
        onstop: function () {
          console.log(layer.id + ":" + layer.name + ": stopped");
        },
      });

      NewHowl.once("load", () => {
        NewHowl.play();
      });
      return NewHowl;
    }

    case "cluster": {
      const { positions, sprite } = randomizeCluster(5);
      console.log("Cluster Positions: ", positions);

      const NewHowl = new Howl({
        src: [layer.path],
        sprite: sprite,
        loop: true,
        onload: function () {
          console.log(layer.id + ":" + layer.name + ": loaded");
        },
        onplay: function (id) {
          console.log(layer.id + ":" + layer.name + ": played");
        },
        onstop: function (id) {
          console.log(layer.id + ":" + layer.name + ": stopped");
        },
      });

      NewHowl.once("load", () => {
        createLowPass(NewHowl);
        positions.forEach((position, index) => {
          const spriteName = `sound${index}`;
          const soundId = NewHowl.play(spriteName);
          NewHowl.pos(position.x, position.y, position.z, soundId);
          NewHowl.orientation(
            layer.orientation[0],
            layer.orientation[1],
            layer.orientation[2],
            soundId
          );
          console.log(
            `Sound ID: ${soundId}, Position: (${position.x}, ${position.y}, ${position.z})`
          );
        });
      });

      return NewHowl;
    }
  }
};

export default createHowlInstance;
