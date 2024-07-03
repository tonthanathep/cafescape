import React from "react";
import Image from "next/image";
import { getBackgroundImageUrl } from "../utils/getBackgroundImage";
import LoginPane from "../components/LoginPane";

const Page = () => {
  const backgroundImageUrl = getBackgroundImageUrl();
  return (
    <div className='flex items-center justify-center min-h-screen bg-amber-50'>
      <div className='fixed top-0 left-0 w-full h-full'>
        {/* <Image
          src={backgroundImageUrl}
          alt='Cover Image'
          layout='fill'
          objectFit='cover'
          className='-z-10 blur-sm scale-105'
        /> */}
      </div>
      <div className='flex flex-row'>
        <LoginPane />
      </div>
    </div>
  );
};

export default Page;
