import { createClient } from "../utils/supabase/server";
import NewBlendButton from "./NewBlendButton";

var user = {
  name: "Anthony",
};

const today = new Date();

const GreetingHero = async () => {
  const supabase = createClient();
  await supabase.auth.getUser().then(async (data) => {
    await supabase
      .from("profiles")
      .select("nick_name")
      .eq("id", data.data.user?.id)
      .then((data: any) => {
        user.name = data.data[0].nick_name;
      });
  });

  return (
    <div className='mt-[12rem] flex flex-row items-end justify-between'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-xl text-white/70 font-light'>
          {" "}
          {today.toLocaleString("default", {
            month: "long",
          })}{" "}
          {today.getDate()}{" "}
        </h1>
        <h1 className='text-3xl text-white font-semibold'>
          Let's get back to work, {user.name}
        </h1>
      </div>
      <div>
        <NewBlendButton btnTitle='+ Create' title='Create New Blend' />
      </div>
    </div>
  );
};

export default GreetingHero;
