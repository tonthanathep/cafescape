"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Clock from "react-live-clock";
import useUserStore from "../data/store/UserStore";
import { createClient } from "../utils/supabase/client";
import SiteLogo from "./SiteLogo";

const Navbar = () => {
  const { setCurrentUser, setCurrentProfile, currentUser } = useUserStore();

  //fetch data

  const supabase = createClient();
  const router = useRouter();

  let userData;

  useEffect(() => {
    const fetchUserProfile = async () => {
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", userData.id)
        .then((data) => {
          setCurrentProfile(data.data[0]);
        });
    };

    const fetchUserData = async () => {
      await supabase.auth
        .getUser()
        .then((data) => {
          userData = data.data.user;
          setCurrentUser(userData);
          fetchUserProfile();
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    };
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("error: ", error);
    } else {
      router.push("/login");
    }
  };

  const today = new Date();
  return (
    <div className='fixed z-50 w-full'>
      <div className='flex navbar justify-between h-[3.3rem] pt-8 items-center mx-auto w-full pl-8 pr-4'>
        <div className='navbar-start'>
          <SiteLogo variant='dark' />
        </div>
        <div className='navbar-end flex flex-row gap-3'>
          <div className='flex flex-row  gap-3 pt-4 pb-4 pr-6 pl-6 drop-shadow-2xl bg-white rounded-2xl'>
            <h1 className='text-sm font-bold text-black/80'>
              <Clock format={"HH:mm"} ticking={true} />
            </h1>
            <h1 className='text-sm font-bold text-black'>
              {today.toLocaleString("default", { weekday: "short" })},{" "}
              {today.toLocaleString("default", {
                month: "long",
              })}{" "}
              {today.getDate()}{" "}
            </h1>
          </div>
          <div className='dropdown dropdown-bottom dropdown-end flex flex-row h-[3.3rem] items-center p-1 drop-shadow-2xl bg-white rounded-2xl'>
            <div
              tabIndex={0}
              role='button'
              className='flex flex-row items-center rounded-2xl hover:bg-slate-100 p-1 cursor-pointer'
            >
              <div className='flex items-center justify-center w-10 h-10 bg-amber-300 rounded-xl mr-3'>
                {" "}
              </div>
              <div className='flex flex-col mr-3'>
                <h1 className='text-sm font-bold text-black'>
                  {currentUser?.user_profile.nick_name}
                </h1>
                <h1 className='text-[0.7rem] font-light text-black/50'>
                  Cozy member
                </h1>
              </div>
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-3'
            >
              <li onClick={() => router.push("/profile")}>
                <a>My Profile</a>
              </li>
              <li>
                <a>Edit Profile</a>
              </li>
              <li onClick={() => router.push("/onboarding")}>
                <a>Redo Onboarding</a>
              </li>
              <li onClick={() => handleLogout()}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
