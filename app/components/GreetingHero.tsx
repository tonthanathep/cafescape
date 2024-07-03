import NewBlendButton from "./NewBlendButton";

var user = {
  name: "Anthony",
};

const today = new Date();

const GreetingHero = () => {
  return (
    <div className='mt-[12rem] flex flex-row items-end justify-between'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-xl text-white/70 font-light'>
          {" "}
          {today.toLocaleString("default", {
            month: "long",
          })}{" "}
          {today.getDate()}{" "}
        </h1>
        <h1 className='text-3xl text-white font-semibold'>
          Let's get back to work, {user.name}
        </h1>
      </div>
      <div>
        <NewBlendButton btnTitle='+ Create' title='Create New Blend' />
      </div>
    </div>
  );
};

export default GreetingHero;
