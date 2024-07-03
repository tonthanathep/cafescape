import usePlayerStore from "@/app/data/store/PlayerStore";

const getHowlInstance = (
  type: "cafe" | "ambi",
  id: number
): Howl | undefined => {
  const { currentCafeHowl, currentAmbiHowl } = usePlayerStore();
  const howlArray = type === "cafe" ? currentCafeHowl : currentAmbiHowl;
  return howlArray.find((howl) => howl.id === id)?.howl;
};

export default getHowlInstance;
