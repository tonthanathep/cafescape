"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SiteLogo from "./SiteLogo";

const OnboardingPane = () => {
  const [page, setPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState(1);
  const router = useRouter();

  const variants = {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
  };

  return (
    <div className='flex flex-col justify-between w-[30rem] h-[35rem] bg-white/90 backdrop-blur-sm rounded-2xl drop-shadow-md p-6'>
      <SiteLogo variant='dark' />
      <AnimatePresence mode='wait'>
        {page === 1 ? (
          <motion.div
            key='page1'
            initial='initial'
            animate='animate'
            exit='exit'
            variants={variants}
            transition={{ duration: 0.3 }}
            className='-mt-4'
          >
            <h1 className='text-[4rem] font-bold text-gray'>✨</h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-grey'>
              Welcome to
            </h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-gray'>
              your own cafe!
            </h1>
            <h1 className='mt-1 text-sm w-[18rem] font-light text-gray/70'>
              Cafescape let's your create your very own personalized soundscape
              to help you focused on your task wherever you are
            </h1>
          </motion.div>
        ) : page === 2 ? (
          <motion.div
            key='page2'
            initial='initial'
            animate='animate'
            exit='exit'
            variants={variants}
            transition={{ duration: 0.3 }}
            className='-mt-4'
          >
            <h1 className='text-[4rem] font-bold text-gray'>☕️</h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-grey'>
              Finding your
            </h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-gray'>
              very own Blend
            </h1>
            <h1 className='mt-1 text-sm w-[18rem] font-light text-gray/70'>
              Blend is how we called our "Soundscape" that you can create and
              tailored to your own needs!
            </h1>
          </motion.div>
        ) : page === 3 ? (
          <motion.div
            key='page3'
            initial='initial'
            animate='animate'
            exit='exit'
            variants={variants}
            transition={{ duration: 0.3 }}
            className='-mt-4'
          >
            <h1 className='text-[4rem] font-bold text-gray'>🤔</h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-grey'>
              What kind of work
            </h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-gray'>
              do you need?
            </h1>
            <h1 className='mt-1 text-sm w-[18rem] font-light text-gray/70'>
              Select the kind of sessions that you're going to do
            </h1>
            <div className='grid grid-cols-2 gap-2 mt-4'>
              <div className='flex flex-row gap-2'>
                <div
                  onClick={() => setSelectedOption(1)}
                  className={`cursor-pointer p-2 w-full border border-1 rounded-xl flex justify-center items-center transition-all duration-200 hover:scale-105 ${
                    selectedOption === 1
                      ? "border-teal-600 border-2  bg-teal-100"
                      : "border-gray-300"
                  }`}
                >
                  <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-[1.8rem] font-bold text-gray'>📚</h1>
                    <h1 className='-mt-1 text-sm font-light text-gray'>
                      Study
                    </h1>
                  </div>
                </div>
              </div>
              <div className='flex flex-row gap-2'>
                <div
                  onClick={() => setSelectedOption(2)}
                  className={`cursor-pointer p-2 w-full border-2 rounded-xl flex justify-center items-center transition-all duration-200 hover:scale-105 ${
                    selectedOption === 2
                      ? "border-teal-600 border-2  bg-teal-100"
                      : "border-gray-300"
                  }`}
                >
                  <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-[1.8rem] font-bold text-gray'>🧑‍💻</h1>
                    <h1 className='-mt-1 text-sm font-light text-gray'>
                      Working
                    </h1>
                  </div>
                </div>
              </div>
              <div className='flex flex-row gap-2'>
                <div
                  onClick={() => setSelectedOption(3)}
                  className={`cursor-pointer p-2 w-full border border-1 rounded-xl flex justify-center items-center transition-all duration-200 hover:scale-105 ${
                    selectedOption === 3
                      ? "border-teal-600 border-2  bg-teal-100"
                      : "border-gray-300"
                  }`}
                >
                  <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-[1.8rem] font-bold text-gray'>🧘</h1>
                    <h1 className='-mt-1 text-sm font-light text-gray'>
                      Relaxing
                    </h1>
                  </div>
                </div>
              </div>
              <div className='flex flex-row gap-2'>
                <div
                  onClick={() => setSelectedOption(4)}
                  className={`cursor-pointer p-2 w-full border border-1 rounded-xl flex justify-center items-center transition-all duration-200 hover:scale-105 ${
                    selectedOption === 4
                      ? "border-teal-600 border-2  bg-teal-100"
                      : "border-gray-300"
                  }`}
                >
                  <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-[1.8rem] font-bold text-gray'>😴</h1>
                    <h1 className='-mt-1 text-sm font-light text-gray'>
                      Sleeping
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : page === 4 ? (
          <motion.div
            key='page4'
            initial='initial'
            animate='animate'
            exit='exit'
            variants={variants}
            transition={{ duration: 0.3 }}
            className='-mt-4'
          >
            <h1 className='text-[4rem] font-bold text-gray'>😉</h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-grey'></h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-gray'>
              You're all set!
            </h1>
            <h1 className='mt-1 text-sm w-[18rem] font-light text-gray/70'>
              You're all set and ready to start your journey with Cafescape!
            </h1>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className='flex flex-row justify-between items-center'>
        <div className='grid grid-cols-4 gap-2 w-[10rem]'>
          <progress
            className={`progress ${page === 1 ? "progress-primary" : ""}`}
            value={100}
            max='100'
          ></progress>
          <progress
            className={`progress ${page === 2 ? "progress-primary" : ""}`}
            value={100}
            max='100'
          ></progress>
          <progress
            className={`progress ${page === 3 ? "progress-primary" : ""}`}
            value={100}
            max='100'
          ></progress>
          <progress
            className={`progress ${page === 4 ? "progress-primary" : ""}`}
            value={100}
            max='100'
          ></progress>
        </div>
        <div className='flex flex-row justify-end gap-2'>
          {page > 1 && (
            <div className='btn btn-ghost' onClick={() => setPage(page - 1)}>
              Back
            </div>
          )}
          {page < 4 ? (
            <div className='btn w-[8rem]' onClick={() => setPage(page + 1)}>
              Next
            </div>
          ) : (
            <div
              className='btn btn-primary w-[8rem]'
              onClick={() => router.push("/")}
            >
              Finish
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPane;
