import OnboardingPane from "@/app/components/OnboardingPane";
import { getBackgroundImageUrl } from "@/app/utils/getBackgroundImage";
import Image from "next/image";

const Page = () => {
  const backgroundImageUrl = getBackgroundImageUrl();
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='fixed top-0 left-0 w-full h-full'>
        <Image
          src={backgroundImageUrl}
          alt='Cover Image'
          layout='fill'
          objectFit='cover'
          className='-z-10 blur-sm scale-105'
        />
      </div>
      <div className='flex flex-row'>
        <OnboardingPane />
      </div>
    </div>
  );
};

export default Page;
