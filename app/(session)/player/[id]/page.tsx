"use client";
import CafeSoundPanel from "@/app/components/BlendPlayer/CafeSound/CafeSoundPanel";
import usePlayerStore from "@/app/data/store/PlayerStore";
import useSessionStore from "@/app/data/store/SessionStore";
import { getBackgroundImageUrl } from "@/app/utils/getBackgroundImage";
import { createClient } from "@/app/utils/supabase/client";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AmbiSoundPanel from "../../../components/BlendPlayer/AmbiSound/AmbiSoundPanel";
import BlendDataDebugger from "../../../components/BlendPlayer/BlendDataDebugger";
import BlendInfo from "../../../components/BlendPlayer/BlendInfo";

const supabase = createClient();

const BlendPlayerPage = () => {
  const { id } = useParams();
  const { currentBlend, setBlend, setBlendId } = usePlayerStore();
  const { currentSession, setSessionBlend } = useSessionStore();
  const backgroundImageUrl = getBackgroundImageUrl();
  const [refresh, setRefresh] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (id !== currentBlend.id) {
      setBlendId(id as string);
      setRefresh(refresh + 1);
      console.log("update id: ", refresh, id);
    }
  }, [id]);

  useEffect(() => {
    const fetchBlend = async () => {
      try {
        const res = await fetch("/api/blends/" + id);
        if (res.ok) {
          const blends = await res.json();
          if (blends) {
            setBlend(blends);
            setSessionBlend(blends.id);
            setUpdate(true);
          }
        } else {
          console.error("Failed to fetch blend data");
        }
      } catch (error) {
        console.error("Error fetching blend data:", error);
      }
    };

    console.log("refresh", id);
    fetchBlend();
  }, [setRefresh]);

  useEffect(() => {
    const createSession = async () => {
      if (update) {
        console.log("create session called");
        try {
          const res = await axios.post("/api/session", currentSession);
          console.log(res);
        } catch (error) {
          console.error("Error creating session:", error);
        }
      } else {
        console.log("not yet!");
      }
    };
    createSession();
  }, [update]);

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
