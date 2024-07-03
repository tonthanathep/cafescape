import React from "react";

const page = () => {
  return (
    <div className='w-full max-w-[60rem] min-h-screen flex flex-col items-center justify-center bg-slate-800'>
      <div className='basis-1/5'>
        <div className='card bg-white rounded-2xl drop-shadow-sm'>White</div>
      </div>
      <div className='basis-4/5'></div>
    </div>
  );
};

export default page;
