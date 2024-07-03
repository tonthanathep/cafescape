import usePlayerStore from "@/app/data/store/PlayerStore";
import AddSound from "../AddSound";
import AmbiSoundNode from "./AmbiSoundNode";

const AmbiSoundPanel = () => {
  const { currentBlend } = usePlayerStore();

  return (
    <div className='card w-full bg-white p-4 shadow-sm'>
      <div className='flex flex-row items-center justify-between'>
        <h1 className='text-s font-light'>Ambience</h1>

        <AddSound layerType='ambi' />
      </div>

      <div className='flex flex-col bg-slate-300/20 rounded-2xl pt-3 pl-2 pr-2 pb-3 gap-3 w-full'>
        {currentBlend.ambiLayers.map((list) => (
          <AmbiSoundNode id={list.id} name={list.name} />
        ))}
      </div>
    </div>
  );
};

export default AmbiSoundPanel;
