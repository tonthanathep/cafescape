import React from "react";

var user = {
  name: "Anthony",
};

const today = new Date();

const GreetingHero = () => {
  return (
    <div className='mt-40'>
      <h1 className='text-xl text-white font-normal'>
        {" "}
        {today.toLocaleString("default", {
          month: "long",
        })}{" "}
        {today.getDate()}{" "}
      </h1>
      <h1 className='text-3xl text-white font-bold'>
        {" "}
        Let's get back to work, {user.name}{" "}
      </h1>
    </div>
  );
};

export default GreetingHero;
