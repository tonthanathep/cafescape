// "use client";

// import React from "react";
// import createHowlInstance from "../utils/createHowlInstance";
// import { soundSources } from "../player/playerType";
// import usePlayerStore from "../player/store";
// import { Howl, Howler } from "howler";

// const testLayer: soundSources = {
//   id: 1,
//   name: "rain",
//   desc: "just a rain",
//   path: "/sounds/rain.mp3",
//   isOutside: true,
//   renderType: "static",
//   soundType: "static",
// };

// const page = () => {
//   const state = usePlayerStore();

//   //   const testHowl = createHowlInstance(testLayer, state);

//   const stopAndUnloadHowls = (howlInstances: { id: number; howl: Howl }[]) => {
//     howlInstances.forEach(({ howl }) => {
//       howl.stop();
//       howl.unload();
//     });
//   };

//   stopAndUnloadHowls(state.currentCafeHowl);
//   stopAndUnloadHowls(state.currentAmbiHowl);

//   Howler.pos(0, 0, 0);

//   const rain = new Howl({
//     src: ["/sounds/rain.mp3"],
//     autoplay: true,
//     loop: true,
//     volume: 0.5,
//     onplay: function () {
//       console.log("rain: played");
//     },
//     onstop: function () {
//       console.log("rain: stopped");
//     },
//   });

//   return (
//     <div className='p-[20rem]'>
//       <div
//         className='btn btn-primary'
//         onClick={() => {
//           rain.pause();
//         }}
//       >
//         Play
//       </div>
//     </div>
//   );
// };

// export default page;
