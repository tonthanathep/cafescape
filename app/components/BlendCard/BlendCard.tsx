"use client";
import Link from "next/link";
import Cup from "../icons/Cup";
import Leaf from "../icons/Leaf";
import Static from "../icons/Static";

interface Props {
  name: string;
  id: number;
  layerType: { isCafe: boolean; isNoise: boolean; isNature: boolean };
  blendType: "study" | "work" | "relax" | "sleep";
}

const BlendCard = ({ name, id, layerType, blendType }: Props) => {
  return (
    <div className='relative group'>
      {name === "isloading" ? (
        <div className='skeleton h-full aspect-square'></div>
      ) : (
        <div
          className='relative transform transition-all shadow-lg duration-500 group-hover:shadow-2xl group-hover:scale-105'
          key={id}
        >
          <div className='flex flex-col rounded-xl bg-white text-gray-800 pt-5 pb-1 pl-3 pr-3 aspect-square'>
            <div className='flex space-x-2 opacity-70'>
              {layerType.isCafe && (
                <span>
                  <Cup />{" "}
                </span>
              )}
              {layerType.isNoise && (
                <span>
                  <Static />{" "}
                </span>
              )}
              {layerType.isNature && (
                <span>
                  <Leaf />{" "}
                </span>
              )}
            </div>
            <div className='flex-grow'></div>
            <div className='relative z-1'>
              <div className='flex flex-row'>
                <p className='font-light text-xs leading-6 transition-all duration-500 text-black group-hover:-translate-y-7 group-hover:opacity-0'>
                  {blendType}
                </p>
              </div>

              <p className='font-bold text-xl leading-6 transition-all duration-500 text-black group-hover:-translate-y-7'>
                {name}
              </p>
            </div>
            <div className='relative mt-2'>
              <Link href={`/player/${id}`}>
                <button className='transition-y-1 absolute bottom-2 btn btn-xs w-full opacity-0 transition-all duration-500 group-hover:opacity-100 '>
                  Enter
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlendCard;
