"use client";
import CafeSoundPanel from "@/app/components/BlendPlayer/CafeSound/CafeSoundPanel";
import SpatialCanvas from "@/app/components/BlendPlayer/CafeSound/SpatialCanvas";
import usePlayerStore from "@/app/data/store/PlayerStore";
import useSessionStore from "@/app/data/store/SessionStore";
import { getBackgroundImageUrl } from "@/app/utils/getBackgroundImage";
import { createClient } from "@/app/utils/supabase/client";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AmbiSoundPanel from "../../../components/BlendPlayer/AmbiSound/AmbiSoundPanel";
import BlendInfo from "../../../components/BlendPlayer/BlendInfo";

const BlendPlayerPage = () => {
  const { id } = useParams();
  const { currentBlend, setBlend, setBlendId } = usePlayerStore();
  const {
    currentSession,
    setSessionBlend,
    setSessionId,
    setSession,
    clearSession,
  } = useSessionStore();
  const backgroundImageUrl = getBackgroundImageUrl();
  const [refresh, setRefresh] = useState(0);
  const [update, setUpdate] = useState(false);
  const [tempSessionId, setTempSessionId] = useState("");
  const [localBlendId, setLocalBlendId] = useState("");
  const [isOwner, setOwner] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    if (id !== currentBlend.id) {
      setBlendId(id as string);
      setRefresh(refresh + 1);
      console.log("update id: ", refresh, id);
    }
  }, [id]);

  useEffect(() => {}, []);

  useEffect(() => {
    const checkOwner = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user?.id === currentBlend.owner) {
        setOwner(true);
        console.log("owner: true");
      } else {
        setOwner(false);
        console.log("owner: true");
      }
    };

    const fetchBlend = async () => {
      try {
        const res = await fetch("/api/blends/" + id);
        if (res.ok) {
          const blends = await res.json();
          if (blends) {
            setBlend(blends);
            setSessionBlend(blends.id);
            setUpdate(true);
            checkOwner();
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
          axios.post("/api/session", currentSession).then((res) => {
            setSession(res.data[0]);
          });
        } catch (error) {
          console.error("Error creating session:", error);
        }
      } else {
        console.log("not yet!");
      }
    };

    const checkOngoing = async () => {
      await axios
        .get("/api/session/ongoing")
        .then((res) => {
          if (res.data.isOngoing) {
            setTempSessionId(res.data.session_uuid);
            (
              document.getElementById("ongoing-exist") as HTMLDialogElement
            ).showModal();
            console.log("ongoing session found");
          } else {
            console.log("no ongoing session found");
            createSession();
          }
        })
        .catch((error) => {
          console.error("Error fetching session data:", error);
        });
    };
    if (update) {
      checkOngoing();
    }
  }, [update]);

  const handleAbandon = () => {
    // send axios put to delete session
    axios
      .delete("/api/session/", { data: { id: tempSessionId } })
      .then((res) => {
        if (res.status === 200) {
          window.location.href = "/";
        } else {
          console.log(res);
        }
      });
  };

  const fadeInVariants = {
    hidden: { opacity: 0, scale: 1, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <div className='min-h-screen w-full flex items-center bg-[#ebe3db] overflow-auto'>
      <div className='flex flex-col w-full justify-center -space-y-24 items-center'>
        <div className='basis basis-3/4 flex flex-row w-full justify-evenly'>
          <div className='basis basis-1/6 mt-[5.5rem]'>
            <motion.div
              className='h-full'
              initial='hidden'
              animate='visible'
              variants={fadeInVariants}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <BlendInfo isOwner={isOwner} />
            </motion.div>
          </div>
          <div className='basis basis-3/6 mt-[4.5rem]'>
            <motion.div
              className=''
              initial='hidden'
              animate='visible'
              variants={fadeInVariants}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <SpatialCanvas />
            </motion.div>
          </div>
          <div className='basis basis-1/6 flex items-center mt-[5.5rem]'>
            <AmbiSoundPanel />
          </div>
        </div>
        <div className='basis basis-1/4 flex justify-center items-center'>
          <CafeSoundPanel />
        </div>
      </div>

      <dialog id='ongoing-exist' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Ongoing session exist</h3>

          <p className='py-4'>Do you want to continue your previous session?</p>
          <div className='modal-action'>
            <form method='dialog'>
              <button className='btn'>Continue Previous Session</button>
              <button
                className='btn'
                onClick={() => {
                  handleAbandon();
                }}
              >
                Abandon Old Session
              </button>
              <Link href={`/`}>
                <button className='btn'>Back</button>
              </Link>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BlendPlayerPage;
