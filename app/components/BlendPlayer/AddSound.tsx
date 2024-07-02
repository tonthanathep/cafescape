"use client";
import React from "react";
import usePlayerStore from "@/app/player/store";
import soundSources from "../../data/soundSources";

interface Props {
  layerType: "ambi" | "cafe";
}

const AddSound = ({ layerType }: Props) => {
  const { currentBlend, addLayer } = usePlayerStore();

  const availableOptions = () => {
    if (layerType === "cafe") {
      const existingIds = currentBlend.cafeLayers.map((sound) => sound.id);
      const existingIdsSet = new Set(existingIds);

      const availableOptions = soundSources
        .filter(
          (sound) => sound.soundType === "cafe" && !existingIdsSet.has(sound.id)
        )
        .map((sound) => sound.id);

      return {
        availableOptions,
        existingSounds: existingIds,
      };
    } else {
      const existingIds = currentBlend.ambiLayers.map((sound) => sound.id);
      const existingIdsSet = new Set(existingIds);

      const availableOptions = soundSources
        .filter(
          (sound) =>
            (sound.soundType === "static" || sound.soundType === "nature") &&
            !existingIdsSet.has(sound.id)
        )
        .map((sound) => sound.id);

      return {
        availableOptions,
        existingSounds: existingIds,
      };
    }
  };

  const options = availableOptions();

  return (
    <div className='dropdown dropdown-end'>
      {options.existingSounds.length === 3 ? (
        <div
          tabIndex={0}
          role='button'
          className='btn btn-outline btn-disabled btn-sm mb-1 rounded-3xl'
        >
          + Add Sound ({options.existingSounds.length}/3)
        </div>
      ) : (
        <div
          tabIndex={0}
          role='button'
          className='btn btn-outline btn-primary btn-sm mb-1 rounded-3xl'
        >
          + Add Sound ({options.existingSounds.length}/3)
        </div>
      )}
      <div className=' dropdown-content rounded-2xl z-[1]'>
        {soundSources.map((option) =>
          options.availableOptions.includes(option.id) ? (
            <div
              key={option.id}
              tabIndex={option.id}
              className='mt-2 join-item cursor-pointer card bg-white w-[20rem] p-5 drop-shadow-md hover:-translate-x-2 hover:bg-slate-100 transition-all'
              onClick={() => {
                addLayer(layerType, option);

                console.log("Added!");
              }}
            >
              <h1 className='text-md font-medium text-slate-500'>
                {option.name}
                {/* {option.isOutside ? (
                  <div
                    className='tooltip'
                    data-tip='This sounds will be played from fixed location occasionally to simulate the real cafe enviornments'
                  >
                    <div className='badge badge-success ml-2'>Object</div>
                  </div>
                ) : (
                  <div
                    className='tooltip'
                    data-tip='This sounds will be played from fixed location occasionally to simulate the real cafe enviornments'
                  >
                    <div className='badge badge-primary ml-2'>Ambience</div>
                  </div>
                )} */}
              </h1>
              <p className='text-sm font-light'>{option.desc}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default AddSound;
