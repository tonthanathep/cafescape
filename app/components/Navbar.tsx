"use client";
import { useEffect } from "react";
import Clock from "react-live-clock";
import useUserStore from "../data/store/UserStore";
import { createClient } from "../utils/supabase/client";
import SiteLogo from "./SiteLogo";

const Navbar = () => {
  const { setCurrentUser, setCurrentProfile, currentUser } = useUserStore();

  //fetch data

  const supabase = createClient();

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

  const today = new Date();
  return (
    <div className='fixed z-50 w-full'>
      <div className='flex navbar justify-between pt-4 items-center mx-auto w-full pl-8 pr-4'>
        <div className='navbar-start'>
          <SiteLogo />
        </div>
        <div className='navbar-end flex flex-row gap-3'>
          <div className='flex flex-row  gap-5 pt-4 pb-4 pr-6 pl-6 drop-shadow-2xl bg-white rounded-2xl'>
            <h1 className='text-sm font-medium text-black'>Blends</h1>
            <h1 className='text-sm font-medium text-black'>Receipt</h1>
          </div>
          <div className='flex flex-row  gap-2 pt-4 pb-4 pr-6 pl-6 drop-shadow-2xl bg-white rounded-2xl'>
            <h1 className='text-sm font-medium text-black mr-3'>
              Welcome, {currentUser?.user_profile.nick_name}
            </h1>
            <h1 className='text-sm font-medium text-black'>
              {" "}
              {today.toLocaleString("default", {
                month: "long",
              })}{" "}
              {today.getDate()}{" "}
            </h1>
            <h1 className='text-sm font-medium text-black'>
              <Clock format={"HH:mm"} ticking={true} />
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
