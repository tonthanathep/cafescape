import React from "react";
import BlendList from "./BlendList";

interface SuggestType {
  title: string;
}

const SuggestionCard = ({ title }: SuggestType) => {
  return (
    <div>
      <div className='backdrop-blur-2xl bg-white/30 drop-shadow-lg p-5 rounded-xl mt-5 '>
        <p className='text-m font-regular text-white mt-2 opacity-60'>
          suggestion
        </p>
        <p className='text-2xl font-medium text-white mb-4'>{title}</p>
        <div className=''>
          <BlendList />
        </div>
      </div>
    </div>
  );
};

export default SuggestionCard;
