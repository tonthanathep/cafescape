

const cafeSoundSources = [
  // id: id for sounds in cafe soundscape
  // name: name for the sounds
  // desc: description to show in the dropdown menu
  // path: path for the sound file to pass to node
  // isObject: to show badge for tooltips
  // pos: position of the sound in percentage for x and y

  {
    id: 0,
    name: "People Chatting",
    desc: "Sounds of people chatting and discussing their daily lives",
    path: "/sounds/rain.mp3",
    isObject: false,
    pos: { x: 3, y: 3 },
  },
  {
    id: 1,
    name: "Coffee Machine",
    desc: "Whirring and griding, the sounds of hard-working coffee machine never stops",
    path: "/sounds/machine1.mp3",
    isObject: true,
    pos: { x: 35, y: 40 },
  },
  {
    id: 2,
    name: "Door Opening",
    desc: "Because the cafe never stops, new folks are always passing by this lovely shop",
    path: "/sounds/door.mp3",
    isObject: true,
    pos: { x: 65, y: 30 },
  },
];

export default cafeSoundSources;
