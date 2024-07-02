import React, { RefObject, useEffect } from "react";
import { Howl } from "howler";
import usePlayerStore from "@/app/player/store";
import getHowlInstance from "../../../utils/getHowlInstance";

interface Props {
  id: number;
  name: string;
}

const AmbiSoundNode = ({ id, name }: Props) => {
  const { currentCanvas, deleteLayer, setVolume } = usePlayerStore();

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
    <div className='flex flex-col h-28 p-2 rounded-xl shadow-x justify-between bg-white transition-all hover:-translate-y-2 hover:drop-shadow-lg duration-200'>
      <h1 className='text-sm font-medium'> {name} </h1>
      <div className=''>
        <input
          type='range'
          min={0}
          max='100'
          className='range range-xs range-success'
          onChange={handleVolumeChange}
        />
      </div>
      <div className='flex flex-row'>
        <button className='btn btn-success btn-sm' onClick={handleSoundPlay}>
          Play
        </button>
        <button className='btn btn-success btn-sm' onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default AmbiSoundNode;
