import usePlayerStore from "@/app/data/store/PlayerStore";
import AddSound from "../AddSound";
import CafeSoundNode from "./CafeSoundNode";

const CafeSoundPanel = () => {
  // Reducer for managing sounds layers
  const { currentBlend } = usePlayerStore();
  const excludeIds = Object.entries(currentBlend.cafeLayers).map(
    ([key, list]) => list.id
  );

  return (
    <div>
      <div className='flex flex-row items-center justify-between pl-4 pr-4 pb-1'>
        <h1 className='text-xl font-bold'>Cafe</h1>
        <AddSound layerType='cafe' />
      </div>
      <div className='card w-full p-3 bg-white/45 backdrop-blur-md shadow-sm'>
        <div className='flex flex-col gap-2'>
          {excludeIds.length === 0 ? (
            <div className='w-[40rem] flex content-center justify-center'>
              <h1 className='font-light h-[5rem] text-sm mt-16 text-black/20'>
                Press "+ Add Sound" to start
              </h1>
            </div>
          ) : null}
          <div className='w-[40rem] grid grid-cols-4 gap-x-3'>
            {currentBlend.cafeLayers.map((list) => (
              <CafeSoundNode id={list.id} name={list.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeSoundPanel;
