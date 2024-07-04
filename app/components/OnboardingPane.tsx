"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import SiteLogo from "./SiteLogo";

const OnboardingPane = () => {
  const [page, setPage] = useState(1);

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
            <h1 className='text-[4rem] font-bold text-gray'>☕️</h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-grey'>Page 1</h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-gray'>
              on your journey!
            </h1>
            <h1 className='mt-1 text-sm font-light text-gray/70'>
              cafescape let you stay productive <br /> wherever you are with
              your own cafe
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
            <h1 className='-mt-3 text-[2rem] font-bold text-grey'>Page 2</h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-gray'>
              on your journey!
            </h1>
            <h1 className='mt-1 text-sm font-light text-gray/70'>
              cafescape let you stay productive <br /> wherever you are with
              your own cafe
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
            <h1 className='text-[4rem] font-bold text-gray'>☕️</h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-grey'>Page 3</h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-gray'>
              on your journey!
            </h1>
            <h1 className='mt-1 text-sm font-light text-gray/70'>
              cafescape let you stay productive <br /> wherever you are with
              your own cafe
            </h1>
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
            <h1 className='text-[4rem] font-bold text-gray'>☕️</h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-grey'>Page 4</h1>
            <h1 className='-mt-3 text-[2rem] font-bold text-gray'>
              on your journey!
            </h1>
            <h1 className='mt-1 text-sm font-light text-gray/70'>
              cafescape let you stay productive <br /> wherever you are with
              your own cafe
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
              onClick={() => setPage(1)}
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
