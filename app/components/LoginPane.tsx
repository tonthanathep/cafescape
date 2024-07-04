"use client";
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const LoginPane = () => {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className='flex flex-row w-[50rem] h-[35rem] bg-white/90 backdrop-blur-sm rounded-2xl drop-shadow-md p-4'>
      <div className='basis basis-3/5'>
        <div className="flex flex-col mr-8 rounded-2xl h-full bg-black/40 bg-[url('../public/images/hero.jpg')] bg-cover bg-blend-darken p-7 pb-8 justify-end">
          {isSignup ? (
            <div>
              <h1 className='text-[2rem] font-bold text-white'>
                let's get started
              </h1>
              <h1 className='-mt-3 text-[2rem] font-bold text-white'>
                on your journey!
              </h1>
              <h1 className='mt-1 text-sm font-light text-white/70'>
                cafescape let you stay productive <br /> wherever you are with
                your own cafe
              </h1>
            </div>
          ) : (
            <div>
              <h1 className='text-[2rem] font-bold text-white'>
                your own cafe
              </h1>
              <h1 className='-mt-3 text-[2rem] font-bold text-white'>
                wherever you are
              </h1>
              <h1 className='mt-1 text-sm font-light text-white/70'>
                cafescape let you stay productive <br /> wherever you are with
                your own cafe
              </h1>
            </div>
          )}
        </div>
      </div>
      <div className='basis basis-2/5 pt-4 pb-4 pr-3'>
        {isSignup ? (
          <SignupForm setState={setIsSignup} />
        ) : (
          <LoginForm setState={setIsSignup} />
        )}
      </div>
    </div>
  );
};

export default LoginPane;
