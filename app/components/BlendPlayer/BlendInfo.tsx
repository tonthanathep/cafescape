"use client";
import usePlayerStore from "@/app/data/store/PlayerStore";
import { createClient } from "@/app/utils/supabase/client";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import NewBlendButton from "../NewBlendButton";

const BlendInfo = () => {
  const { currentBlend } = usePlayerStore();
  const supabase = createClient();
  const [isOwner, setOwner] = useState(false);

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
        console.log(response);
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
  }, [currentBlend]);

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

  return (
    <div className='card p-5 bg-white/0 flex flex-row gap-1'>
      <div className='basis-5/6'>
        <p className='text-white font-light text-sm opacity-60'>
          I'm now working in
        </p>
        <p className='text-white font-bold text-2xl'>{currentBlend.name}</p>
      </div>
      <div className='basis-1/6'>
        <p className='text-white font-light text-sm opacity-60'>
          Current Session
        </p>
        <p className='text-white font-bold text-2xl'>
          {minutes < 10 ? `0${minutes}:` : `${minutes}:`}
          {seconds < 10 ? `0${seconds}` : `${seconds}`}
        </p>
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
              {minutes > 0 && <button className='btn'>Finish Session</button>}
              <Link href={`/`}>
                <button className='btn'>Abandon Session</button>
              </Link>
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
        className='btn btn-primary'
        onClick={() =>
          (
            document.getElementById("confirm_save") as HTMLDialogElement
          ).showModal()
        }
      >
        Save
      </div>
      <div
        className='btn btn-primary'
        onClick={() =>
          (document.getElementById("share") as HTMLDialogElement).showModal()
        }
      >
        Share
      </div>
      <div
        className='btn btn-primary'
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
