import React from "react";
import usePlayerStore from "../../player/store";

const BlendDataDebugger = () => {
  const { currentBlend, currentCanvas } = usePlayerStore();

  return (
    <div className='card p-5 bg-white flex flex-col gap-1 mt-4'>
      <p className='text-lg font-semibold'>
        {" "}
        {currentBlend.name} ({currentBlend.id})
      </p>
      <p> Created on {currentBlend.created_at}</p>
      <div className='divider divider-info divider-start'>
        Listener (Howler)
      </div>
      <p>
        x: {currentBlend.listenerPos.x} %, y: {currentBlend.listenerPos.y} %
      </p>
      <div className='divider divider-info divider-start'>Cafe Layers</div>
      {Object.entries(currentBlend.cafeLayers).map(([key, layers]) => (
        <div key={key}>
          <p className='text-sm'>
            {layers.id}: {layers.name} at {layers.pos.x}, {layers.pos.y} (
            {layers.vol})
          </p>
          <p className='text-xs'>({layers.path})</p>
        </div>
      ))}
      <div className='divider divider-info divider-start'>Ambi Layers</div>
      {Object.entries(currentBlend.ambiLayers).map(([key, layers]) => (
        <div key={key}>
          <p className='text-sm'>
            {layers.id}: {layers.name} at {layers.pos.x}, {layers.pos.y} (
            {layers.vol})
          </p>
          <p className='text-xs'>({layers.path})</p>
        </div>
      ))}
      <div className='divider'></div>
      <div className='w-fit opacity-50 select-none'>
        <p className='text-[0.8rem] font-light opacity-55'>Debugging Windows</p>
        <p className='text-sm'>
          Current Position: x: {currentCanvas.canvasListener.x}, y:{" "}
          {currentCanvas.canvasListener.y}
        </p>
        <p className='text-sm'>
          Size W: {currentCanvas.canvasWidth}, H: {currentCanvas.canvasHeight}
        </p>
      </div>
    </div>
  );
};

export default BlendDataDebugger;
