import usePlayerStore from "@/app/data/store/PlayerStore";
import { useRef } from "react";
import AddSound from "../AddSound";
import CafeSoundNode from "./CafeSoundNode";
import SpatialCanvas from "./SpatialCanvas";

const CafeSoundPanel = () => {
  // Reducer for managing sounds layers
  const { currentBlend, currentCafeHowl } = usePlayerStore();

  // Reference for Howls State
  const howlsCafeRef = useRef({});

  const excludeIds = Object.entries(currentBlend.cafeLayers).map(
    ([key, list]) => list.id
  );

  return (
    <div className='card w-full bg-white p-5 shadow-sm'>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-row justify-between'>
          <h1 className='text-m font-light'>Elements</h1>
          <AddSound layerType='cafe' />
        </div>
        <div className='flex flex-col p-2 gap-y-1 bg-slate-300/20 rounded-2xl outline-1'>
          {excludeIds.length === 0 ? (
            <div className='w-full h-28 content-center'>
              <h1 className='font-light text-sm text-black/20'>
                {" "}
                Press "+ Add Sound" to start
              </h1>
            </div>
          ) : null}
          <div className='grid grid-cols-4 gap-x-3 rounded-2xl outline-1'>
            {currentBlend.cafeLayers.map((list) => (
              <CafeSoundNode id={list.id} name={list.name} />
            ))}
          </div>
        </div>
        <div className='divider divider-start'>
          <p className='text-l font-light text-slate-300'>Cafe Canvas</p>
        </div>
        <div className='z-1'>
          <SpatialCanvas />
        </div>
      </div>
    </div>
  );
};

export default CafeSoundPanel;
