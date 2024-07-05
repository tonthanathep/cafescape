"use client";
import usePlayerStore from "@/app/data/store/PlayerStore";
import useSessionStore from "@/app/data/store/SessionStore";
import { createClient } from "@/app/utils/supabase/client";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import NewBlendButton from "../NewBlendButton";

const BlendInfo = () => {
  const { currentSession, setSessionStatus, setSessionDuration } =
    useSessionStore();
  const { currentBlend } = usePlayerStore();
  const supabase = createClient();
  const [isOwner, setOwner] = useState(false);
  const [isSaved, setSaved] = useState(false);
  const router = useRouter();

  const handleAbandon = () => {
    // send axios put to delete session
    axios
      .delete("/api/session/", { data: { id: currentSession.id } })
      .then((res) => {
        if (res.status === 200) {
          router.push("/");
        } else {
          console.log(res);
        }
      });
  };

  const handleFinish = () => {
    // send axios put to update session status to finished
    axios
      .put("/api/session/", {
        ...currentSession,
        status: "ended",
        duration: totalSeconds,
        blends_uuid: currentBlend.id,
      })
      .then((res) => {
        if (res.status === 200) {
          setSessionStatus("ended");
          router.push("/finish?id=" + currentSession.id);
        } else {
          console.log(res);
        }
      });
  };

  const handleSave = () => {
    const updateBlend = {
      ...currentBlend,
      layerType: {
        isCafe: currentBlend.cafeLayers.length === 0 ? false : true,
        isNoise: currentBlend.ambiLayers.length === 0 ? false : true,
      },
    };

    axios
      .put("/api/blends/" + currentBlend.id, updateBlend)
      .then(function (response) {
        setSaved(true);
      });
  };

  useEffect(() => {
    const checkOwner = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data.user?.id === currentBlend.owner) {
        setOwner(true);
      } else {
        setOwner(false);
      }
    };
    checkOwner();
  }, [currentBlend.id]);

  //Stopwatch
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  useEffect(() => {
    setSessionDuration(totalSeconds);
  }, [totalSeconds]);

  return (
    <div className='flex flex-col justify-center h-full gap-1'>
      <div className='flex flex-row items-center justify-start gap-3'>
        <div className='flex flex-col '>
          <p className='font-light text-[3rem]'>☕️</p>
        </div>
        <div className='flex flex-col'>
          <p className='text-black/60 font-light text-xs'>I'm now working in</p>
          <p className='text-black/80 font-extrabold text-xl'>
            {currentBlend.name}
          </p>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center border-t-[1px] border-b-[1px] border-black/10 pb-2 -space-y-1'>
        <p className='text-black/80 font-black text-[2.5rem]'>
          {minutes < 10 ? `0${minutes}:` : `${minutes}:`}
          {seconds < 10 ? `0${seconds}` : `${seconds}`}
        </p>
        <p className='text-black/70 font-light text-xs'>Current Session</p>
      </div>

      <div>
        <dialog id='confirm_save' className='modal'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>Save</h3>
            <p className='py-4'>
              Do you want to save over this blend or save as new Blend?
            </p>
            <div className='modal-action flex flex-row'>
              {isOwner && (
                <form method='dialog'>
                  <button className='btn' onClick={() => handleSave()}>
                    Save
                  </button>
                </form>
              )}

              <NewBlendButton
                btnTitle={"Save as"}
                title={"Save this Blend as..."}
              />

              <form method='dialog'>
                <button className='btn'>Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>

      <dialog id='confirm_exit' className='modal'>
        <div className='modal-box'>
          {minutes > 0 ? (
            <h3 className='font-bold text-lg'>
              You have been working for {minutes} minutes!
            </h3>
          ) : (
            <h3 className='font-bold text-lg'>Ending session</h3>
          )}

          <p className='py-4'>Do you want to quit this session?</p>
          <div className='modal-action'>
            <form method='dialog'>
              {minutes > 0 && (
                <button className='btn' onClick={() => handleFinish()}>
                  Finish Session
                </button>
              )}

              <button className='btn' onClick={() => handleAbandon()}>
                Abandon Session
              </button>

              <button className='btn'>Back</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id='share' className='modal'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>
            Share this Blend with your friends
          </h3>
          <input
            type='text'
            className='input w-full'
            value={"http://cafescape.com" + usePathname()}
            aria-readonly
          />
          <div className='modal-action'>
            <form method='dialog'>
              <Link href={`/`}>
                <button className='btn'>Copy to Clipboard</button>
              </Link>
              <button className='btn'>No</button>
            </form>
          </div>
        </div>
      </dialog>

      <div
        className='btn btn-outline btn-sm rounded-xl'
        onClick={() =>
          (
            document.getElementById("confirm_save") as HTMLDialogElement
          ).showModal()
        }
      >
        Save
      </div>
      <div
        className='btn btn-outline btn-sm rounded-xl'
        onClick={() =>
          (document.getElementById("share") as HTMLDialogElement).showModal()
        }
      >
        Share
      </div>
      <div
        className='btn btn-outline btn-sm rounded-xl'
        onClick={() =>
          (
            document.getElementById("confirm_exit") as HTMLDialogElement
          ).showModal()
        }
      >
        {" "}
        Exit{" "}
      </div>
    </div>
  );
};

export default BlendInfo;
