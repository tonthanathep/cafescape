"use client";
import Link from "next/link";
import React from "react";
import Clock from "react-live-clock";

const Navbar = () => {
  return (
    <div className='fixed z-50 w-full'>
      <div className='flex navbar justify-between pt-4 items-center mx-auto w-full max-w-[65rem]'>
        <div className='navbar-start'>
          <Link href={"/"}>
            <h1 className='text-xl font-bold text-white shadow-2xl'>
              cafescape
            </h1>
          </Link>
        </div>
        <div className='navbar-end flex flex-row gap-3'>
          <div className='flex flex-row  gap-5 pt-4 pb-4 pr-6 pl-6 drop-shadow-2xl bg-white rounded-2xl'>
            <h1 className='text-sm font-medium text-black'>Blends</h1>
            <h1 className='text-sm font-medium text-black'>Receipt</h1>
          </div>
          <div className='flex flex-row  gap-5 pt-4 pb-4 pr-6 pl-6 drop-shadow-2xl bg-white rounded-2xl'>
            <h1 className='text-sm font-medium text-black'>
              Welcome, Thanathep!
            </h1>
            <h1 className='text-sm font-medium text-black'>
              <Clock format={"HH:mm"} ticking={true} />
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
