import { getBackgroundImageUrl } from "@/app/utils/getBackgroundImage";
import Image from "next/image";

const Page = () => {
  const backgroundImageUrl = getBackgroundImageUrl();
  return (
    <div className='relative min-h-screen flex items-center justify-center'>
      <div className='fixed top-0 left-0 w-full h-full blur-sm scale-105'>
        <Image
          src={backgroundImageUrl}
          alt='Cover Image'
          layout='fill'
          objectFit='cover'
          className='-z-10'
        />
      </div>
    </div>
  );
};

export default Page;
