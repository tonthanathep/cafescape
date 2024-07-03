"use client";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { login } from "../(auth)/login/action";

const LoginPane = () => {
  return (
    <div className='flex flex-row w-[50rem] h-[35rem] bg-white/90 backdrop-blur-sm rounded-2xl drop-shadow-md p-4'>
      <div className='basis basis-3/5'>
        <div className="flex flex-col mr-8 rounded-2xl h-full bg-black/40 bg-[url('../public/images/hero.jpg')] bg-cover bg-blend-darken p-7 pb-8 justify-end">
          <h1 className='text-[2rem] font-bold text-white'>your own cafe</h1>
          <h1 className='-mt-3 text-[2rem] font-bold text-white'>
            wherever you are
          </h1>
          <h1 className='mt-1 text-sm font-light text-white/70'>
            cafescape let you stay productive <br /> wherever you are with your
            own cafe
          </h1>
        </div>
      </div>
      <div className='basis basis-2/5 flex flex-col justify-between pt-4 pb-4 pr-3'>
        <div>cafescape</div>
        <div>
          <div className='mb-5 justify-center flex flex-col'>
            <h1 className='text-md font-semibold'>☕️ Welcome back</h1>
            <h1 className='text-xs font-light'>
              are you ready to be productive?
            </h1>
          </div>
          <form method='post'>
            <label className='input bg-black/5 flex items-center gap-4 mb-4'>
              <FontAwesomeIcon icon={fas.faEnvelope} className='opacity-70' />
              <input
                name='email'
                type='text'
                className='grow'
                placeholder='Email'
              />
            </label>
            <label className='input bg-black/5 flex items-center gap-4 mb-4'>
              <FontAwesomeIcon icon={fas.faKey} className='opacity-70' />
              <input
                name='password'
                type='password'
                className='grow'
                placeholder='Password'
              />
            </label>
            <div className='flex flex-col'>
              <button className='btn btn-outline btn-mda' formAction={login}>
                Log in
              </button>
            </div>
          </form>
          <div className='flex flex-row gap-1 mt-4 items-center'>
            <p className='text-sm font-light'> Don't have account yet? </p>
            <p className='text-sm font-semibold text-orange-400'> Sign up </p>
          </div>
          {/* <div className='divider'> or </div>
          <div className='flex flex-row gap-3 max-w-max justify-between'>
            <div className='basis basis-1/3 btn btn-outline rounded-xl'>
              <FontAwesomeIcon icon={fab.faApple} className='opacity-70' />
            </div>
            <div className='basis basis-1/3 btn btn-outline rounded-xl'>
              <FontAwesomeIcon icon={fab.faGoogle} className='opacity-70' />
            </div>
            <div className='basis basis-1/3 btn btn-outline rounded-xl'>
              <FontAwesomeIcon icon={fab.faDiscord} className='opacity-70' />
            </div>
          </div> */}
        </div>
        <div className='flex flex-row gap-1'>
          <p className='text-xs font-light text-slate-400'> Made with ❤️ by </p>
          <p className='text-xs font-light text-orange-400'> Thanathep.T </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPane;
