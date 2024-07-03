"use client";
import { Inconsolata } from "@next/font/google";
import { BlendType } from "../data/type/playerType";

const inconsolata = Inconsolata({
  subsets: ["latin"],
});

interface Props {
  blendData: BlendType;
  sessionTime: number;
}

const CafeReceipt = ({ blendData, sessionTime }: Props) => {
  // Custom CSS styles
  const jaggedStyles = {
    receiptContainer: {
      position: "relative" as "relative",
      overflow: "hidden",
    },
    jagged: {
      content: '""',
      display: "block",
      width: "100%",
      height: "10px",
      background:
        "linear-gradient(135deg, transparent 25%, #ffffff 25%, #ffffff 50%, transparent 50%, transparent 75%, #ffffff 75%, #ffffff)",
      backgroundSize: "10px 10px",
    },
    jaggedTop: {
      position: "absolute" as "absolute",
      top: 0,
      left: 0,
    },
    jaggedBottom: {
      position: "absolute" as "absolute",
      bottom: 0,
      left: 0,
    },
  };

  return (
    <div
      style={jaggedStyles.receiptContainer}
      className={`${inconsolata.className} flex flex-col drop-shadow-md rotate-3 bg-slate-50 h-fit min-w-[15rem] p-3 pt-5 pb-5 rounded-sm justify-between gap-2`}
    >
      <div style={{ ...jaggedStyles.jagged, ...jaggedStyles.jaggedTop }}></div>
      <div className='flex flex-col items-center -space-y-1'>
        <h1 className='text-xl font-extrabold text-black'>
          {" "}
          {blendData.name}{" "}
        </h1>
        <p className='text-sm font-light text-black/50'>welcome to your cafe</p>
      </div>
      <div className='flex flex-row justify-between'>
        <p className='text-sm font-light text-black/50'>
          Customer: {"patrick"}
        </p>
        <p className='text-sm font-light text-black/50'>Customer</p>
      </div>
      <div className='w-full border-t-[1px] border-b-[1px] border-dashed border-gray-400 flex flex-col'>
        {blendData.cafeLayers.length > 0 && (
          <div className='border-b-[1px] border-dotted border-gray-400 mt-2'>
            <p className='text-sm font-light opacity-40'>Cafe elements:</p>
          </div>
        )}
        {blendData.cafeLayers.map((layer, index) => (
          <p className='text-sm' key={index}>
            {layer.name}
          </p>
        ))}
        {blendData.ambiLayers.length > 0 && (
          <div className='border-b-[1px] border-dotted border-gray-400 mt-2'>
            <p className='text-sm font-light opacity-40'>Ambience elements:</p>
          </div>
        )}
        {blendData.ambiLayers.map((layer, index) => (
          <p className='text-sm' key={index}>
            {layer.name}
          </p>
        ))}
      </div>
      <div className='flex flex-row justify-between'>
        <p className='text-sm font-light text-black/50'>Session Time</p>
        <p className='text-sm font-bold text-black/50'>12 mins</p>
      </div>
      <div
        style={{ ...jaggedStyles.jagged, ...jaggedStyles.jaggedBottom }}
      ></div>
    </div>
  );
};

export default CafeReceipt;
