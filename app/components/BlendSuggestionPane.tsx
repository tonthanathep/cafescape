"use client";
import { useEffect, useState } from "react";
import useUserStore from "../data/store/UserStore";
import { createClient } from "../utils/supabase/client";
import BlendCard from "./BlendCard/BlendCard";

interface Props {
  type: "self" | "preferences" | "discover";
  delay: number;
}

const BlendSuggestionPane = ({ type, delay }: Props) => {
  const { currentUser } = useUserStore();
  const [userId, setUserId] = useState(currentUser.id);
  const [isRender, setIsRender] = useState(false);
  const [blendList, setBlendList] = useState([]);
  const preferenceOption = "study";
  const preferenceURL =
    preferenceOption === "study"
      ? "study_blends"
      : preferenceOption === "work"
      ? "work_blends"
      : preferenceOption === "relax"
      ? "relax_blends"
      : preferenceOption === "sleep"
      ? "sleep_blends"
      : null;

  const supabase = createClient();

  const title =
    type === "self"
      ? "Back to your own blends"
      : type === "discover"
      ? "Blend from others"
      : type === "preferences"
      ? "Based from your preferences"
      : null;

  const subTitle =
    type === "self"
      ? "Your Own Blend"
      : type === "discover"
      ? "Discover New Blend"
      : type === "preferences"
      ? "Based on your preferences"
      : null;

  useEffect(() => {
    const fetchBlendList = async () => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      switch (type) {
        case "self": {
          console.log(`Fetching ${type} blends...`);
          console.log("user id", userId);
          const { data } = await supabase
            .from("blends")
            .select("id, name, cafeLayers, ambiLayers, category")
            .eq("owner", userId);
          console.log(`Fetched ${type} blends:`, data);
          setBlendList(data);
          break;
        }

        case "discover": {
          console.log(`Fetching ${type} blends...`);
          const { data } = await supabase
            .from("random_blends")
            .select("id, name, cafeLayers, ambiLayers, category");
          console.log(`Fetched ${type} blends:`, data);
          setBlendList(data);
          break;
        }
        case "preferences": {
          console.log(`Fetching ${type} blends...`);
          const { data } = await supabase
            .from(preferenceURL as string)
            .select("id, name, cafeLayers, ambiLayers, category");
          console.log(`Fetched ${type} blends:`, data);
          setBlendList(data);
          break;
        }
      }
    };
    fetchBlendList();
  }, [userId]);

  useEffect(() => {
    if (currentUser.id !== userId) {
      setUserId(currentUser.id);
      console.log("set id", currentUser.id);
    }
  }, [currentUser]);

  return (
    <div>
      <div className='backdrop-blur-2xl bg-white/30 drop-shadow-lg p-5 rounded-xl mt-5 '>
        <p className='text-m font-light text-white mt-1 opacity-60'>
          {subTitle}
        </p>
        <p className='text-2xl font-medium text-white mb-4'>{title}</p>
        <div className=''>
          <span className='w-full inline-grid grid-cols-6 gap-4'>
            {blendList === null || blendList.length === 0
              ? Array.from({ length: 5 }, (_, i) => (
                  <BlendCard
                    name='isloading'
                    id={i}
                    layerType={{ isCafe: true, isNoise: true, isNature: true }}
                    blendType='study'
                  />
                ))
              : blendList.map((list: any) => {
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
                      blendType={list.category}
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
