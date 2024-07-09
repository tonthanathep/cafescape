import Image from "next/image";
import BlendSuggestionPane from "../components/BlendSuggestionPane";
import GreetingHero from "../components/GreetingHero";
import { getBackgroundImageUrl } from "../utils/getBackgroundImage";

export default function Home() {
  const backgroundImageUrl = getBackgroundImageUrl();

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
        <div className='relative flex flex-col w-full max-w-[65rem] mb-[3rem]'>
          <GreetingHero />
          <BlendSuggestionPane key='self' type='self' delay={0} />
          <BlendSuggestionPane key='preferences' type='preferences' delay={0} />
          <BlendSuggestionPane key='discover' type='discover' delay={0} />
        </div>
      </div>
    </main>
  );
}
