export interface soundSourcesType {
  /* 
 @param id: running id for the sound 
  @param name: name of the sound
  @param desc: description of the sound
  @param path: path of the sound file
  @param isOutside: apply lowpass filter if true
  @param renderType: type of sound to render -> affects type of sounds
  @param soundType: type of sound in categories
  @param pos: position of the sound in the canvas in percentage
  @param orientation: orientation of the sound in the canvas
  @param pannerAttr: panner attributes for the sound
*/

  id: number;
  name: string;
  desc: string;
  path: string;
  isOutside: boolean;
  renderType: "cafe" | "static" | "ambience" | "cluster";
  soundType: "cafe" | "static" | "nature";
  vol: number;
  pos: { x: number; y: number; z: number };
  orientation: [x: number, y: number, z: number];
  pannerAttr: {};
}

const SoundSources: soundSourcesType[] = [
  {
    id: 1,
    name: "Soft Rain",
    desc: "Sounds of people chatting and discussing their daily lives",
    path: "/sounds/rain.mp3",
    isOutside: true,
    renderType: "cluster",
    soundType: "nature",
    vol: 1.0,
    pos: { x: 0, y: 30, z: 0 },
    orientation: [0, -1, 0],
    pannerAttr: {},
  },
  {
    id: 2,
    name: "Coffee Machine",
    desc: "Sound of Coffee Machine in operation",
    path: "/sounds/machine1.mp3",
    isOutside: false,
    renderType: "cafe",
    soundType: "cafe",
    vol: 1.0,
    pos: { x: 10, y: 0, z: 20 },
    orientation: [0, 0, 0],
    pannerAttr: {},
  },
  {
    id: 3,
    name: "Something Nice",
    desc: "Sound of Coffee Machine in operation",
    path: "/sounds/machine1.mp3",
    isOutside: false,
    renderType: "cafe",
    soundType: "cafe",
    vol: 1.0,
    pos: { x: 10, y: 0, z: 20 },
    orientation: [0, 0, 0],
    pannerAttr: {},
  },
  {
    id: 4,
    name: "Something Nice",
    desc: "Sound of Coffee Machine in operation",
    path: "/sounds/machine1.mp3",
    isOutside: false,
    renderType: "cafe",
    soundType: "static",
    vol: 1.0,
    pos: { x: 10, y: 0, z: 20 },
    orientation: [0, 0, 0],
    pannerAttr: {},
  },
];

export default SoundSources;
