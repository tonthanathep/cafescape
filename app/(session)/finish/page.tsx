"use client";
import CafeReceipt from "@/app/components/CafeReceipt";
import useSessionStore from "@/app/data/store/SessionStore";
import { getBackgroundImageUrl } from "@/app/utils/getBackgroundImage";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const backgroundImageUrl = getBackgroundImageUrl();
  const [selectedOption, setSelectedOption] = useState(0);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [sessionData, setSessionData] = useState({});
  const [blendData, setBlendData] = useState({
    owner: "",
    id: "",
    created_at: "",
    name: "",
    cafeLayers: [],
    ambiLayers: [],
    listenerPos: {},
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [ratingDesc, setRatingDesc] = useState("");
  const { clearSession } = useSessionStore();

  const handleSelect = (value: number) => {
    setSelectedOption(value);
  };

  const handleSubmit = async () => {
    if (selectedOption !== 0) {
      await axios
        .put("/api/session/", {
          ...sessionData,
          status: "rated",
          score: selectedOption,
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            clearSession();
            router.push("/");
          } else {
            console.log(res);
          }
        });
    } else {
      console.log("Please select one of the rating");
    }
  };

  useEffect(() => {
    switch (selectedOption) {
      case 1:
        setRatingDesc("Terrible");
        break;
      case 2:
        setRatingDesc("Bad");
        break;
      case 3:
        setRatingDesc("Average");
        break;
      case 4:
        setRatingDesc("Good");
        break;
      case 5:
        setRatingDesc("Excellent");
        break;
      default:
        setRatingDesc("");
        break;
    }
  }, [selectedOption]);

  useEffect(() => {
    const fetchBlend = async (blends_uuid: string) => {
      await axios.get("/api/blends/" + blends_uuid).then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setBlendData(res.data);
        } else {
          console.log(res);
        }
      });
    };

    const fetchSession = async () => {
      await axios.get("/api/session/" + id).then((res) => {
        if (res.status === 200 && res.data.status === "ended") {
          console.log(res.data);
          setSessionData(res.data);
          fetchBlend(res.data.blends_uuid);
          setIsLoaded(true);
        } else {
          console.log(res);
          router.push("/");
        }
      });
    };
    fetchSession();
  }, [setIsLoaded]);

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
      <div className='relative flex flex-row bg-white rounded-2xl min-h-[40rem] items-center p-10 pt-8 gap-3 mt-[5rem] w-full max-w-[65rem]'>
        <div className='basis basis-3/5'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-bold text-black/70'>
              You're doing great! 🎉
            </h1>
            <p className='text-lg text-black/70'>
              Don't forget to stay hydrate and get some fresh air
            </p>
          </div>
          <div className='border-t-[1px] border-b-[1px] border-gray-200 mt-3 mb-3'>
            <div className='flex flex-row justify-between items-end mt-5 mb-2'>
              <h1 className='text-sm font-bold text-black/70'>
                How was your session going?
              </h1>
              <h1 className='text-xs font-light text-orange-400'>
                {ratingDesc}
              </h1>
            </div>
            {/* Rating Radio Input */}
            <div className='flex flex-row gap-2 mb-5'>
              <div
                onClick={() => handleSelect(1)}
                className={`cursor-pointer p-4 w-full border border-1 rounded-xl flex justify-center items-center transition-all duration-200 hover:scale-105 ${
                  selectedOption === 1
                    ? "border-teal-600 border-2  bg-teal-100"
                    : "border-gray-300"
                }`}
              >
                <span className=''>1</span>
              </div>
              <div
                onClick={() => handleSelect(2)}
                className={`cursor-pointer p-4 w-full border border-1 rounded-xl flex justify-center items-center transition-all duration-200 hover:scale-105 ${
                  selectedOption === 2
                    ? "border-amber-600 border-2  bg-amber-100"
                    : "border-gray-300"
                }`}
              >
                <span className=''>2</span>
              </div>
              <div
                onClick={() => handleSelect(3)}
                className={`cursor-pointer p-4 w-full border border-1 rounded-xl flex justify-center items-center transition-all duration-200 hover:scale-105 ${
                  selectedOption === 3
                    ? "border-purple-600 border-2  bg-purple-100"
                    : "border-gray-300"
                }`}
              >
                <span className=''>3</span>
              </div>
              <div
                onClick={() => handleSelect(4)}
                className={`cursor-pointer p-4 w-full border border-1 rounded-xl flex justify-center items-center transition-all duration-200 hover:scale-105 ${
                  selectedOption === 4
                    ? "border-purple-600 border-2  bg-purple-100"
                    : "border-gray-300"
                }`}
              >
                <span className=''>4</span>
              </div>
              <div
                onClick={() => handleSelect(5)}
                className={`cursor-pointer p-4 w-full border border-1 rounded-xl flex justify-center items-center transition-all duration-200 hover:scale-105 ${
                  selectedOption === 5
                    ? "border-purple-600 border-2  bg-purple-100"
                    : "border-gray-300"
                }`}
              >
                <span className=''>5</span>
              </div>
            </div>
          </div>
          <div className='flex flex-row w-full gap-4'>
            <div className='btn' onClick={() => handleSubmit()}>
              Send
            </div>
          </div>
        </div>
        <div className='basis basis-1/5'>
          <div className='flex flex-col ml-20 items-center justify-center'>
            {blendData.id !== "" && (
              <CafeReceipt blendData={blendData} sessionData={sessionData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
