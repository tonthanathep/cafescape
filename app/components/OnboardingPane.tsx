"use client";
import { useState } from "react";
import SiteLogo from "./SiteLogo";

const OnboardingPane = () => {
  const [page, setPage] = useState(1);

  return (
    <div className='flex flex-col justify-between w-[30rem] h-[35rem] bg-white/90 backdrop-blur-sm rounded-2xl drop-shadow-md p-6'>
      <SiteLogo />
      <div>
        <h1 className='text-[2rem] font-bold text-grey'>let's get started</h1>
        <h1 className='-mt-3 text-[2rem] font-bold text-gray'>
          on your journey!
        </h1>
        <h1 className='mt-1 text-sm font-light text-gray/70'>
          cafescape let you stay productive <br /> wherever you are with your
          own cafe
        </h1>
      </div>

      <div className='flex flex-row justify-between items-center'>
        <div className='grid grid-cols-4 gap-2 w-[10rem]'>
          <progress
            className='progress progress-primary'
            value={100}
            max='100'
          ></progress>
          <progress className='progress' value={0} max='100'></progress>
          <progress className='progress' value={0} max='100'></progress>
          <progress className='progress' value={0} max='100'></progress>
        </div>
        <div className='flex flex-row justify-end gap-2'>
          <div className='btn'>Back</div>
          <div className='btn w-[8rem]'>Next</div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPane;
