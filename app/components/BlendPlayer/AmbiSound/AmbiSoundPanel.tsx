import usePlayerStore from "@/app/data/store/PlayerStore";
import AddSound from "../AddSound";
import AmbiSoundNode from "./AmbiSoundNode";

const AmbiSoundPanel = () => {
  const { currentBlend } = usePlayerStore();

  return (
    <div className='w-full'>
      <div className='flex flex-row items-center gap-5 justify-between pb-1'>
        <h1 className='text-xl font-bold'>Ambience</h1>
        <AddSound layerType='ambi' />
      </div>

      <div className='flex flex-col gap-3 w-full mt-1'>
        {currentBlend.ambiLayers.map((list) => (
          <AmbiSoundNode id={list.id} name={list.name} type={list.soundType} />
        ))}
      </div>
    </div>
  );
};

export default AmbiSoundPanel;
