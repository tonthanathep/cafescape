import React, { useEffect } from "react";
import usePlayerStore from "@/app/player/store";
import getHowlInstance from "../../../utils/getHowlInstance";
import { motion } from "framer-motion";

interface Props {
  id: number;
  name: string;
}

const fadeInVariants = {
  hidden: { opacity: 0, scale: 1, x: 30 },
  visible: { opacity: 1, scale: 1, x: 0 },
};

const CafeSoundNode = ({ id, name }: Props) => {
  const { deleteLayer, setVolume } = usePlayerStore();

  // Find the correct Howl instance by id
  const howlInstance = getHowlInstance("cafe", id);

  const handleSoundPlay = () => {
    if (howlInstance) {
      howlInstance.play();
    } else {
      console.error(`Howl instance with id ${id} not found`);
    }
  };

  const handleRemove = () => {
    deleteLayer("cafe", id);
    console.log(id);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(event.target.value) / 100;
    setVolume("cafe", id, volume);
  };

  // Render Sound Node Card
  return (
    <motion.div
      className='flex flex-col h-28 p-2 rounded-xl shadow-x justify-between bg-white transition-all hover:-translate-y-2 hover:drop-shadow-lg duration-200'
      initial='hidden'
      animate='visible'
      variants={fadeInVariants}
      transition={{ duration: 0 }}
    >
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
    </motion.div>
  );
};

export default CafeSoundNode;
