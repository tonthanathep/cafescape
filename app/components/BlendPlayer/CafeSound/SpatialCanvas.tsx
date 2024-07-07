import usePlayerStore from "@/app/data/store/PlayerStore";
import { motion } from "framer-motion";
import { Howler } from "howler"; // Ensure Howler is imported
import Image from "next/image";
import { useEffect, useState } from "react";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import useMeasure from "react-use-measure";

const SpatialCanvas = () => {
  const { currentBlend, currentCanvas, setListenerPos, setCanvas } =
    usePlayerStore();

  // Getting size of the elements on screen
  const [refCanvas, boundsCanvas] = useMeasure({ scroll: true });
  const [refListener, boundsListener] = useMeasure({ scroll: true });
  const [listenerPosition, setListenerPosition] = useState({
    x: currentCanvas.canvasListener.x,
    y: currentCanvas.canvasListener.z,
  });
  const backgroundImageUrl = "/images/cafe.png";

  useEffect(() => {
    setCanvas(
      boundsCanvas.height,
      boundsCanvas.width,
      boundsListener.height,
      boundsListener.width
    );
  }, [
    boundsCanvas.height,
    boundsCanvas.width,
    boundsListener.height,
    boundsListener.width,
  ]);

  useEffect(() => {
    setListenerPosition({
      x: currentCanvas.canvasListener.x,
      y: currentCanvas.canvasListener.z,
    });
  }, [
    currentCanvas.canvasListener.x,
    currentCanvas.canvasListener.z,
    setCanvas,
  ]);

  const handleDrag = (e: DraggableEvent, data: DraggableData) => {
    setListenerPos(data.x, data.y);
    setListenerPosition({ x: data.x, y: data.y });
    Howler.pos(data.x, 0, data.y);
  };

  const fadeInVariants = {
    hidden: { opacity: 0, scale: 1, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <div className='flex justify-center'>
      <div
        ref={refCanvas}
        className='relative w-full justify-center max-w-[55rem] aspect-[469/360] rounded-2xl'
      >
        <div className='fixed'>
          <Image
            src={backgroundImageUrl}
            alt='Cover Image'
            objectFit='cover'
            className='-z-10'
            width={boundsCanvas.width}
            height={boundsCanvas.height}
          />
        </div>
        <Draggable
          bounds='parent'
          onDrag={handleDrag}
          position={listenerPosition}
        >
          <div
            ref={refListener}
            className='z-10 w-8 h-8 rounded-full drop-shadow-[0_14px_5px_rgba(0,0,0,0.35)] bg-white outline outline-0 hover:-translate-y-2 hover:drop-shadow-[0_30px_10px_rgba(0,0,0,0.25)] hover:outline-cyan-60/40 transition-all duration-400 ease-out'
          ></div>
        </Draggable>

        {currentCanvas.canvasCafe.map((layer) => (
          <motion.div
            initial='hidden'
            animate='visible'
            variants={fadeInVariants}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            key={layer.name}
          >
            <Draggable
              bounds='parent'
              disabled
              position={{ x: layer.x, y: layer.z }}
            >
              <div className='z-10 w-fit p-2 pl-4 pr-4 bg-white/70 backdrop-blur-sm rounded-full drop-shadow-[0_14px_5px_rgba(0,0,0,0.60)] hover:-translate-y-2 hover:drop-shadow-[0_30px_10px_rgba(0,0,0,0.25)] transition-all duration-400'>
                <p className='text-sm font-semibold text-black/80'>
                  {layer.name}
                </p>
              </div>
            </Draggable>
          </motion.div>
        ))}
      </div>

      {/* <div className='pt-5 pl-3 w-fit opacity-50 select-none'>
    <p className='text-[0.8rem] font-light opacity-55'>Debugging Windows</p>
    <p>
      Current Position: x: {currentCanvas.canvasListener.x}, z:{" "}
      {currentCanvas.canvasListener.z}
    </p>
    <p>
      Relative Position: x:{" "}
      {currentCanvas.canvasListener.x + boundsListener.width / 2}, z:{" "}
      {currentCanvas.canvasListener.z + boundsListener.height / 2}
    </p>
    <p>
      Relative to True Scale Percentage x:
      {Math.round(
        ((currentCanvas.canvasListener.x + boundsListener.width / 2) /
          boundsCanvas.width) *
          100
      )}
      %, y:
      {Math.round(
        ((currentCanvas.canvasListener.z + boundsListener.height / 2) /
          boundsCanvas.height) *
          100
      )}
      %
    </p>
    <p>
      Size W: {boundsCanvas.width}, H: {boundsCanvas.height}
    </p>
  </div> */}
    </div>
  );
};

export default SpatialCanvas;
