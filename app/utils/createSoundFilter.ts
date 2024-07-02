import { Howl } from "howler";

export const createLowPass = (howl: any) => {
  (howl as any)._sounds.forEach((sound: any) => {
    const context = sound._node.context;
    const source = sound._node;

    if (context && source) {
      // Create a BiquadFilterNode
      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1000, context.currentTime); // Adjust frequency for "muddy" effect

      // Connect the source to the filter, then connect the filter to the destination
      source.disconnect();
      source.connect(filter);
      filter.connect(context.destination);

      console.log(`Low-pass filter applied to sound with id: ${sound._id}`);
    }
  });
};

export const createReverb = async (howl: any) => {
  const sound = howl._sounds[0];
  if (!sound || !sound._node) {
    console.error("No sound node found in the Howl instance.");
    return null;
  }

  const context = sound._node.context;
  const source = sound._node;

  const convolver = context.createConvolver();

  try {
    const response = await fetch(howl._src[0]);
    const data = await response.arrayBuffer();
    const buffer = await context.decodeAudioData(data);
    convolver.buffer = buffer;

    source.disconnect();
    source.connect(convolver);
    convolver.connect(context.destination);
  } catch (err) {
    console.error("Error loading impulse response:", err);
    return null;
  }

  return convolver;
};

export default { createLowPass, createReverb };
