"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import usePlayerStore from "../data/store/PlayerStore";

interface Props {
  btnTitle: string;
  title: string;
}

const NewBlendButton = ({ btnTitle, title }: Props) => {
  const [selectedOption, setSelectedOption] = useState("study");
  const [newName, setNewName] = useState("");
  const router = useRouter();
  const { currentBlend } = usePlayerStore();

  const handleSelect = (value: string) => {
    setSelectedOption(value);
  };

  const handleNewBlend = () => {
    const newBlend = {
      ...currentBlend,
      id: undefined,
      created_at: undefined,
      name: newName,
      category: selectedOption,
    };

    axios.post("/api/blends/new", newBlend).then(function (response) {
      router.push("/player/" + response.data[0].id);
    });
  };

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className='btn'
        onClick={() =>
          (
            document.getElementById("new_blends") as HTMLDialogElement
          ).showModal()
        }
      >
        {btnTitle}
      </button>
      <dialog id='new_blends' className='modal'>
        <div className='modal-box w-9/12 h-min flex flex-col gap-4'>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>

          <h3 className='font-bold text-lg'>{title}</h3>
          <input
            type='text'
            placeholder='Your Blend Name (You can change this later)'
            className='input input-bordered w-full'
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <div className='flex flex-row gap-2'>
            <div
              onClick={() => handleSelect("study")}
              className={`cursor-pointer p-4 w-full border border-1 rounded-xl flex justify-center items-center transition-all duration-200 hover:scale-105 ${
                selectedOption === "study"
                  ? "border-teal-600 border-2  bg-teal-100"
                  : "border-gray-300"
              }`}
            >
              <span className=''>Study</span>
            </div>
            <div
              onClick={() => handleSelect("work")}
              className={`cursor-pointer p-4 w-full border border-1 rounded-xl flex justify-center items-center transition-all duration-200 hover:scale-105 ${
                selectedOption === "work"
                  ? "border-amber-600 border-2  bg-amber-100"
                  : "border-gray-300"
              }`}
            >
              <span className=''>Work</span>
            </div>
            <div
              onClick={() => handleSelect("relax")}
              className={`cursor-pointer p-4 w-full border border-1 rounded-xl flex justify-center items-center transition-all duration-200 hover:scale-105 ${
                selectedOption === "relax"
                  ? "border-purple-600 border-2  bg-purple-100"
                  : "border-gray-300"
              }`}
            >
              <span className=''>Relax</span>
            </div>
            <div
              onClick={() => handleSelect("sleep")}
              className={`cursor-pointer p-4 w-full border border-1 rounded-xl flex justify-center items-center transition-all duration-200 hover:scale-105 ${
                selectedOption === "sleep"
                  ? "border-blue-600 border-2  bg-purple-100"
                  : "border-gray-300"
              }`}
            >
              <span className=''>Sleep</span>
            </div>
          </div>
          <div className='btn btn-primary w-full' onClick={handleNewBlend}>
            + Create New Blend
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default NewBlendButton;
