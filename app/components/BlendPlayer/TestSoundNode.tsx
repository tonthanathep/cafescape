import React from "react";

const TestSoundNode = () => {
  const TestNode = new Howl({
    src: "/sounds/rain.mp3",
    onpause: function () {
      console.log("first");
    },
  });

  TestNode.pos(0, 50, 0);
  TestNode.pannerAttr({
    distanceModel: "inverse",
  });

  return (
    <div className='card w-[20rem] h-[20rem] bg-white p-5 gap-5 flex flex-col'>
      <div className='btn btn-primary' onClick={() => TestNode.play()}>
        Play
      </div>
      <div className='btn btn-primary' onClick={() => TestNode.pause()}>
        Pause
      </div>
      <div className='btn btn-primary' onClick={() => TestNode.stop()}>
        Stop
      </div>
    </div>
  );
};

export default TestSoundNode;
