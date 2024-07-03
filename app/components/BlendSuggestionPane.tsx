import React from "react";
import { createClient } from "../utils/supabase/server";
import BlendCard from "./BlendCard/BlendCard";

interface Props {
  type: "self" | "suggest" | "discover";
}

const BlendSuggestionPane = async ({ type }: Props) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const title =
    type === "self"
      ? "Your Own Blend"
      : type === "discover"
      ? "Suggested Blend"
      : type === "suggest"
      ? "Blend Suggestion"
      : null;

  const { data } =
    type === "self"
      ? await supabase
          .from("blends")
          .select("id, name, cafeLayers, ambiLayers")
          .eq("owner", user!.id)
      : type === "discover"
      ? await supabase
          .from("random_blends")
          .select("id, name, cafeLayers, ambiLayers")
          .limit(3)
      : type === "suggest"
      ? await supabase.from("blends").select("id, name, cafeLayers, ambiLayers")
      : null;

  console.log("data: ", data);

  return (
    <div>
      <div className='backdrop-blur-2xl bg-white/30 drop-shadow-lg p-5 rounded-xl mt-5 '>
        <p className='text-m font-regular text-white mt-2 opacity-60'>
          suggestion
        </p>
        <p className='text-2xl font-medium text-white mb-4'>{title}</p>
        <div className=''>
          <span className='inline-grid grid-cols-4 gap-4'>
            {data.map((list: any) => {
              const isCafe = list.cafeLayers.length > 0;
              const isNoise = list.ambiLayers.some(
                (sound: any) => sound.soundType === "static"
              );
              const isNature = list.ambiLayers.some(
                (sound: any) => sound.soundType === "nature"
              );
              return (
                <BlendCard
                  name={list.name}
                  id={list.id}
                  layerType={{ isCafe, isNoise, isNature }}
                />
              );
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlendSuggestionPane;
