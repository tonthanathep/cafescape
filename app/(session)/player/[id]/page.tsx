"use client";
import usePlayerStore from "@/app/data/store/PlayerStore";
import { getBackgroundImageUrl } from "@/app/utils/getBackgroundImage";
import { createClient } from "@/app/utils/supabase/client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import AmbiSoundPanel from "../../../components/BlendPlayer/AmbiSound/AmbiSoundPanel";
import BlendDataDebugger from "../../../components/BlendPlayer/BlendDataDebugger";
import BlendInfo from "../../../components/BlendPlayer/BlendInfo";
import CafeSoundPanel from "../../../components/BlendPlayer/CafeSound/CafeSoundPanel";

const supabase = createClient();

const BlendPlayerPage = () => {
  const { id } = useParams();
  const { setBlend } = usePlayerStore();
  const backgroundImageUrl = getBackgroundImageUrl();

  useEffect(() => {
    const fetchBlend = async () => {
      const res = await fetch("/api/blends/" + id);
      if (res) {
        const blends = await res.json();
        setBlend(blends);
      }
    };
    fetchBlend();
  }, [id]);

  const fadeInVariants = {
    hidden: { opacity: 0, scale: 1, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

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
      <div className='relative flex flex-row gap-6 mt-[5rem] w-full max-w-[65rem]'>
        {/* <TestSoundNode /> */}
        <div className='flex flex-col basis-4/5 '>
          <motion.div
            className='basis-1/5'
            initial='hidden'
            animate='visible'
            variants={fadeInVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <BlendInfo />
          </motion.div>
          <motion.div
            className='basis-4/5'
            initial='hidden'
            animate='visible'
            variants={fadeInVariants}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <CafeSoundPanel />
          </motion.div>
        </div>
        <div className='basis-1/5'>
          <AmbiSoundPanel />
          <BlendDataDebugger />
        </div>
      </div>
    </div>
  );
};

export default BlendPlayerPage;
