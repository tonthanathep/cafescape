import BlendCard from "./BlendCard/BlendCard";
import { createClient } from "../utils/supabase/server";

const BlendList = async () => {
  const supabase = createClient();

  const { data } = await supabase.from("blends").select("id, name, layerType");

  return (
    <span className='inline-grid grid-cols-4 gap-4'>
      {data.map(
        (list: {
          id: number;
          name: string;
          layerType: { isCafe: boolean; isNoise: boolean };
        }) => (
          <BlendCard name={list.name} id={list.id} layerType={list.layerType} />
        )
      )}
    </span>
  );
};

export default BlendList;
