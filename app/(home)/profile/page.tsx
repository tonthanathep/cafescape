import { createClient } from "@/app/utils/supabase/server";

const Page = async () => {
  const supabase = createClient();
  let userId;
  let userData;
  let userBlends;
  let userSessions;

  await supabase.auth.getUser().then((data) => {
    userId = data.data.user.id;
  });

  await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .then((data) => {
      userData = data.data;
    });

  await supabase
    .from("blends")
    .select("*")
    .eq("owner", userId)
    .then((data: {}) => {
      userBlends = data.data;
    });

  await supabase
    .from("sessions")
    .select("*")
    .eq("owner_uuid", userId)
    .then((data: {}) => {
      userSessions = data.data;
    });

  const convertSecondsToHoursMinutes = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return { hours, minutes };
  };

  const totalDurationInSeconds = userSessions.reduce(
    (total, session) => total + session.duration,
    0
  );

  const { hours, minutes } = convertSecondsToHoursMinutes(
    totalDurationInSeconds
  );

  return (
    <div className='flex items-center justify-center min-h-screen bg-amber-50'>
      <div className='flex flex-col'>
        <div>
          You've been working for {hours} hours and {minutes} minutes
          {userBlends.map((blend) => (
            <div className='flex flex-col card bg-white shadow-sm'>
              <h1>{blend.name}</h1>
              <p>{blend.owner}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
