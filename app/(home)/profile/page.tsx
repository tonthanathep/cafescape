import EditProfileModal from "@/app/components/EditProfileModal";
import { createClient } from "@/app/utils/supabase/server";

const Page = async () => {
  const supabase = createClient();
  let userId;
  let userData;
  let userBlends: any;
  let userSessions: any;

  await supabase.auth.getUser().then((data) => {
    userId = data.data.user?.id;
  });

  await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .then((data: any) => {
      userData = data.data[0]; // Assuming data is an array
    });

  await supabase
    .from("blends")
    .select("*")
    .eq("owner", userId)
    .then((data: any) => {
      userBlends = data.data;
    });

  await supabase
    .from("sessions")
    .select("*")
    .eq("owner_uuid", userId)
    .then((data: any) => {
      userSessions = data.data;
    });

  const convertSecondsToHoursMinutes = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { hours, minutes };
  };

  const totalDurationInSeconds = userSessions.reduce(
    (total: any, session: { duration: any }) => total + session.duration,
    0
  );

  const { hours, minutes } = convertSecondsToHoursMinutes(
    totalDurationInSeconds
  );

  console.log(userData);

  return (
    <div className='flex items-center justify-center min-h-screen bg-amber-50'>
      <div className='flex flex-col'>
        <div>
          You've been working for {hours} hours and {minutes} minutes
          {userBlends.map((blend: any) => (
            <div className='flex flex-col card bg-white shadow-sm'>
              <h1>{blend.name}</h1>
              <p>{blend.owner}</p>
            </div>
          ))}
        </div>
        <EditProfileModal userData={userData} />
      </div>
    </div>
  );
};

export default Page;
