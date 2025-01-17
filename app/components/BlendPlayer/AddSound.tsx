"use client";
import soundSources from "@/app/data/sources/soundSources";
import usePlayerStore from "@/app/data/store/PlayerStore";

interface Props {
  layerType: "ambi" | "cafe";
}

const AddSound = ({ layerType }: Props) => {
  const { currentBlend, addLayer } = usePlayerStore();

  const limit = layerType === "cafe" ? 4 : 3;

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
    <div
      className={`dropdown dropdown-end ${
        layerType === "cafe" ? "dropdown-top" : "dropdown-bottom"
      }`}
    >
      {options.existingSounds.length === limit ? (
        <div
          tabIndex={0}
          role='button'
          className='btn btn-outline btn-disabled btn-sm mb-1 rounded-3xl'
        >
          {layerType === "cafe" ? "+ Add Sound" : "+"} (
          {options.existingSounds.length}/{limit})
        </div>
      ) : (
        <div
          tabIndex={0}
          role='button'
          className='btn btn-outline btn-primary btn-sm mb-1 rounded-3xl'
        >
          {layerType === "cafe" ? "+ Add Sound" : "+"} (
          {options.existingSounds.length}/{limit})
        </div>
      )}
      <div className='join join-vertical dropdown-content rounded-2xl z-[1]'>
        {layerType === "cafe" && (
          <div className='join-item bg-white pl-5 pt-5 pb-3 card drop-shadow-md'>
            <h1 className='text-sm font-semibold'>Cafe Sounds</h1>
            <h1 className='text-xs font-light'>Adding more comfy vibes</h1>
          </div>
        )}
        {layerType !== "cafe" && (
          <div className='join-item bg-white pl-5 pt-5 pb-3 card drop-shadow-md'>
            <h1 className='text-sm font-semibold'>Ambience Sounds</h1>
            <h1 className='text-xs font-light'>Adding more comfy vibes</h1>
          </div>
        )}
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
                {option.soundType === "static" ? (
                  <div
                    className='tooltip'
                    data-tip='This sounds will be played from fixed location occasionally to simulate the real cafe enviornments'
                  >
                    <div className='badge badge-success ml-2'>Static</div>
                  </div>
                ) : option.soundType === "nature" ? (
                  <div
                    className='tooltip'
                    data-tip='This sounds will be played from fixed location occasionally to simulate the real cafe enviornments'
                  >
                    <div className='badge badge-primary ml-2'>Nature</div>
                  </div>
                ) : null}
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
