import usePlayerStore from "@/app/data/store/PlayerStore";
import React from "react";
import getHowlInstance from "../../../utils/getHowlInstance";

interface Props {
  id: number;
  name: string;
  type: string;
}

const AmbiSoundNode = ({ id, name, type }: Props) => {
  const { deleteLayer, setVolume } = usePlayerStore();

  const howlInstance = getHowlInstance("ambi", id);

  const handleSoundPlay = () => {
    if (howlInstance) {
      howlInstance.play();
    } else {
      console.error(`Howl instance with id ${id} not found`);
    }
  };

  const handleRemove = () => {
    deleteLayer("ambi", id);
    console.log(id);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(event.target.value) / 100;
    setVolume("ambi", id, volume);
  };

  // Render Sound Node Card
  return (
    <div className='flex flex-col h-32 p-3 pt-2 pb-2 rounded-xl shadow-x justify-between bg-white transition-all hover:-translate-y-2 hover:drop-shadow-lg duration-200'>
      <div className='w-full justify-between flex flex-row items-center'>
        <p className='text-xs font-light text-black/70'>no.{id}</p>
        <button
          className='btn btn-xs btn-circle btn-ghost'
          onClick={handleRemove}
        >
          ✕
        </button>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-lg font-semibold leading-6 '> {name} </h1>
        <p className='text-xs font-light text-black/40'> {type} </p>
      </div>
      <div className=''>
        <input
          type='range'
          min={0}
          max='100'
          defaultValue={howlInstance!.volume() * 100}
          className='range range-xs range-success '
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default AmbiSoundNode;
