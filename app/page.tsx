import { getBackgroundImageUrl } from "./utils/getBackgroundImage";
import Image from "next/image";
import GreetingHero from "./components/GreetingHero";
import { createClient } from "./utils/supabase/server";
import { redirect } from "next/navigation";
import NewBlendButton from "./components/NewBlendButton";
import BlendSuggestionPane from "./components/BlendSuggestionPane";

export default async function Home() {
  const backgroundImageUrl = getBackgroundImageUrl();

  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <main>
      <div className='relative min-h-screen flex items-center justify-center'>
        <div className='fixed top-0 left-0 w-full h-full'>
          <Image
            src={backgroundImageUrl}
            alt='Cover Image'
            layout='fill'
            objectFit='cover'
            className='-z-10 blur-sm scale-105'
          />
        </div>
        <div className='relative flex flex-col w-full max-w-[65rem]'>
          <GreetingHero />
          <NewBlendButton btnTitle='+ Create' title='Create New Blend' />
          <BlendSuggestionPane type='self' />
          <BlendSuggestionPane type='discover' />
        </div>
      </div>
    </main>
  );
}
